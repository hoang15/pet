import { Drawer } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeListCart } from "../../../app/Slice/CartSlide";
import { messageShowErr, messageShowSuccess } from "../../../function";
import "../../../sass/Home/Cart.scss";
import { cart } from "../../Admin/svg/IconSvg";
import Payment from "../Payment/Payment";

export default function Cart() {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [statusDialog, setStatusDialog] = useState(false);
  const listCart = useSelector((state) => state.cart.listCart);
  const userInfor = useSelector((state) => state.user.userInfor);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(removeListCart(id));
  };

  const handlePayment = () => {
    // xử lý khi người dùng thanh toán
    if (userInfor.length === 0) {
      messageShowErr("You need to login first!");
    } else {
      if (!userInfor.address || !userInfor.phone) {
        messageShowErr(
          "You need to update your address and phone number first!"
        );
      } else {
        setStatusDialog(true);
      }
    }
  };

  const handleCloseDialog = () => {
    setStatusDialog(false);
  };

  return (
    <div className="cart">
      {listCart?.length !== 0 && (
        <div className="number">{listCart?.length}</div>
      )}
      <div className="icon" onClick={() => setToggleDrawer(!toggleDrawer)}>
        {cart}
      </div>
      {userInfor && (
        <Payment
          statusDialog={statusDialog}
          onClose={handleCloseDialog}
          userInfor={userInfor}
          listCart={listCart}
        />
      )}
      <Drawer
        key="12"
        anchor="right"
        open={toggleDrawer}
        onClose={() => setToggleDrawer(!toggleDrawer)}
      >
        <div className="cart-content">
          <div className="title">
            Cart <div className="hr"></div>
          </div>
          <div className="content">
            <div className="content-header">
              <div className="sp">Product</div>
              <div className="dg">Unit price</div>
              <div className="sl">Amount</div>
              <div className="st">Amount of money</div>
              <div className="tt">Manipulation</div>
            </div>
            {listCart?.map((ok, index) => (
              <div className="content-product" key={index}>
                <div className="sp">
                  <div className="avatar">
                    <img src={ok.avatar} alt="" />
                  </div>
                  <div className="text">{ok.name}</div>
                </div>
                <div className="dg">₫{Number(ok.price).toLocaleString()}</div>
                <div className="sl">{ok.quantityCurrent}</div>
                <div className="st">
                  ₫{Number(ok.priceResult).toLocaleString()}
                </div>
                <div
                  className="tt"
                  onClick={() => handleDelete(ok.id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </div>
              </div>
            ))}
          </div>
          {listCart?.length > 0 && (
            <div className="btn">
              <button type="submit" onClick={handlePayment}>
                Pay
              </button>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}
