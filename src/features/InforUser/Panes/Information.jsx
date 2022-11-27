import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMale } from "../../../function";
import "../../../sass/InforUser/Information.scss";
export default function Information() {
  const [data, setData] = useState(null);
  const userInfor = useSelector((state) => state.user.userInfor);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="tab-pane">
      <div className="information">
        <div className="avatar">
          <img src={userInfor?.avatar} alt="" />
        </div>
        <div className="title">
          <div className="name">
            {userInfor?.firstName} {userInfor?.lastName}
          </div>
          <div className="line"></div>
          <div className="title-content">
            <div className="left">
              <div className="text">Address: {userInfor?.address}</div>
              <div className="text">Email: {userInfor?.email}</div>
            </div>
            <div className="right">
              <div className="text">Phone number: {userInfor?.phone}</div>
              <div className="text">Sex: {getMale(userInfor?.male)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
