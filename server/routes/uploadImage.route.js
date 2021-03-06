const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const uploadImageController = require("../controllers/uploadImage.controller");

// Upload on cloudinary

// Config for upload cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload Image

router.post("/upload-image", uploadImageController.uploadImage);

// Delete image

router.post("/delete-image", uploadImageController.deleteImage);

router.post(
  "/delete-all-image",
  uploadImageController.deleteAllImagesOfProduct
);

module.exports = router;
