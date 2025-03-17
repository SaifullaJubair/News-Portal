import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MiniSpinner from "../../shared/loader/MiniSpinner";
import { setCookie } from "../../utils/cookie-storage";
import { authKey } from "../../utils/storageKey";
import { BASE_URL } from "../../utils/baseURL";

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const location = useLocation();
  const form = location?.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const handleSignIn = async (data) => {
    setLoading(true);
    const sendData = {
      user_phone: data?.user_phone,
      user_password: data?.user_password,
    };
    try {
      const response = await fetch(`${BASE_URL}/userLog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();
      if (result?.statusCode == 200 && result?.success == true) {
        // console.log(result);
        setCookie(authKey, result?.data?.token);

        toast.success(
          result?.message ? result?.message : "Login successfully",
          {
            autoClose: 1000,
          }
        );
        navigate(form, { replace: true });
        window.location.reload();
        reset();

        setLoading(false);
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Network error or server is down", {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center md:min-h-screen py-10">
      <div className="w-full mx-3 md:w-[400px] px-3 md:px-10 pt-5 pb-14 border rounded bg-slate-100 shadow-md">
        <h2 className="text-2xl text-center text-gray-900 my-4 font-bold border-b pb-2">
          Login
        </h2>

        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <div className="form-control w-full">
            <label htmlFor="user_phone" className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              id="user_phone"
              type="number"
              placeholder="Enter your phone number"
              className="border rounded px-3 py-2 w-full"
              {...register("user_phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{11}$/,
                  message: "Phone number must be 11 digits long",
                },
              })}
            />
            {errors.user_phone && (
              <p className="text-red-600"> {errors?.user_phone?.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <label htmlFor="user_password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="user_password"
              type="password"
              placeholder="* * * * *"
              className="border rounded px-3 py-2 w-full"
              {...register("user_password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 character",
                },
              })}
            />
            {errors.user_password && (
              <p className="text-red-600"> {errors.user_password.message}</p>
            )}
          </div>
          <div className="text-[14px] flex justify-between">
            {/* <p className="text-[14px] mt-4"></p> */}
            <Link to="/sign-up" className="text-primaryColor">
              Create account?
            </Link>
            <Link
              to={"/forget-password"}
              className="text-primaryColor underline cursor-pointer"
            >
              Forget Password
            </Link>
          </div>
          <button
            className="px-10 py-2 text-textColor bg-primaryColor w-full opacity-100 hover:opacity-80 transition-opacity duration-200 ease-in-out rounded-full"
            type="submit"
          >
            {loading ? <MiniSpinner /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
