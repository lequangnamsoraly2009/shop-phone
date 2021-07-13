const Category = require('../models/category.model')

const categoryController = {
    getCategories: async(req,res) => {
        try {
            const categories = await Category.find();
            res.json(categories)
        } catch (error) {
            return res.status(500).json({status: false, message: error.message})
        }
    }


}

module.exports = categoryController;