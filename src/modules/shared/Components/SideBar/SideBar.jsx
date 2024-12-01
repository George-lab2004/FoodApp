import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/3.png";
import logo2 from "../../../../assets/logo1.png";

import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { axiosInstance, USERS_URLS } from "../../../../services/urls/urls";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { PASSWORD_VALIDATION } from "../../../../services/urls/Validation";

export default function SideBar() {
  let { loginData } = useContext(AuthContext);
  const [isCollapse, setIsCollapse] = useState(true);
  const [isAuthorized, setIsAuthorized] = React.useState(() => {
    const token = localStorage.getItem("token");
    if (token) return true;
    return false;
  });
  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isReEnterPasswordVisible, setIsReEnterPasswordVisible] =
    useState(false);
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { data: response } = await axiosInstance.put(
        USERS_URLS.CHANGE_PASSWORD,
        data
      );
      toast.success(response.message);
      localStorage.removeItem("token");
      navigate("/login");
      setShowModal(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const newPassword = watch("newPassword");

  return (
    <>
      {/* Hamburger button for small screens */}
      <button className="hamburger-btn" onClick={toggleCollapse}>
        <i className={`fa ${isCollapse ? "fa-bars" : "fa-times"}`}></i>
      </button>

      <div className={`sidebar-container ${isCollapse ? "collapsed" : ""}`}>
        <Sidebar collapsed={isCollapse} className="rounded-R overflow-scroll">
          <Menu className="vh-100">
            <MenuItem
              onClick={toggleCollapse}
              icon={<img className="w-100" src={logo} alt="" />}
              className="my-4 mx-auto"
            ></MenuItem>
            <MenuItem
              icon={<div className="fa fa-home mx-3 menu-item"></div>}
              component={<Link to="/Dashboard" />}
            >
              Home
            </MenuItem>
            {loginData?.userGroup != "SystemUser" ? (
              <MenuItem
                icon={<div className="fa fa-users mx-3 menu-item"></div>}
                component={<Link to="/Dashboard/users" />}
              >
                Users
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              icon={<div className="fa fa-shapes mx-3 menu-item"></div>}
              component={<Link to="/Dashboard/recipes" />}
            >
              Recipes
            </MenuItem>
            {loginData?.userGroup != "SystemUser" ? (
              <MenuItem
                icon={
                  <div className="fa-regular fa-calendar-days mx-3 menu-item"></div>
                }
                component={<Link to="/Dashboard/categories" />}
              >
                Categories
              </MenuItem>
            ) : (
              ""
            )}
            {loginData?.userGroup == "SystemUser" ? (
              <MenuItem
                icon={<i className="fa fa-heart"></i>}
                component={<Link to="/dashboard/favorites" />}
              >
                {" "}
                Favourites{" "}
              </MenuItem>
            ) : (
              ""
            )}
            <MenuItem
              icon={<div className="fa fa-lock mx-3 menu-item"></div>}
              onClick={() => setShowModal(true)}
            >
              Change Password
            </MenuItem>

            <MenuItem
              icon={
                <div className="fa-solid fa-right-from-bracket mx-3 menu-item"></div>
              }
              component={<Link to="/login" />}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <img src={logo2} className="w-50 mb-3" alt="Logo" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Old Password */}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type={isOldPasswordVisible ? "text" : "password"}
                  className="form-control"
                  placeholder="Old Password"
                  {...register("oldPassword", PASSWORD_VALIDATION)}
                />
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
                >
                  {isOldPasswordVisible ? (
                    <i className="fa-solid fa-eye"></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash"></i>
                  )}
                </button>
              </div>
              {errors.oldPassword && (
                <span className="text-danger">
                  {errors.oldPassword.message}
                </span>
              )}

              {/* New Password */}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="form-control"
                  placeholder="New Password"
                  {...register("newPassword", PASSWORD_VALIDATION)}
                />
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <i className="fa-solid fa-eye"></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash"></i>
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <span className="text-danger">
                  {errors.newPassword.message}
                </span>
              )}

              {/* Confirm New Password */}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type={isReEnterPasswordVisible ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm New Password"
                  {...register("confirmNewPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === newPassword || "The passwords do not match",
                  })}
                />
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() =>
                    setIsReEnterPasswordVisible(!isReEnterPasswordVisible)
                  }
                >
                  {isReEnterPasswordVisible ? (
                    <i className="fa-solid fa-eye"></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash"></i>
                  )}
                </button>
              </div>
              {errors.confirmNewPassword && (
                <span className="text-danger">
                  {errors.confirmNewPassword.message}
                </span>
              )}

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Change Password"
                )}
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
