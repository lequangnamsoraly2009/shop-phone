const router = require("express").Router();
const categoryController = require("../controllers/category.controller")


router.route("/category").get(categoryController.getCategories)


module.exports = router;