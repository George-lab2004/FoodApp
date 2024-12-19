import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { axiosInstance, USERS_URLS } from "../../../../services/urls/urls";
export default function ForgetPass() {
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
      let response = await axiosInstance.post(USERS_URLS.FORGET_PASS, data);
      console.log(response);
      console.log(data);

      navigate("/reset-password");
      toast.success(response.data.message);
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
        <h3 className=" fw-bold">Forgot Your Password?</h3>
        <span className="text-muted">
          No worries! Please enter your email and we will send a password reset
          link
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
