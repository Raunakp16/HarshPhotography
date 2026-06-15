const Gallery = require("../models/gallerySchema");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.uploadGallery = async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (!req.files || !req.files.length) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded",
      });
    }

    let gallery = await Gallery.findOne({ category });

    if (!gallery) {
      gallery = await Gallery.create({
        category,
        images: [],
      });
    }

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(
        file.path,
        {
          folder: `harsh-photography/${category}`,
        }
      );

      // Delete temporary file
fs.unlinkSync(file.path);


      gallery.images.push({
        url: result.secure_url,
        public_id: result.public_id,
      });

      if (!gallery.coverImage) {
        gallery.coverImage = result.secure_url;
      }
    }

    await gallery.save();

    res.status(200).json({
      success: true,
      message: "Photos uploaded successfully",
      gallery,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
};