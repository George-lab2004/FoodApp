import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo1.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPass() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues, // Import getValues to access other field values
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );
      console.log(response);
      console.log(data);
      navigate("/login");
      toast.success(response.data.message);
    } catch (error) {
      // Log the error message for troubleshooting
      console.error("Error during OTP submission:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 rounded rounded-2 px-5 py-3 m-4 col-lg-4 bg-white">
            <div>
              <div className="logo-container text-center modal-content">
                <img className="w-75 bg-info" src={logo} alt="" />
              </div>
              <div className="title my-4">
                <h3 className="fw-bold">Reset Password</h3>
                <span className="text-muted">
                  Please Enter Your OTP or Check Your Inbox
                </span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i
                      className="fa-regular fa-envelope"
                      aria-hidden="true"
                    ></i>
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
                        message: "Invalid email",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}

                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-lock" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="OTP"
                    aria-label="OTP"
                    aria-describedby="basic-addon1"
                    {...register("seed", {
                      required: "OTP is required",
                    })}
                  />
                </div>
                {errors.seed && (
                  <span className="text-danger">{errors.seed.message}</span>
                )}
                {errors.seed && console.error("OTP field error:", errors.seed)}

                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-lock" aria-hidden="true"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    aria-label="New Password"
                    aria-describedby="basic-addon1"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        message:
                          "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long",
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <span className="text-danger">{errors.password.message}</span>
                )}

                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-lock" aria-hidden="true"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    aria-label="Confirm Password"
                    aria-describedby="basic-addon1"
                    {...register("confirmPassword", {
                      required: "Confirmation password is required",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords must match", // Custom validation
                    })}
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="text-danger">
                    {errors.confirmPassword.message}
                  </span>
                )}

                <button className="btn btn-success w-100 rounded rounded-2">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
