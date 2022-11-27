import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import contactApi from "../../../api/contactApi";
import Spinner from "../Spin/Spinner";

export default function AddContact() {
  const { id } = useParams();
  const [state, setState] = useState({
    loadSpin: false,
  });
  const { loadSpin } = state;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (id) {
      contactApi.getOne(id).then((ok) => {
        reset(ok);
      });
    }
  }, []);
  const history = useHistory();
  const onSubmit = async (data) => {
    setState({ ...state, loadSpin: true });
    if (id) {
      await contactApi.editcontact({
        email: data.email,
        address: data.address,
        phone: data.phone,
        description: data.description,
        id: id,
      });
    } else {
      await contactApi.postcontact({
        email: data.email,
        address: data.address,
        phone: data.phone,
        description: data.description,
        status: 0,
      });
    }
    history.push("/Admin/contact");
  };
  return (
    <div className="CreateAdmin">
      <div className="heading">
        <div className="heading__title">
          <h3>Add contact</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-admin">
          <label htmlFor="">Email</label>
          <input
            type="text"
            {...register("email", {
              required: "Not be empty!",
              maxLength: { value: 255, message: "Vượt quá ký tự cho phép!" },
              pattern: {
                value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                message: "Incorrect email format!",
              },
            })}
          />
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Phone number</label>
          <input
            type="text"
            {...register("phone", {
              required: "Not be empty!",
              maxLength: {
                value: 255,
                message: "Exceeded characters allowed!",
              },
            })}
          />
          {errors.phone && (
            <span className="text-danger">{errors.phone.message}</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Address</label>
          <input
            type="text"
            {...register("address", {
              required: "Not be empty!",
              maxLength: {
                value: 500,
                message: "Exceeded characters allowed!",
              },
            })}
          />
          {errors.address && (
            <span className="text-danger">{errors.address.message}</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Content</label>
          <textarea
            rows="10"
            {...register("description", {
              required: "Not be empty!",
              maxLength: {
                value: 1000,
                message: "Exceeded characters allowed!",
              },
            })}
          ></textarea>
          {errors.description && (
            <span className="text-danger">{errors.description.message}</span>
          )}
        </div>
        <div className="btn_submit">
          {loadSpin ? (
            <Spinner />
          ) : id ? (
            <input type="submit" value="Sửa contact" />
          ) : (
            <input type="submit" value="Thêm mới" />
          )}
        </div>
      </form>
    </div>
  );
}
