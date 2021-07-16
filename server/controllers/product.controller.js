const Products = require("../models/product.model");

// Filter, sorting and pagination
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
      const queryObj = {...this.queryString} //queryString = req.query

      const excludedFields = ['page','sort','limit'];
      excludedFields.forEach(element => delete(queryObj[element]));

      return this;
  }
  sorting() {}
  pagination() {}
}

const productController = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query);
        
      const products = await features.query()
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
      res.json({ message: "Created a product successful !!!" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ message: "Product has deleted successful !!" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
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

      if (price <= 0)
        return res
          .status(400)
          .json({ status: false, message: "Price needs > 0" });

      await Products.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: title.toUpperCase(),
          price,
          description,
          status,
          color,
          images,
          category,
          storage,
        }
      );

      res.json({ message: "Update a product successful !!! " });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = productController;
