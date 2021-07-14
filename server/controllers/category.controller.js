const Category = require('../models/category.model')

const categoryController = {
    getCategories: async(req,res) => {
        try {
            const categories = await Category.find();
            res.json(categories)
        } catch (error) {
            return res.status(500).json({status: false, message: error.message})
        }
    },
    // Only Admin create, update, delete category 
    createCategory: async(req, res) => {
        try {
            const {nameCategory} = req.body;
            const category = await Category.findOne({nameCategory});
            if(category) return res.status(400).json({status: false, message:"Category already exists"});

            // New Category

            const newCategory = new Category({nameCategory});

            await newCategory.save();
            res.json("Create success a category")
            
        } catch (error) {
            return res.status(500).json({status: false, message: error.message})
        }
    }


}

module.exports = categoryController;