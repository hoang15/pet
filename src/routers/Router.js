import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import { userData, userInfor } from "../app/Slice/UserSlice";
import Nav from "../features/Admin/Nav/Nav";
import Error from "../features/Error/Error";
import Home from "../features/Home";
import Footer from "../features/Home/Footer/Footer";
import Menu from "../features/Home/Menu/Menu.jsx";
import InforUser from "../features/InforUser/InforUser";
import DetailNew from "../features/ListNews/DetailNew/DetailNew";
import ListNews from "../features/ListNews/ListNews";
import Login from "../features/Login/Login";
import Register from "../features/Register/Register";
import RegisterService from "../features/RegisterService/RegisterService";
import DetailPet from "../features/Shop/DetailPet/DetailPet";
import ShopPet from "../features/Shop/ShopPet/ShopPet";

const Routers = (props) => {
  const { location } = props;
  const pathName = location.pathname;
  // const [user, setUser] = useState(null);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (user.id) {
      dispatch(userInfor(user.id));
    }
  }, [user]);

  useEffect(() => {
    dispatch(userData());
  }, [load]);
  const checkLoad = () => {
    setLoad(!load);
  };
  const hangdleLogout = (e) => {
    localStorage.removeItem("tokenPet");
    setTimeout(() => {
      dispatch(userData());
    }, 200);
  };
  console.log("pathName", pathName);
  return (
    <div>
      {pathName.toLocaleLowerCase() === "/login" ||
      pathName.toLocaleLowerCase() === "/register" ||
      pathName.toLocaleLowerCase() === "/admin" ? (
        ""
      ) : (
        <Menu user={user} setUserMenu={hangdleLogout} loadUser={checkLoad} />
      )}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/ListNews" component={ListNews} />
        <Route exact path="/Shop" component={ShopPet} />
        <Route path="/ListNews/:id" component={DetailNew} />
        <Route path="/Shop/:type/:id" component={DetailPet} />
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
        <Route path="/RegisterService/:id" component={RegisterService} />
        <Route
          path="/InforUser/:id"
          component={InforUser}
          // render={() => {
          //   return user.length === 0 ? <Login /> : <InforUser />;
          // }}
        />
        <Route
          path="/Admin"
          render={() => {
            return user.role !== "admin" ? <Error /> : <Nav />;
          }}
        />
      </Switch>
      {pathName.toLocaleLowerCase().includes("admin") ? "" : <Footer />}
    </div>
  );
};
export default withRouter(Routers);
