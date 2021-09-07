const router = require("express").Router();
const productController = require("../controllers/product.controller");
const authAdmin = require("../middleware/authAdmin");
const auth = require("../middleware/auth");

router.route("/products").get(productController.getProducts);
router.route("/filter/products").get(productController.getFilterProducts);

router.route("/admin/products").post(productController.createProduct);
router
  .route("/admin/products/:id")
  .delete(auth, authAdmin, productController.deleteProduct)
  .put(productController.updateProduct);

router.route("/products/:id").patch(productController.updatePatchProduct);
router.route("/product/hide-product/:id").patch(productController.updateHideProduct);

//Test get none hide

// router.route("/test-product").get(productController.testProducts);


module.exports = router;
