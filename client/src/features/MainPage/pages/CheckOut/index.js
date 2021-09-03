import { Breadcrumb } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import AddressShipping from "./components/addressShip";
// import CheckoutInfor from "./components/inforCheckout";
import PaypalButton from "./PaypalButton";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import {
  // removeCartPayMentTemp,
  removeManyCart,
} from "../../../../app/cartSlice";
import "./checkout.css";
import CheckoutInfor from "./inforCheckout";
import PaymentAPI from "../../../../api/paymentAPI";
import UserAPI from "../../../../api/userAPI";
import VoucherAPI from "../../../../api/voucherAPI";
// import { setInformationPaymentPaypal } from "../../../../app/paymentSlice";

function CheckOut() {
  const { informationPaymentPaypal } = useSelector((state) => state.payments);
  const { token } = useSelector((state) => state.token);
  const { user } = useSelector((state) => state.user);
  // console.log(informationPaymentPaypal)
  const { address, cart, feeShipValue, inforUser, voucherValue, voucherUsed } =
    informationPaymentPaypal;
  const { email, methodPayment, nameReceiver, note, numberPhone } = inforUser;

  const dispatch = useDispatch();

  console.log(informationPaymentPaypal);

  const history = useHistory();

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
    await VoucherAPI.updateVoucherRemain({
      token,
      _id: voucherUsed._id,
      user,
    });
    dispatch(removeManyCart(cart));
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
        <CheckoutInfor cart={cart} />
      </div>
      <div className="checkout-steps">
        <div className="steps-action">
          <PaypalButton total={1 + 10} tranSuccess={tranSuccess} />
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
