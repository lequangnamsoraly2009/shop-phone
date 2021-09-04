const router = require("express").Router();
const pdfController = require("../controllers/pdf.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");


router.route("/create-pdf").post(auth, pdfController.createPDF);

router.route("/fetch-pdf").get(auth,pdfController.fetchPDF);



module.exports = router;