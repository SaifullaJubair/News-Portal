import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { BASE_URL } from "../../../utils/baseURL";
import MiniSpinner from "../../../shared/loader/MiniSpinner";

const AddTodayNewsCategory = ({ refetch, setIsAddModalOpen, token }) => {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const formatSlug = (value) => {
    return value.toLowerCase().trim().replace(/\s+/g, "-");
  };
  // Add Subcategory Function
  const handleDataPost = async (data) => {
    // Format slug before submission
    const formattedSlug = formatSlug(data.category_slug);
    setValue("category_slug", formattedSlug);

    setLoading(true);

    const sendData = {
      category_name: data?.category_name,
      category_slug: formattedSlug,
      category_serial: data?.category_serial,
      category_status: data?.category_status,
    };
    const res = await fetch(
      `${BASE_URL}/today_news_category?role_type=today_news_category_create`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sendData),
      }
    );
    const result = await res.json();
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
      reset();
      setLoading(false);
      setIsAddModalOpen(false);
    } else {
      setLoading(false);
      toast.error(result?.message || "Something went wrong", {
        autoClose: 1000,
      });
    }

    // console.log(sendData);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        {/* Add A Sub Category Type */}
        <div className="bg-white rounded-lg p-4 ">
          <h2 className="font-semibold text-[20px]">
            Add A Today News Category Type:{" "}
          </h2>
          <form
            onSubmit={handleSubmit(handleDataPost)}
            className="bg-white p-4 space-y-4"
          >
            <div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Category Name
              </p>

              <input
                placeholder="Type Name"
                {...register("category_name", {
                  required: "Type Name is required",
                })}
                id="category_name"
                type="text"
                className="block w-[200px] sm:w-[300px] md:w-[500px] p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              />
              {errors.category_name && (
                <p className="text-red-600">{errors.category_name?.message}</p>
              )}
            </div>

            <div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Category English Slug
              </p>
              <input
                placeholder="Category English Slug (category-english-slug)"
                {...register("category_slug", {
                  required: "English Slug is required",
                  validate: (value) =>
                    /^[a-z0-9-]+$/.test(formatSlug(value)) ||
                    "Slug can only contain lowercase letters, numbers, and dashes",
                  onChange: (e) =>
                    setValue("category_slug", formatSlug(e.target.value)),
                })}
                id="category_slug"
                type="text"
                className="block w-full  p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              />
              {errors.category_slug && (
                <p className="text-red-600 py-1">
                  {errors.category_slug?.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  Category Serial
                </p>

                <input
                  placeholder="Category Serial"
                  {...register("category_serial", {
                    required: "Sub Category Serial is required",
                  })}
                  id="category_serial"
                  type="number"
                  className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
                {errors.category_serial && (
                  <p className="text-red-600">
                    {errors.category_serial?.message}
                  </p>
                )}
              </div>

              <div>
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  Category Status
                </p>

                <select
                  {...register("category_status", {
                    required: "Sub Category Status is required",
                  })}
                  id="category_status"
                  className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
                >
                  <option value="active">Active</option>
                  <option value="in-active">In-Active</option>
                </select>
                {errors.category_status && (
                  <p className="text-red-600">
                    {errors.category_status?.message}
                  </p>
                )}
              </div>
            </div>

            {loading ? (
              <button
                type="button"
                className="px-6 py-2 text-white transition-colors duration-300 transform bg-[#3EA2FA] rounded-xl hover:bg-[#3EA2FA]"
              >
                <MiniSpinner />
              </button>
            ) : (
              <button
                type="Submit"
                className="px-6 py-2 text-white transition-colors duration-300 transform bg-[#3EA2FA] rounded-xl hover:bg-[#3EA2FA]"
              >
                Create
              </button>
            )}

            <button
              className="bg-gray-300 ms-2 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-xl mr-2"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTodayNewsCategory;
