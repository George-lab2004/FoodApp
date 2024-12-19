import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { axiosInstance, USERS_URLS } from "../../../../services/urls/urls";
import { EMAIL_VALIDATION } from "../../../../services/urls/Validation";
export default function Verify() {
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
      let response = await axiosInstance.put(USERS_URLS.VERIFY, data);
      console.log(response);
      console.log(data);

      navigate("/login");
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
        <h3 className=" fw-bold">Verify Account</h3>
        <span className="text-muted">Verify Your Account</span>
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
            {...register("email", EMAIL_VALIDATION)}
          />
        </div>
        {errors.email && (
          <span className="text-danger ">{errors.email.message}</span>
        )}

        <div className="input-group mb-2">
          <span className="input-group-text " id="basic-addon1">
            <i className="fa fa-key" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Code"
            aria-label="code"
            aria-describedby="basic-addon1"
            {...register("code")}
          />
        </div>
        {errors.code && (
          <span className="text-danger ">{errors.code.message}</span>
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
