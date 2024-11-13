import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo1.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
export default function Login({ saveLoginData }) {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );
      localStorage.setItem("token", response.data.token);
      saveLoginData();
      toast.success("logged sucessfully");
      console.log(response);
      console.log(data);

      navigate("/Dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);

      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
                <div className="title my-4 ">
                  <h3>login</h3>
                  <span className="text-muted">
                    welcome Back! Please enter your details
                  </span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-2">
                    <span className="input-group-text " id="basic-addon1">
                      <i className="fa fa-message" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Email"
                      aria-label="email"
                      aria-describedby="basic-addon1"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]*\.[A-Z]{2,}$/i,
                          message: "inavlid email",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-danger ">{errors.email.message}</span>
                  )}
                  <div className="input-group mb-3">
                    <span className="input-group-text " id="basic-addon1">
                      <i className="fa fa-key" aria-hidden="true"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Your Password"
                      aria-label="Password"
                      aria-describedby="basic-addon1"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                  </div>
                  {errors.password && (
                    <span className="text-danger">
                      {errors.password.message}
                    </span>
                  )}

                  <div className="Links d-flex justify-content-between mb-3 ">
                    <Link
                      className="text-decoration-none text-black"
                      to="register"
                    >
                      Register
                    </Link>
                    <Link
                      className="text-decoration-none text-success"
                      to="forget-password"
                    >
                      Forget Your Password
                    </Link>
                  </div>
                  <button
                    className="btn btn-success w-100 rounded rounded-2"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
