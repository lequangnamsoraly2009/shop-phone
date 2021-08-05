const Payments = require("../models/payment.model");
const Users = require("../models/user.model");
const Products = require("../models/product.model");
const config = require("config");
const dateFormat = require("dateformat");
const querystring = require("qs");
const sha256 = require("sha256");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((element) => delete queryObj[element]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query =
        this.query.sort("-createdAt") && this.query.sort("-updatedAt");
    }
    return this;
  }
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const paymentController = {
  getPayments: async (req, res) => {
    try {
      const features = new APIfeatures(Payments.find(), req.query)
        .filtering()
        .sorting()
        .pagination();
      const payments = await features.query;
      res.json({
        status: "success",
        result: payments.length,
        payments: payments,
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  getFilterDatePayments: async (req, res) => {
    try {
      const { monthFilter } = req.body;

      if (monthFilter === 12) {
        const filterPayments = await Payments.find({
          createdAt: {
            $gte: `2021-${monthFilter}-01`,
            $lte: `2021-${monthFilter}-31`,
          },
        });
        res.json({
          status: "success",
          result: filterPayments.length,
          filterPayments: filterPayments,
        });
      } else {
        const filterPayments = await Payments.find({
          createdAt: {
            $gte: `2021-${monthFilter}-01`,
            $lt: `2021-${monthFilter + 1}-01`,
          },
        });
        res.json({
          status: "success",
          result: filterPayments.length,
          filterPayments: filterPayments,
        });
      }
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user)
        return res
          .status(400)
          .json({ status: false, message: "User does not exist !" });

      const { cart, paymentID, address, phone, notes } = req.body;
      const { _id, name, email } = user;

      cart.filter((item) => {
        return countSoldAndStorage(
          item._id,
          item.quantity,
          item.numberSold,
          item.storage
        );
      });

      const newPayment = new Payments({
        user_id: _id,
        name: address.recipient_name,
        email,
        paymentID,
        cart,
        phone,
        address,
        notes,
        key: _id,
      });
      // console.log(newPayment);
      await newPayment.save();

      res.json({ message: "Payment successful" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  createPaymentByVNPay: async (req, res) => {
    const ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    const tmnCode = config.get("vnp_TmnCode");
    const secretKey = config.get("vnp_HashSecret");
    let vnpUrl = config.get("vnp_Url");
    const returnUrl = config.get("vnp_ReturnUrl");

    const date = new Date();

    const createDate = dateFormat(date, "yyyymmddHHmmss");
    const orderId = dateFormat(date, "HHmmss");
    const amount = req.body.amount;
    const bankCode = req.body.bankCode;

    const orderInfo = req.body.orderDescription;
    const orderType = req.body.orderType;
    const locale = req.body.language;
    if (locale === null || locale === "") {
      locale = "vn";
    }

    const currCode = "VND";
    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    const signData =
      secretKey + querystring.stringify(vnp_Params, { encode: false });

    const secureHash = sha256(signData);

    vnp_Params["vnp_SecureHashType"] = "SHA256";
    vnp_Params["vnp_SecureHash"] = secureHash;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });

    //Neu muon dung Redirect thi dong dong ben duoi
    // res.status(200).json({ code: "00", data: vnpUrl });
    //Neu muon dung Redirect thi mo dong ben duoi va dong dong ben tren
    res.json({
      vnpUrl:vnpUrl
    })
  },
  dataPaymentByVNPay: async (req, res) => {
    let vnp_Params = req.query;
    let secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    let secretKey = config.get("vnp_HashSecret");
    let signData =
      secretKey + querystring.stringify(vnp_Params, { encode: false });

    let checkSum = sha256(signData);

    if (secureHash === checkSum) {
      let orderId = vnp_Params["vnp_TxnRef"];
      let rspCode = vnp_Params["vnp_ResponseCode"];
      res.json({ orderId, rspCode });
      //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
      res.status(200).json({ RspCode: "00", Message: "success" });
    } else {
      res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
    }
  },
  returnPaymentByVNPay: async (req, res) => {
    let vnp_Params = req.query;

    let secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    let tmnCode = config.get("vnp_TmnCode");
    let secretKey = config.get("vnp_HashSecret");

    let signData =
      secretKey + querystring.stringify(vnp_Params, { encode: false });

    let checkSum = sha256(signData);

    if (secureHash === checkSum) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

      res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
    }
  },
};

const countSoldAndStorage = async (id, quantity, oldSold, oldStorage) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      numberSold: quantity + oldSold,
      storage: oldStorage - quantity,
    }
  );
};

function sortObject(o) {
  var sorted = {},
    key,
    a = [];

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
}

module.exports = paymentController;
