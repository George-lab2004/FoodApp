import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
// eslint-disable-next-line react/prop-types
export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
        <div>
          <SideBar />
        </div>
        <div className="w-100 ">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
