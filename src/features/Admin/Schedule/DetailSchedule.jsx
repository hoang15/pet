import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import scheduleApi from "../../../api/ScheduleApi";
import Spinner from "../Spin/Spinner";
import "../../../sass/RegisterService/ScheduleDetail.scss";
import { formatDate } from "../../../function";
export default function ScheduleDetail() {
  const { id } = useParams();
  console.log("id", id);

  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    scheduleApi
      .getOne(id)
      .then((ok) => {
        console.log("ok", ok);
        setSchedule(ok);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="AdminTable">
      <div className="heading">
        <div className="heading__title">
          <h3>Booking details</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="bill-detail">
        {schedule ? (
          <div className="container">
            <div className="schedule-detail">
              <div className="title">
                Type of service: {schedule.typeService}
              </div>
              <div className="form">
                <p>
                  <div className="text-bold">User name</div>: {schedule.name}
                </p>
                <p>
                  <div className="text-bold">Phone number</div>:{" "}
                  {schedule.phone}
                </p>
                <p>
                  <div className="text-bold">Address</div>: {schedule.address}
                </p>
                <p>
                  <div className="text-bold">Pet type</div>: {schedule.typePet}
                </p>
                <p>
                  <div className="text-bold">Weight</div>: {schedule.typeWeight}
                </p>
                <p>
                  <div className="text-bold">Time</div>:{" "}
                  {formatDate(schedule.date)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
