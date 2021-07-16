const Products = require("../models/product.model");

const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await Products.find();
      res.json(products);
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        status,
        color,
        images,
        category,
        storage,
      } = req.body;

      if (!images)
        return res
          .status(400)
          .json({ status: false, message: "No image upload ! Add images" });

      const product = await Products.findOne({ product_id });
      if (product)
        return res
          .status(400)
          .json({ status: false, message: "This product already exists !" });

      if (price <= 0)
        return res
          .status(400)
          .json({ status: false, message: "Price needs > 0" });

      const newProduct = await Products({
        product_id,
        title: title.toUpperCase(),
        price,
        status,
        description,
        color,
        images,
        category,
        storage,
      });

      await newProduct.save();
      res.json({message:"Created a product successful !!!"});
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = productController;
