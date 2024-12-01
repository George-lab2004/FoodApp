/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import avatar from "../../../../assets/avatar.png";
import logo from "../../../../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext.jsx";

// eslint-disable-next-line no-unused-vars
export default function Navbar() {
  let { loginData } = useContext(AuthContext);

  return (
    <>
      <div className="bg-white py-3 d-flex justify-content-end">
        <img className="avatar" src={avatar} alt="" />
        <span className="my-auto">{loginData?.userName}</span>
      </div>
    </>
  );
}

// NavBar.jsx
