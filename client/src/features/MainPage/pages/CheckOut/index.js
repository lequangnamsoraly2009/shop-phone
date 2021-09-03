import { Breadcrumb } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PaypalButton from "./PaypalButton";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { removeManyCart } from "../../../../app/cartSlice";
import "./checkout.css";
import CheckoutInfor from "./inforCheckout";
import PaymentAPI from "../../../../api/paymentAPI";
import UserAPI from "../../../../api/userAPI";
import VoucherAPI from "../../../../api/voucherAPI";
// import { setInformationPaymentPaypal } from "../../../../app/paymentSlice";
import {
  setDataFee,
  setDistrict,
  setProvince,
  setWard,
} from "../../../../app/addressSlice";

function CheckOut() {
  const { informationPaymentPaypal } = useSelector((state) => state.payments);
  const { token } = useSelector((state) => state.token);
  const { user } = useSelector((state) => state.user);
  // console.log(informationPaymentPaypal)
  const { address, cart, feeShipValue, inforUser, voucherValue, voucherUsed } =
    informationPaymentPaypal;
  const { email, methodPayment, nameReceiver, note, numberPhone } = inforUser;

  const dispatch = useDispatch();

  const history = useHistory();

  const totalPrice = cart.reduce((item1, item2) => {
    return (
      item1 +
      item2.price * item2.quantity -
      ((item2.price * item2.quantity * item2.sale) / 100).toFixed(2)
    );
  }, 0);

  const tranSuccess = async (payment) => {
    await PaymentAPI.createPayment({
      cart: cart,
      address: address,
      phone: numberPhone,
      notes: note,
      fullNameReceiver: nameReceiver,
      emailReceiver: email,
      methodPayment,
      voucherValue: voucherValue,
      feeShipValue: feeShipValue,
      token,
    });
    const check = user.vouchersSave.filter(
      (voucher) => voucher._id === voucherUsed._id
    );
    if (check.length > 0) {
      await UserAPI.deleteVoucherSave({ token, voucher: voucherUsed });
    }
    if (voucherUsed._id !== undefined) {
      await VoucherAPI.updateVoucherRemain({
        token,
        _id: voucherUsed._id,
        user,
      });
    }
    dispatch(removeManyCart(cart));
    dispatch(setProvince(null));
    dispatch(setDistrict(null));
    dispatch(setWard(""));
    dispatch(setDataFee([]));
    // dispatch(setInformationPaymentPaypal({}));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "You have successfully placed an order !",
      showConfirmButton: false,
      timer: 3000,
    });
    setTimeout(() => {
      history.push("/home/cart");
    }, 3000);
  };

  // useEffect(() => {
  //   const updateCartToServer = async () => {
  //     await API.patch(
  //       "/users/addcart",
  //       { cart: [...carts] },
  //       {
  //         headers: { Authorization: token },
  //       }
  //     );
  //   };
  //   updateCartToServer();
  // }, [carts, token]);

  return (
    <div className="container-fluid">
      <div className="breadcumb-wrapper">
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item
            href="/home/cart"
            style={{ textTransform: "capitalize" }}
          >
            Cart
          </Breadcrumb.Item>
          <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
            Check Out With PayPal
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        <CheckoutInfor informationPaymentPaypal={informationPaymentPaypal} />
      </div>
      <div className="checkout-steps">
        <div className="steps-action">
          <PaypalButton
            total={
              Number(totalPrice) + Number(feeShipValue) - Number(voucherValue)
            }
            tranSuccess={tranSuccess}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
