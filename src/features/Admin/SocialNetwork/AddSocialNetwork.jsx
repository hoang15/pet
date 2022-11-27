import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import socialNetworkApi from "../../../api/socialNetworkApi";
import Spinner from "../Spin/Spinner";

export default function AddSocialNetwork() {
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
      socialNetworkApi.getOne(id).then((ok) => {
        reset(ok);
      });
    }
  }, []);
  const history = useHistory();
  const onSubmit = async (data) => {
    setState({ ...state, loadSpin: true });
    if (id) {
      await socialNetworkApi.editsocialNetwork({
        name: data.name,
        icon: data.icon,
        color: data.color,
        link: data.link,
        id: id,
      });
    } else {
      await socialNetworkApi.postsocialNetwork({
        name: data.name,
        icon: data.icon,
        color: data.color,
        link: data.link,
        status: 0,
      });
    }
    history.push("/Admin/socialNetwork");
  };
  return (
    <div className="CreateAdmin">
      <div className="heading">
        <div className="heading__title">
          <h3>Add social network</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-admin">
          <label htmlFor="">Social network name</label>
          <input
            type="text"
            {...register("name", {
              required: "Not be empty!",
              maxLength: {
                value: 255,
                message: "Exceeded characters allowed!",
              },
            })}
          />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Icon</label>
          <input
            type="text"
            {...register("icon", {
              required: "Not be empty!",
              maxLength: {
                value: 2000,
                message: "Exceeded characters allowed!",
              },
            })}
          />
          {errors.icon && (
            <span className="text-danger">{errors.icon.message}</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Affiliate link</label>
          <input
            type="text"
            {...register("link", {
              required: "Not be empty!",
              maxLength: {
                value: 500,
                message: "Exceeded characters allowed!",
              },
            })}
          />
          {errors.link && (
            <span className="text-danger">{errors.link.message}</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Color</label>
          <input
            type="text"
            {...register("color", {
              required: "Not be empty!",
              maxLength: {
                value: 500,
                message: "Exceeded characters allowed!",
              },
            })}
          />
          {errors.color && (
            <span className="text-danger">{errors.color.message}</span>
          )}
        </div>
        <div className="btn_submit">
          {loadSpin ? (
            <Spinner />
          ) : id ? (
            <input type="submit" value="Sửa socialNetwork" />
          ) : (
            <input type="submit" value="Thêm mới" />
          )}
        </div>
      </form>
    </div>
  );
}
