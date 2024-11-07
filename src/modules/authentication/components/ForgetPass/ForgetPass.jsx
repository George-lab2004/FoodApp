import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo1.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ForgetPass() {
  let navigate = useNavigate();
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data
      );
      console.log(response);
      console.log(data);

      navigate("/Reset");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);

      console.log(error);
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
                  <h3 className=" fw-bold">Forgot Your Password?</h3>
                  <span className="text-muted">
                    No worries! Please enter your email and we will send a
                    password reset link{" "}
                  </span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-2">
                    <span className="input-group-text " id="basic-addon1">
                      <i className="fa fa-mobile" aria-hidden="true"></i>
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

                  <button className="btn btn-success w-100 rounded rounded-2">
                    Submit
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
