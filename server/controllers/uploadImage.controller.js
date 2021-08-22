const cloudinary = require("cloudinary");
const Products = require("../models/product.model");
const fs = require("fs");

const uploadImageController = {
  uploadImage: (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res
          .status(400)
          .json({ status: false, message: "No files were uploaded" });
      }

      const file = req.files.file;

      // Check validate for imageGATE
      // image > 4mb
      if (file.size > 1024 * 1024 * 4) {
        removeTmp(file.tempFilePath);
        return res
          .status(400)
          .json({ status: false, message: "File is too large" });
      }
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/gif"
      ) {
        removeTmp(file.tempFilePath);
        return res
          .status(400)
          .json({ status: false, message: "File incorrect format !" });
      }

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        { folder: "shop-phone" },
        async (err, result) => {
          if (err) throw err;
          removeTmp(file.tempFilePath);

          res.json({ public_id: result.public_id, url: result.secure_url });
        }
      );
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  deleteImage: async(req, res) => {
    try {
      const { public_id, productId } = req.body;
      if (!public_id) {
        return res
          .status(400)
          .json({ status: false, message: "No image have selected !" });
      }
      const product = await Products.findById({ _id: productId });
      const {images } = product;
      
      await Products.findByIdAndUpdate({_id: productId}, {
        images: {}
      })
      cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        if (err) throw err;

        res.json({ message: "Deleted Image Success" });
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = uploadImageController;
