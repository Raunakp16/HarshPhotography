const Gallery = require("../models/gallerySchema");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// ============================
// UPLOAD GALLERY IMAGES
// ============================
const uploadGallery = async (req, res) => {
  try {
    const category = req.body.category
      ?.toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded",
      });
    }

    let gallery = await Gallery.findOne({ category });

    if (!gallery) {
      gallery = new Gallery({
        category,
        images: [],
      });
    }

    for (const file of req.files) {
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: `harsh-photography/${category}`,
            transformation: [
    {
      width: 2000,
      crop: "limit",
      quality: "auto"
    }
  ]
});
        

        gallery.images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });

        // Set first uploaded image as cover image
        if (!gallery.coverImage) {
          gallery.coverImage = result.secure_url;
        }
      } finally {
        if (file.path && fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }

    await gallery.save();

    return res.status(200).json({
      success: true,
      message: "Photos uploaded successfully",
      data: gallery,
    });

  } catch (error) {
    console.error("Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
};

// ============================
// GET GALLERY BY CATEGORY
// ============================
const getGalleryByCategory = async (req, res) => {
  try {
    const category = req.params.category
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const gallery = await Gallery.findOne({ category });

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: `Category '${category}' not found`,
      });
    }

    return res.status(200).json({
      success: true,
      data: gallery,
    });

  } catch (error) {
    console.error("Gallery Fetch Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// GET ALL CATEGORIES
// ============================

const getCategories = async (req,res) => {
  try{
     const categories = await Gallery.find({}, "category");
     return res.status(200).json({
      success: true,
      data: categories
     })
  }
  catch(error){
    console.error("Category Fetch Error:", error);
    return res .status(500).json({
      success:false,
      message:error.message
    })
  }
}

// ============================
// EXPORTS
// ============================
module.exports = {
  uploadGallery,
  getGalleryByCategory,
  getCategories
};