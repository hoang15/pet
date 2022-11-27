import { Container } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import "../../sass/Home/Tabs.scss";
import { cat, dog, setting, userHome } from "../Admin/svg/IconSvg";
import Banner from "../Banner/Banner";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import CreatePet from "./Panes/CreatePet";
import EditInformation from "./Panes/EditInformation";
import Information from "./Panes/Information";
import MyPet from "./Panes/MyPet";
import { tabJs } from "./tab";
export default function InforUser() {
  const listBread = [{ name: "Trang chủ", link: "/" }, { name: "Thông tin" }];
  const itemsEl = useRef(null);
  const panesEl = useRef(null);
  const lineEl = useRef(null);
  useEffect(() => {
    tabJs(itemsEl.current, panesEl.current, lineEl.current);
  }, []);
  return (
    <div className="UserInfor">
      <Banner />
      <Breadcrumbs breadCrumbList={listBread} />
      <Container>
        <div className="tabs">
          <div className="items" ref={itemsEl}>
            <div className="tab-item ">
              <div className="icon">{userHome}</div>
              User information
            </div>
            <div className="tab-item ">
              <div className="icon">{setting}</div>
              Edit information
            </div>
            <div className="tab-item ">
              <div className="icon">{dog}</div>
              Pets for sale
            </div>
            <div className="tab-item ">
              <div className="icon">{cat}</div> My pet
            </div>
            <div className="line" ref={lineEl}></div>
          </div>
          <div className="panes" ref={panesEl}>
            <Information />
            <EditInformation />
            <CreatePet />
            <MyPet />
          </div>
        </div>
      </Container>
    </div>
  );
}
