const Products = require("../models/product.model")

const productController = {
    getProducts: async (req, res) => {
        try {
            const products  = await Products.find();
            res.json(products)
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message })
        }
    }
}

module.exports = productController; 