const Products = require("../models/product.model");

// Filter, sorting and pagination
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((element) => delete queryObj[element]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query =
        this.query.sort("-createdAt") && this.query.sort("-updatedAt");
    }
    return this;
  }
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productController = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .pagination();

      const products = await features.query;
      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  // get product by filter 
  getFilterProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .pagination();

      const products = await features.query;
      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
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
        sale,
        nameCategory
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

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        status,
        description,
        color,
        images,
        category,
        storage,
        sale,
        nameCategory
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
        sale,
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
          title: title.toLowerCase(),
          price,
          description,
          status,
          color,
          images,
          category,
          storage,
          sale,
        }
      );

      res.json({ message: "Update a product successful !!! " });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = productController;
