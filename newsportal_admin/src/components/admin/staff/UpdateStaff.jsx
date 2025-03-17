import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../utils/baseURL";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { getCookie } from "../../../utils/cookie-storage";
import { authKey } from "../../../utils/storageKey";
const UpdateStaff = ({
  refetch,
  setUpdateModal,
  updateModalValue,
  roleData,
  isLoading,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [changePassword, setChangePassword] = useState(false);

  // get token
  const token = getCookie(authKey);

  // Update a User
  const handleDataPost = async (data) => {
    setLoading(true);
    const sendData = {
      _id: updateModalValue?._id,
      role_id: data?.role_id,
      user_name: data?.user_name,
      user_status: data?.user_status,
      user_phone: data?.user_phone,
      user_password: data?.user_password,
    };
    if (!data?.user_password) {
      delete sendData?.user_password;
    }
    // console.log(sendData);
    try {
      const response = await fetch(
        `${BASE_URL}/userReg?role_type=staff_update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // Specify content type for JSON request
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(sendData),
        }
      );
      const result = await response.json();
      if (result?.statusCode == 200 && result?.success == true) {
        toast.success(
          result?.message ? result?.message : "Staff updated  successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setUpdateModal(false);
        reset();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3
            className="text-[26px] font-bold text-gray-800 capitalize"
            id="modal-title"
          >
            {" "}
            Update User
          </h3>
          <button
            type="button"
            onClick={() => setUpdateModal(false)}
            className="btn bg-white hover:bg-white border p-1"
          >
            <RxCross1 size={25}></RxCross1>
          </button>
        </div>

        <hr className="mt-2 mb-4" />

        <form onSubmit={handleSubmit(handleDataPost)}>
          <div className="mt-4">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              User Name
            </p>
            <input
              placeholder=" User Name"
              {...register("user_name", {
                required: "User Name is required",
              })}
              defaultValue={updateModalValue?.user_name}
              id="user_name"
              type="text"
              className="block w-full px-2 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.user_name && (
              <p className="text-red-600">{errors.user_name?.message}</p>
            )}
          </div>

          {/* User Phone */}
          <div className="mt-4">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              User Phone
            </p>
            <input
              placeholder=" User Phone"
              {...register("user_phone", {
                required: " User phone is required",
                validate: {
                  isElevenDigits: (value) =>
                    value.length === 11 || "Phone number must be 11 digits",
                },
              })}
              defaultValue={updateModalValue?.user_phone}
              id="user_phone"
              type="number"
              className="block w-full px-2 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.user_phone && (
              <p className="text-red-600">{errors.user_phone?.message}</p>
            )}
          </div>
          {/* User Role */}
          <div className="mt-4">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              User Role
            </p>
            <select
              {...register("role_id", {
                required: " User Role is required",
              })}
              id="role_id"
              defaultValue={updateModalValue?.role_id?._id}
              className=" w-full px-2 py-1.5  text-gray-700 bg-white border border-gray-200 rounded-xl"
            >
              {isLoading ? (
                <MiniSpinner />
              ) : (
                <>
                  {" "}
                  <option
                    value={updateModalValue?.role_id?._id}
                    selected
                    disabled
                  >
                    {" "}
                    {updateModalValue?.role_id?.role_name}
                  </option>
                  {roleData.map((role) => (
                    <option key={role?._id} value={role?._id}>
                      {role?.role_name}
                    </option>
                  ))}
                </>
              )}
            </select>
            {errors.role_id && (
              <p className="text-red-600">{errors.role_id?.message}</p>
            )}
          </div>

          {/* User Status */}

          <div className="mt-4">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              User Status
            </p>
            <select
              {...register("user_status", {
                required: " User Status is required",
              })}
              id="user_status"
              className=" w-full px-2 py-1.5  text-gray-700 bg-white border border-gray-200 rounded-xl"
              defaultValue={updateModalValue?.user_status}
            >
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
            {errors.user_status && (
              <p className="text-red-600">{errors.user_status?.message}</p>
            )}
          </div>

          {changePassword === false && (
            <div className="flex justify-between mt-6  ">
              <p className="text-gray-700 font-semibold text-sm">
                Do you want to change your password
              </p>
              <button
                onClick={() => setChangePassword(true)}
                type="button"
                className="btn bg-green-500 font-semibold text-sm text-white px-2.5 py-1 rounded hover:bg-green-600 duration-200"
              >
                Change Password
              </button>
            </div>
          )}
          {changePassword === true && (
            <div className="mt-4">
              <div className="flex justify-between mt-6  ">
                <p className="text-gray-700 font-semibold text-sm">
                  Update your password
                </p>
                <button
                  onClick={() => setChangePassword(false)}
                  type="button"
                  className="btn bg-red-500 font-semibold text-sm text-white px-2.5 py-1 rounded hover:bg-red-600 duration-200"
                >
                  Cancel
                </button>
              </div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                New Password
              </p>
              <input
                placeholder=" User Password"
                {...register("user_password", {
                  required: " User Password is required",
                })}
                id="user_password"
                type="text"
                className="block w-full px-2 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              />
              {errors.user_password && (
                <p className="text-red-600">{errors.user_password?.message}</p>
              )}
            </div>
          )}

          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={() => setUpdateModal(false)}
              className="btn px-6 py-2.5 transition-colors duration-300 transform bg-white rounded-xl border"
            >
              Cancel
            </button>
            {loading ? (
              <button
                type="button"
                className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]"
              >
                <MiniSpinner />
              </button>
            ) : (
              <button
                type="Submit"
                className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStaff;
