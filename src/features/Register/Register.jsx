import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import userApi from "../../api/userApi";
import userRoleApi from "../../api/userRoleApi";
import { getName, messageShowErr, messageShowSuccess } from "../../function";
import imgDog from "../../images/login.png";
import "../../sass/Login/Login.scss";
import {
  eyeHidenLogin,
  eyeShowLogin,
  lockLogin,
  nameLogin,
  userLogin,
} from "../Admin/svg/IconSvg";
export default function Register() {
  const [showPass, setShowPass] = useState("password");
  const clickShowPass = () => {
    setShowPass(showPass === "password" ? "text" : "password");
  };
  const [showRePass, setShowRePass] = useState("password");
  const clickShowRePass = () => {
    setShowRePass(showRePass === "password" ? "text" : "password");
  };
  const style = {
    background: `url(${imgDog}) center no-repeat`,
    backgroundSize: "cover",
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const history = useHistory();
  const avatarDefault =
    "https://cdn.pixabay.com/photo/2016/11/22/23/18/kingfisher-1851127_960_720.jpg";
  const onSubmit = async (data) => {
    userApi
      .postuser({
        email: data.email,
        password: data.password,
        firstName: getName(data.name).firtsName,
        lastName: getName(data.name).lastName,
        avatar: avatarDefault,
        status: 1,
      })
      .then((ok) => {
        if (ok?.message === "Email already exists!") {
          messageShowErr("Your email is registered!");
        } else {
          userRoleApi.post({
            userId: ok.data.id,
            roleId: 2,
          });
          messageShowSuccess("Sign Up Success!");
          history.push("/login");
        }
      });
  };
  return (
    <div>
      <div className="Login" style={style}>
        <div className="blur"></div>
        <div className="box-login">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="title-login">Register</div>
            <div className="form-account">
              <label htmlFor="">Email login</label>
              <div className="input">
                <div className="icon">{userLogin}</div>
                <input
                  type="text"
                  id=""
                  {...register("email", {
                    required: "Can't be left blank!",
                    pattern: {
                      value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                      message: "Incorrect email format!",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
            <div className="form-account">
              <label htmlFor="">User name</label>
              <div className="input">
                <div className="icon">{nameLogin}</div>
                <input
                  type="text"
                  id=""
                  {...register("name", {
                    required: "Can't be left blank!",
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </div>
            <div className="form-password">
              <label htmlFor="">Pass word</label>
              <div className="input">
                <div className="icon">{lockLogin}</div>
                <input
                  type={`${showPass}`}
                  id=""
                  className="pass"
                  {...register("password", {
                    required: "Can't be left blank!",
                    minLength: {
                      value: 6,
                      message: "Password at least 6 characters!",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password is too long!",
                    },
                  })}
                />

                <div className="icon-show" onClick={clickShowPass}>
                  {showPass === "password" ? eyeHidenLogin : eyeShowLogin}
                </div>
              </div>
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>
            <div className="form-password">
              <label htmlFor="">Enter the password</label>
              <div className="input">
                <div className="icon">{lockLogin}</div>
                <input
                  type={`${showRePass}`}
                  {...register("rePassword", {
                    required: "Can't be left blank!",
                    validate: (value) =>
                      value === password.current || "Password does not match!",
                  })}
                  id=""
                  className="pass"
                />
                <div className="icon-show" onClick={clickShowRePass}>
                  {showRePass === "password" ? eyeHidenLogin : eyeShowLogin}
                </div>
              </div>
              {errors.rePassword && (
                <p className="text-danger">{errors.rePassword.message}</p>
              )}
            </div>
            <div className="btn-login">
              <button style={{ color: "white" }}>Register</button>
            </div>
            {/* <div className="login-other">
              <div className="text">Hoặc đăng nhập với</div>
              <div className="icon-login">
                <div className="icon" style={{ backgroundColor: "#087ceb" }}>
                  {facebook}
                </div>
                <div className="icon" style={{ backgroundColor: "#1da1f3" }}>
                  {twitter}
                </div>
                <div className="icon" style={{ backgroundColor: "#ea4235" }}>
                  {google}
                </div>
              </div>
            </div> */}
            <div className="login-2">
              <Link to="/Login">Login</Link>
              <span> if you already have an account</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
