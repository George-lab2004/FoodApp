import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { axiosInstance, USERS_URLS } from "../../../../services/urls/urls";
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  PHONE_VALIDATION,
} from "../../../../services/urls/Validation";
export default function Registeration() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For New Password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For Confirm Password visibility
  let navigate = useNavigate();
  let {
    register,
    formState: { errors },
    handleSubmit,
    getValues, // To validate confirm password
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let response = await axiosInstance.post(USERS_URLS.REGISTER, data);
      toast.success(response.data.message || "Registration successful!");
      console.log(response);
      console.log(data);

      navigate("/verify");
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
      <div className="title my-4 ">
        <h3>Register</h3>
        <span className="text-muted">
          welcome Back! Please enter your details
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex justify-content-center align-items-center gap-3">
          <div className="col-md-6">
            {" "}
            <div className="input-group mb-2">
              <span className="input-group-text " id="basic-addon1">
                <i className="fa fa-message" aria-hidden="true"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Name"
                aria-label="userName"
                aria-describedby="basic-addon1"
                {...register("userName", {
                  required: "Username is required",
                  minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters",
                  },
                  maxLength: {
                    value: 8,
                    message: "Username must not exceed 8 characters",
                  },
                })}
              />
            </div>
            {errors.userName && (
              <span className="text-danger ">{errors.userName.message}</span>
            )}
            <div className="input-group mb-2">
              <span className="input-group-text " id="basic-addon1">
                <i className="fa fa-message" aria-hidden="true"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your country"
                aria-label="country"
                aria-describedby="basic-addon1"
                {...register("country", {
                  required: "Country is required",
                })}
              />
            </div>
            {errors.country && (
              <span className="text-danger ">{errors.country.message}</span>
            )}
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
                {...register("password", PASSWORD_VALIDATION)}
              />
              <button
                className="input-group-text"
                id="toggle-password"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)} // Toggle the password visibility
                aria-label={showPassword ? "Hide password" : "Show password"} // Add aria-label for screen readers
                data-bs-toggle="tooltip" // Enables Bootstrap tooltip
                title={showPassword ? "Hide password" : "Show password"} // Tooltip text
              >
                <i
                  className={
                    showPassword
                      ? "fa-regular fa-eye-slash"
                      : "fa-regular fa-eye"
                  }
                ></i>
                <span className="mobile-text">
                  {showPassword ? "Hide Password" : "Show Password"}
                </span>
              </button>
            </div>
            {errors.password && (
              <span className="text-danger -mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="col-md-6">
            {" "}
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
                {...register("email", EMAIL_VALIDATION)}
              />
            </div>
            {errors.email && (
              <span className="text-danger ">{errors.email.message}</span>
            )}
            <div className="input-group mb-2">
              <span className="input-group-text " id="basic-addon1">
                <i className="fa fa-message" aria-hidden="true"></i>
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Your Phone"
                aria-label="phoneNumber"
                aria-describedby="basic-addon1"
                {...register("phoneNumber", PHONE_VALIDATION)}
              />
            </div>
            {errors.phoneNumber && (
              <span className="text-danger ">{errors.phoneNumber.message}</span>
            )}
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

              <button
                className="input-group-text"
                id="toggle-confirm-password"
                style={{ cursor: "pointer" }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
                data-bs-toggle="tooltip" // Enables Bootstrap tooltip
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                } // Add aria-label for screen readers
                title={showPassword ? "Hide password" : "Show password"} // Tooltip text
              >
                <i
                  className={
                    showConfirmPassword
                      ? "fa-regular fa-eye-slash"
                      : "fa-regular fa-eye"
                  }
                ></i>
                <span className="mobile-text">
                  {showPassword ? "Hide Password" : "Show Password"}
                </span>
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-danger">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>

        <div className="Links d-flex justify-content-between mb-3 ">
          <Link className="text-decoration-none text-black" to="/register">
            Register
          </Link>
          <Link
            className="text-decoration-none text-success"
            to="/forget-password"
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
    </>
  );
}
