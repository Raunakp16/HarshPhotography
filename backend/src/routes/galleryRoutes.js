const express = require("express");
const router = express.Router();

console.log("✅ Gallery routes loaded");

const upload = require("../middleware/multer");

const {
  uploadGallery,
  getGalleryByCategory,
  getCategories
} = require("../controllers/galleryController");

// TEST ROUTE
router.get("/test", (req, res) => {
  console.log("🔥 TEST ROUTE HIT");
  res.json({
    success: true,
    message: "Gallery routes are working"
  });
});

// UPLOAD ROUTE
router.post(
  "/upload",
  upload.array("images", 5),
  uploadGallery
);

// GET ALL CATEGORIES ROUTE
router.get("/categories", (req,res,next) =>{
  console.log(" GET CATEGORIES ROUTE HIT");
  next();
}, getCategories);

// CATEGORY ROUTE
router.get("/:category", (req, res, next) => {
  console.log("🔥 CATEGORY ROUTE HIT");
  console.log("PARAMS:", req.params);
  next();
}, getGalleryByCategory);



module.exports = router;