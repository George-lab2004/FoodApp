import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "../../../../assets/logo1.png";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For New Password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For Confirm Password visibility
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues, // To validate confirm password
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );
      console.log(response);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error during OTP submission:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 rounded rounded-2 px-5 py-3 m-4 col-lg-4 bg-white">
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
              {/* Email Input */}
              <div className="input-group mb-2">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-regular fa-envelope" aria-hidden="true"></i>
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
                <span className="text-danger -mt-1">
                  {errors.email.message}
                </span>
              )}

              {/* OTP Input */}
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

              {/* New Password Input with Visibility Toggle */}
              <div className="input-group mb-2">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-lock" aria-hidden="true"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"} // Toggle visibility
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
                <span
                  className="input-group-text"
                  id="toggle-password"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)} // Toggle the password visibility
                  aria-label={showPassword ? "Hide password" : "Show password"} // Add aria-label for screen readers
                >
                  <i
                    className={
                      showPassword
                        ? "fa-regular fa-eye-slash"
                        : "fa-regular fa-eye"
                    }
                  ></i>
                </span>
              </div>
              {errors.password && (
                <span className="text-danger -mt-1">
                  {errors.password.message}
                </span>
              )}

              {/* Confirm Password Input with Visibility Toggle */}
              <div className="input-group mb-2">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-lock" aria-hidden="true"></i>
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"} // Toggle visibility
                  className="form-control"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  aria-describedby="basic-addon1"
                  {...register("confirmPassword", {
                    required: "Confirmation password is required",
                    validate: (value) =>
                      value === getValues("password") || "Passwords must match", // Custom validation
                  })}
                />
                <span
                  className="input-group-text"
                  id="toggle-confirm-password"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  } // Add aria-label for screen readers
                >
                  <i
                    className={
                      showConfirmPassword
                        ? "fa-regular fa-eye-slash"
                        : "fa-regular fa-eye"
                    }
                  ></i>
                </span>
              </div>
              {errors.confirmPassword && (
                <span className="text-danger">
                  {errors.confirmPassword.message}
                </span>
              )}

              {/* Submit Button */}
              <button
                className="btn btn-success w-100 rounded rounded-2"
                disabled={loading}
              >
                {loading ? "Loading..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
