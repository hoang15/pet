import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import billApi from "../../../api/billApi";
import Spinner from "../Spin/Spinner";
import "../../../sass/Admin/BillDetail.scss";
export default function BillDetail() {
  const { id } = useParams();

  const [data, setdata] = useState(null);
  const [bill, setBill] = useState(null);
  useEffect(() => {
    billApi
      .getOne(id)
      .then((ok) => {
        setdata(JSON.parse(ok.listProduct));
        setBill(ok);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="AdminTable">
      <div className="heading">
        <div className="heading__title">
          <h3>Invoice Details</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="bill-detail">
        {data && bill ? (
          <div className="container">
            {data.map((ok) => (
              <div className="box" key={ok.id}>
                <div className="box-img">
                  <img src={ok.avatar} alt="" />
                </div>
                <div className="box-content">
                  <div className="title">{ok.name}</div>
                  <div className="price">
                    Price: {Number(ok.price).toLocaleString()} vnđ
                  </div>
                  <div className="quantity">
                    Quantity purchased: {ok.quantityCurrent}
                  </div>
                  <div className="result">
                    Total payment: {Number(ok.priceResult).toLocaleString()} vnđ
                  </div>
                  <div className="phone">Phone number: {bill.phone}</div>
                  <div className="address">Address: {bill.address}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
