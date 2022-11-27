import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import img1 from "../../../images/pet6.jpg";
import "../../../sass/Admin/Nav.scss";
import Bill from "../bill/bill";
import {
  app,
  bills,
  category,
  contact,
  gallegy,
  logoAdmin,
  news,
  product,
  schedule,
  service,
  tag,
  twitter,
  useCheck,
  weight,
} from "../svg/IconSvg";
import { clickActive } from "./NavJs";
export default function NavMenu() {
  const ulEL = useRef(null);
  const lineEL = useRef(null);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const listLi = ulEL.current.querySelectorAll("li a");
    const listActive = ulEL.current.querySelector("li>a.active");
    // let pathCutAdmin = pathname.slice(7);
    let idClass = pathname.slice(7).split("/");
    // let indexPath = pathCutAdmin.indexOf("/");
    // let idClass = pathCutAdmin.slice(0, indexPath);
    listActive.classList.remove("active");
    let liIndex = 0;
    for (let i = 0; i < listLi.length; i++) {
      const element = listLi[i];
      if (element.id === idClass[0]) {
        liIndex = i;
        element.classList.add("active");
      }
    }
    clickActive(ulEL.current, lineEL.current, liIndex);
  }, []);
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  return (
    <div className="nav-left ">
      <div className="heading-left">
        <div className="logo">
          <Link to="/">{logoAdmin}</Link>
        </div>
      </div>
      <div className="user">
        <div className="avatar">
          <img src={user?.avatar} alt="" />
        </div>
        <div className="content">
          <div className="title">Position</div>
          <div className="position">Admin</div>
        </div>
      </div>
      <div className="content">
        <div className="title">Overview</div>
        <ul ref={ulEL}>
          <div className="line" ref={lineEL}></div>
          <li>
            <Link to={`${path}`} className="active" id="">
              <div className="icon">{app}</div>
              <div className="text">Admin</div>
            </Link>
          </li>
          <li>
            <Link to={`${path}/CheckPet`} id="CheckPet">
              <div className="icon">{useCheck}</div>
              <div className="text">Pet check</div>
            </Link>
          </li>
          <li>
            <Link to={`${path}/Category`} id="Category">
              <div className="icon">{category}</div>
              <div className="text">Product portfolio</div>
            </Link>
          </li>
          <li>
            <Link to={`${path}/Product`} id="Product">
              <div className="icon">{product}</div>
              <div className="text">Product</div>
            </Link>
          </li>
          <li>
            <Link to={`${path}/New`} id="New">
              <div className="icon">{news}</div>
              <div className="text">News</div>
            </Link>
          </li>
          <li>
            <Link to={`${path}/Tag`} id="Tag">
              <div className="icon">{tag}</div>
              <div className="text">Tag</div>
            </Link>
          </li>
          <li>
            <Link to={`${path}/Bill`} id="Bill">
              <div className="icon">{bills}</div>
              <div className="text">Bill</div>
            </Link>
          </li>
          <li>
            <Link to={`${path}/Schedule`} id="Schedule">
              <div className="icon">{schedule}</div>
              <div className="text">Schedule</div>
            </Link>
          </li>
          <li>
            <Link to={`${path}/Service`} id="Service">
              <div className="icon">{service}</div>
              <div className="text">Service</div>
            </Link>
          </li>
          <li>
            <Link to={`${path}/Gallery`} id="Gallery">
              <div className="icon">{gallegy}</div>
              <div className="text">Photo library</div>
            </Link>
          </li>
          <li>
            <Link to={`${path}/Weight`} id="Weight">
              <div className="icon">{weight}</div>
              <div className="text">Weight</div>
            </Link>
          </li>
          <li>
            <Link to={`${path}/Contact`} id="Contact">
              <div className="icon">{contact}</div>
              <div className="text">Contact</div>
            </Link>
          </li>
          <li>
            <Link to={`${path}/SocialNetwork`} id="SocialNetwork">
              <div className="icon">{twitter}</div>
              <div className="text">Social Network</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
