const cloudinary = require("cloudinary");
const Users = require("../models/user.model");
const fs = require("fs");

const uploadAvatarController = {
  uploadAvatar: (req, res) => {
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
        { folder: "shop-phone-avatar" },
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
  deleteAvatar: async (req, res) => {
    try {
      const { public_id, userId } = req.body;
      if (!public_id) {
        return res
          .status(400)
          .json({ status: false, message: "No image have selected !" });
      }
      const user = await Users.findById({ _id: userId });

      if (user.avatar.public_id === public_id) {
        await Users.findByIdAndUpdate(
          { _id: userId },
          {
            avatar: {},
          }
        );
      }

      cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        if (err) throw err;

        res.json({ message: "Deleted Image Success" });
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  changeAvatarUser: async (req, res) => {
    try {
      const { avatar, user } = req.body;
      await Users.findOneAndUpdate(
        { _id: user._id },
        { avatar: avatar }
      );
      res.json({status: true, message: "Change Avatar Success"})
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
  },
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = uploadAvatarController;
