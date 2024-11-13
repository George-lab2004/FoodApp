import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import logo from "../../../../assets/3.png";
import { useState } from "react";
export default function SideBar() {
  const [isCollapse, setIsCollapse] = useState(true);
  let toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  };
  return (
    <>
      <div className="sidebar-container">
        <Sidebar collapsed={isCollapse} className="rounded-R">
          <Menu className="vh-100">
            <MenuItem
              onClick={toggleCollapse}
              icon={<img className="w-100  " src={logo} alt="" />}
              className="my-4 mx-auto "
            >
              {" "}
            </MenuItem>
            <MenuItem
              icon={<div className="fa fa-home mx-3 menu-item"></div>}
              component={<Link to="/Dashboard" />}
            >
              Home{" "}
            </MenuItem>
            <MenuItem
              icon={<div className="fa fa-users mx-3 menu-item"></div>}
              component={<Link to="/Dashboard/users" />}
            >
              users
            </MenuItem>

            <MenuItem
              icon={<div className="fa fa-shapes mx-3 menu-item"></div>}
              component={<Link to="/Dashboard/recipes" />}
            >
              recipes{" "}
            </MenuItem>
            <MenuItem
              icon={
                <div className="fa-regular fa-calendar-days mx-3 menu-item"></div>
              }
              component={<Link to="/Dashboard/categories" />}
            >
              Categories{" "}
            </MenuItem>
            <MenuItem icon={<div className="fa fa-lock mx-3 menu-item"></div>}>
              {" "}
              Change Password{" "}
            </MenuItem>
            <MenuItem
              icon={
                <div className="fa-solid fa-right-from-bracket mx-3 menu-item"></div>
              }
              component={<Link to="/login" />}
            >
              Logout{" "}
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
