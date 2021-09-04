const pdf = require("html-pdf");
const pdfReceipt = require("../helper/receiptPDF");
const path = require("path");

const pdfController = {
  createPDF: (req, res) => {
    try {
      const { test } = req.body;
      pdf.create(pdfReceipt({ test }), {}).toFile("./pdf/result.pdf", (err) => {
        if (err) {
          return res.status(400).json({ status: false, message: err.message });
        }
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  fetchPDF: (req, res) => {
    try {
      res.sendFile("result.pdf", { root: path.join(__dirname, "../pdf") });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = pdfController;
