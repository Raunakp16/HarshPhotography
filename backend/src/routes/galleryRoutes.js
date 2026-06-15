const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");

const {
  uploadGallery,
} = require("../controllers/galleryController");

router.post(
  "/gallery/upload",
  upload.array("images", 5),
  uploadGallery
);

module.exports = router;