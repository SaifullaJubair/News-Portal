import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { BASE_URL } from "../../../utils/baseURL";
import MiniSpinner from "../../../shared/loader/MiniSpinner";

const UpdateTodayNewsCategory = ({
  refetch,
  setUpdateModal,
  updateModalValue,
  token,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const formatSlug = (value) => {
    return value.toLowerCase().trim().replace(/\s+/g, "-");
  };

  // post a User details
  const handleDataPost = async (data) => {
    const formattedSlug = formatSlug(data.category_slug);
    setValue("category_slug", formattedSlug);

    setLoading(true);
    const sendData = {
      _id: updateModalValue?._id,
      category_name: data?.category_name,
      category_serial: data?.category_serial,
      category_slug: formattedSlug,
      category_status: data?.category_status,
    };
    try {
      const response = await fetch(
        `${BASE_URL}/today_news_category?role_type=today_news_category_update`,
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
          result?.message
            ? result?.message
            : "Today News Category created successfully",
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
            Update Today News Category
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
              Category Name
            </p>
            <input
              placeholder=" Category Name"
              {...register("category_name", {
                required: "Category Name is required",
              })}
              defaultValue={updateModalValue?.category_name}
              id="category_name"
              type="text"
              className="block w-full px-2 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.category_name && (
              <p className="text-red-600">{errors.category_name?.message}</p>
            )}
          </div>
          <div className="mt-4">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Category English Slug
            </p>
            <input
              placeholder="Category English Slug (category-english-slug)"
              {...register("category_slug", {
                required: "English Slug is required",
                validate: (value) =>
                  /^[a-z0-9-]+$/.test(formatSlug(value)) ||
                  "Slug can only contain english lowercase letters, numbers and dashes",
                onChange: (e) =>
                  setValue("category_slug", formatSlug(e.target.value)),
              })}
              defaultValue={updateModalValue?.category_slug}
              id="category_slug"
              type="text"
              className="block w-full  p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.category_slug && (
              <p className="text-red-600 py-1 text-sm">
                {errors.category_slug?.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Category Serial
            </p>
            <input
              placeholder="Category Serial"
              {...register("category_serial", {
                required: "Category Serial is required",
              })}
              defaultValue={updateModalValue?.category_serial}
              id="category_serial"
              type="number"
              className="block w-full px-2 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.category_serial && (
              <p className="text-red-600">{errors.category_serial?.message}</p>
            )}
          </div>

          <div className="mt-4">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Category Status
            </p>
            <select
              {...register("category_status", {
                required: " Category Status is required",
              })}
              id="category_status"
              className=" w-full px-2 py-1.5  text-gray-700 bg-white border border-gray-200 rounded-xl"
              defaultValue={updateModalValue?.category_status}
            >
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
            {errors.category_status && (
              <p className="text-red-600">{errors.category_status?.message}</p>
            )}
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <button
              type="button"
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

export default UpdateTodayNewsCategory;
