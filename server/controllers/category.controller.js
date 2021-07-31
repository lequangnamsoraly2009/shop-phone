const Category = require("../models/category.model");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "limit"];
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

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const features = new APIfeatures(Category.find(), req.query)
        .filtering()
        .sorting()
        .pagination();
      const categories = await features.query;
      res.json({
        status: "success",
        result: categories.length,
        categories: categories,
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  // Only Admin create, update, delete category
  createCategory: async (req, res) => {
    try {
      const { nameCategory } = req.body;
      const category = await Category.findOne({ nameCategory });
      if (category)
        return res
          .status(400)
          .json({ status: false, message: "Category already exists" });
      // New Category
      const newCategory = new Category({ nameCategory, nameCategorySearch: nameCategory.toLowerCase() });

      await newCategory.save();
      res.json("Create success a category");
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  deteleCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: "Delete category successfully" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { nameCategory } = req.body;
      await Category.findByIdAndUpdate(
        { _id: req.params.id },
        { nameCategory }
      );

      res.json({ message: "Update category successfully" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = categoryController;
