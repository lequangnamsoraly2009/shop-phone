const pdf = require("html-pdf");
const pdfReceipt = require("../helper/receiptPDF");
const path = require("path");

const pdfController = {
  createPDF: async (req, res) => {
    try {
      const { test } = req.body;
      pdf
        .create(pdfReceipt({ test }), {})
        .toFile("./pdf/result.pdf", (err, res) => {
          if (err) {
            return res.status(400).json({ status: false, message: "?" });
          }
          //   console.log(res);
        });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  fetchPDF: async (req, res) => {
    try {
      res.sendFile(path.resolve("./pdf/result.pdf"));
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = pdfController;
