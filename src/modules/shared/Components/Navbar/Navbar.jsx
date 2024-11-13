/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import avatar from "../../../../assets/avatar.png";

// eslint-disable-next-line no-unused-vars
export default function Navbar({ loginData }) {
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
