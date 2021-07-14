const router = require("express").Router();
const categoryController = require("../controllers/category.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route("/category").get(categoryController.getCategories);
router
  .route("/admin/category")
  .get(categoryController.getCategories)
  .post(auth, authAdmin, categoryController.createCategory);
router
  .route("/admin/category/:id")
  .delete(auth, authAdmin, categoryController.deteleCategory)
  .put(auth, authAdmin, categoryController.updateCategory);
module.exports = router;
