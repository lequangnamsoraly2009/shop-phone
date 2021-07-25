const router = require("express").Router();
const productController = require("../controllers/product.controller");

router.route("/products").get(productController.getProducts);
router.route("/filter/products").get(productController.getFilterProducts);

router.route("/admin/products").post(productController.createProduct);
router
  .route("/admin/products/:id")
  .delete(productController.deleteProduct)
  .put(productController.updateProduct);

module.exports = router;
