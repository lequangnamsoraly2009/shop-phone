const router = require("express").Router();
const categoryController = require("../controllers/category.controller")
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")



router.route("/category").get(categoryController.getCategories);
router.route("/admin/category").post(auth,authAdmin,categoryController.createCategory);

module.exports = router;