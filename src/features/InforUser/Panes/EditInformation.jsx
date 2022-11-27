import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import userApi from "../../../api/userApi";
import { userInfor } from "../../../app/Slice/UserSlice";
import { storage } from "../../../firebase";
import { getMale, setMale } from "../../../function";
import { camera } from "../../Admin/svg/IconSvg";

export default function EditInformation() {
  const { id } = useParams();
  const [state, setState] = useState({
    linkImg: "",
    nameImg: "",
    img: "",
    imgId: "",
  });
  const { linkImg, nameImg, img, imgId } = state;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const hangdelimage = (e) => {
    console.log("hello");
    setState({
      ...state,
      linkImg: URL.createObjectURL(e.target.files[0]),
      nameImg: e.target.files[0].name,
      img: e.target.files[0],
    });
  };
  useEffect(() => {
    if (id) {
      userApi.getOne(id).then((ok) => {
        reset({
          name: ok.name,
          address: ok.address,
          phone: ok.phone,
          firstName: ok.firstName,
          lastName: ok.lastName,
          male: getMale(ok.male),
        });
        setState({
          ...state,
          imgId: ok.avatar,
        });
      });
    }
  }, []);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if (id) {
      if (img !== "") {
        await storage.ref(`imagesUser/${img.name}`).put(img);
        const anh = await storage
          .ref("imagesUser")
          .child(img.name)
          .getDownloadURL();
        await userApi
          .edituser({
            name: data.name,
            avatar: anh,
            address: data.address,
            phone: data.phone,
            male: setMale(data.male),
            firstName: data.firstName,
            lastName: data.lastName,
            id: id,
          })
          .then((ok) => {
            dispatch(userInfor(id));
          });
      } else {
        await userApi
          .edituser({
            name: data.name,
            address: data.address,
            phone: data.phone,
            male: setMale(data.male),
            firstName: data.firstName,
            lastName: data.lastName,
            id: id,
          })
          .then((ok) => {
            dispatch(userInfor(id));
          });
      }
    }
  };
  return (
    <div className="tab-pane">
      <div className="CreateAdmin">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-admin">
            <label htmlFor="">Avatar</label>
            <div className="update">
              <div className="icon-avatar">
                <label htmlFor="avatar">{camera}</label>
                <input
                  type="file"
                  name=""
                  id="avatar"
                  hidden
                  onChange={hangdelimage}
                />
              </div>
              {linkImg ? (
                <img
                  src={linkImg}
                  className="img-update"
                  height="150px"
                  width="250px"
                  alt=""
                />
              ) : imgId ? (
                <img
                  src={imgId}
                  className="img-update"
                  height="150px"
                  width="250px"
                  alt=""
                />
              ) : (
                ""
              )}
              <br />
              <span>{nameImg}</span>
            </div>
          </div>
          <div className="input-admin">
            <label htmlFor="">User's last name</label>
            <input
              type="text"
              {...register("firstName", {
                required: "Not be empty!",
                maxLength: {
                  value: 255,
                  message: "Exceeded characters allowed!",
                },
              })}
            />
            {errors.firstName && (
              <span className="text-danger">{errors.firstName.message}</span>
            )}
          </div>
          <div className="input-admin">
            <label htmlFor="">User name</label>
            <input
              type="text"
              {...register("lastName", {
                required: "Not be empty!",
                maxLength: {
                  value: 255,
                  message: "Exceeded characters allowed!",
                },
              })}
            />
            {errors.lastName && (
              <span className="text-danger">{errors.lastName.message}</span>
            )}
          </div>
          <div className="input-admin">
            <label htmlFor="">Sex</label>
            <input
              type="text"
              placeholder="Male or Female"
              {...register("male", {
                required: "Not be empty!",
                validate: (value) =>
                  value === "Male" || value === "Female" || "Male or Female",
              })}
            />
            {errors.male && (
              <span className="text-danger">{errors.male.message}</span>
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
            <label htmlFor="">Phone</label>
            <input
              type="number"
              {...register("phone", {
                required: "Not be empty!",
              })}
            />
            {errors.phone && (
              <span className="text-danger">{errors.phone.message}</span>
            )}
          </div>
          <div className="btn_submit">
            <input
              type="submit"
              value="Sửa user"
              style={{ cursor: "pointer" }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
