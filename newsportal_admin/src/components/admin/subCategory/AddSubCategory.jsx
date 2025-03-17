import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Select from "react-select";
import { BASE_URL } from "../../../utils/baseURL";
import MiniSpinner from "../../../shared/loader/MiniSpinner";

const AddSubCategory = ({ refetch, setIsAddModalOpen, token }) => {
  const [category_id, setCategory_id] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const { data: categoryTypes = [], isLoading } = useQuery({
    queryKey: [`/api/v1/category/dashboard?role_type=category_show`],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/category/dashboard?role_type=category_show`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      return data;
    },
  });
  // Format the slug whenever it changes
  const formatSlug = (value) => {
    return value.toLowerCase().trim().replace(/\s+/g, "-");
  };
  // Add Subcategory Function
  const handleDataPost = async (data) => {
    // Format slug before submission
    const formattedSlug = formatSlug(data.sub_category_slug);
    setValue("sub_category_slug", formattedSlug);

    setLoading(true);

    const sendData = {
      category_id: category_id,
      sub_category_name: data?.sub_category_name,
      sub_category_slug: formattedSlug,
      sub_category_serial: data?.sub_category_serial,
      sub_category_status: data?.sub_category_status,
    };
    const res = await fetch(
      `${BASE_URL}/sub_category?role_type=sub_category_create`,
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
        result?.message ? result?.message : "SubCategory created successfully",
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
            Add A Sub Category Type:{" "}
          </h2>
          <form
            onSubmit={handleSubmit(handleDataPost)}
            className="bg-white p-4 space-y-4"
          >
            <div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                SubCategory Name
              </p>

              <input
                placeholder="Type Name"
                {...register("sub_category_name", {
                  required: "Type Name is required",
                })}
                id="sub_category_name"
                type="text"
                className="block w-[200px] sm:w-[300px] md:w-[500px] p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              />
              {errors.sub_category_name && (
                <p className="text-red-600">
                  {errors.sub_category_name?.message}
                </p>
              )}
            </div>

            <div className="">
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                SubCategory English Slug
              </p>
              <input
                placeholder="SubCategory English Slug (sc-english-slug)"
                {...register("sub_category_slug", {
                  required: "English Slug is required",
                  validate: (value) =>
                    /^[a-z0-9-]+$/.test(formatSlug(value)) ||
                    "Slug can only contain english lowercase letters, numbers, and dashes",
                  onChange: (e) =>
                    setValue("sub_category_slug", formatSlug(e.target.value)),
                })}
                id="sub_category_slug"
                type="text"
                className="block w-full  p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              />
              {errors.sub_category_slug && (
                <p className="text-red-600 py-1">
                  {errors.sub_category_slug?.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  SubCategory Serial
                </p>

                <input
                  placeholder="Sub Category Serial"
                  {...register("sub_category_serial", {
                    required: "Sub Category Serial is required",
                  })}
                  id="sub_category_serial"
                  type="number"
                  className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
                {errors.sub_category_serial && (
                  <p className="text-red-600">
                    {errors.sub_category_serial?.message}
                  </p>
                )}
              </div>

              <div>
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  SubCategory Status
                </p>

                <select
                  {...register("sub_category_status", {
                    required: "Sub Category Status is required",
                  })}
                  id="sub_category_status"
                  className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
                >
                  <option value="active">Active</option>
                  <option value="in-active">In-Active</option>
                </select>
                {errors.sub_category_status && (
                  <p className="text-red-600">
                    {errors.sub_category_status?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Select Category
              </p>
              {isLoading ? (
                <MiniSpinner />
              ) : (
                <Select
                  id="category_id"
                  name="category_id"
                  required
                  aria-label="Category Type"
                  options={categoryTypes.data}
                  getOptionLabel={(x) => x?.category_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) =>
                    setCategory_id(selectedOption?._id)
                  }
                ></Select>
              )}
            </div>

            {loading ? (
              <button
                type="button"
                className="px-6 py-2 text-white transition-colors duration-300 transform bg-[#3EA2FA] rounded-xl hover:bg-[#3EA2FA]"
              >
                Loading...
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

export default AddSubCategory;
