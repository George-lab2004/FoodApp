import { Outlet } from "react-router-dom";
import logo from "../../../../assets/logo1.avif";

export default function AuthLayout() {
  return (
    <>
      <div className="auth-container">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100  justify-content-center align-items-center">
            <div className=" col-md-6 rounded rounded-2 px-5 py-3 m-4 col-lg-4 bg-white ">
              <div>
                <div className="logo-container text-center modal-content">
                  <img className="w-75 bg-info" src={logo} alt="" />
                </div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
