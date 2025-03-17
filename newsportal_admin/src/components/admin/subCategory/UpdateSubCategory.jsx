import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { BASE_URL } from "../../../utils/baseURL";
import BigSpinner from "../../../shared/loader/BigSpinner";
import MiniSpinner from "../../../shared/loader/MiniSpinner";

const UpdateSubCategory = ({
  refetch,
  setSubCategoryUpdateModal,
  subCategoryUpdateModalValue,
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

  const [category_id, setCategoryId] = useState(
    subCategoryUpdateModalValue?.category_id?._id
  );

  const categoryIdValue = subCategoryUpdateModalValue?.category_id?._id;
  const categoryNameValue =
    subCategoryUpdateModalValue?.category_id?.category_name;
  const { data: categories, isLoading } = useQuery({
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
  // console.log(categories);

  // post a User details
  // console.log(category_id);
  const handleDataPost = async (data) => {
    const formattedSlug = formatSlug(data.sub_category_slug);
    setValue("sub_category_slug", formattedSlug);
    setLoading(true);
    const sendData = {
      category_id: category_id,
      _id: subCategoryUpdateModalValue?._id,
      sub_category_name: data?.sub_category_name,
      sub_category_slug: formattedSlug,
      sub_category_serial: data?.sub_category_serial,
      sub_category_status: data?.sub_category_status,
    };
    try {
      const response = await fetch(
        `${BASE_URL}/sub_category?role_type=sub_category_update`,
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
            : "SubCategory created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setSubCategoryUpdateModal(false);
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

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin">
        <div className="flex items-center justify-between">
          <h3
            className="text-[26px] font-bold text-gray-800 capitalize"
            id="modal-title"
          >
            {" "}
            Update SubCategory
          </h3>
          <button
            type="button"
            onClick={() => setSubCategoryUpdateModal(false)}
            className="btn bg-white hover:bg-white border p-1"
          >
            <RxCross1 size={25}></RxCross1>
          </button>
        </div>

        <hr className="mt-2 mb-4" />

        <form onSubmit={handleSubmit(handleDataPost)}>
          <div className="mt-4">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              SubCategory Name
            </p>
            <input
              placeholder="Sub Category Name"
              {...register("sub_category_name", {
                required: "Sub Category Name is required",
              })}
              defaultValue={subCategoryUpdateModalValue?.sub_category_name}
              id="sub_category_name"
              type="text"
              className="block w-full px-2 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.sub_category_name && (
              <p className="text-red-600">
                {errors.sub_category_name?.message}
              </p>
            )}
          </div>

          <div className="mt-4">
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
              defaultValue={subCategoryUpdateModalValue?.sub_category_slug}
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
          <div className="mt-4">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              SubCategory Serial
            </p>
            <input
              placeholder="Category Serial"
              {...register("sub_category_serial", {
                required: "Category Serial is required",
              })}
              defaultValue={subCategoryUpdateModalValue?.sub_category_serial}
              id="sub_category_serial"
              type="number"
              className="block w-full px-2 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.sub_category_serial && (
              <p className="text-red-600">
                {errors.sub_category_serial?.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              SubCategory Status
            </p>
            <select
              {...register("sub_category_status", {
                required: "Sub Category Status is required",
              })}
              id="sub_category_status"
              className=" w-full px-2 py-1.5  text-gray-700 bg-white border border-gray-200 rounded-xl"
              defaultValue={subCategoryUpdateModalValue?.sub_category_status}
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

          <div className="mt-4">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Select Category
            </p>
            <Select
              id="category_id"
              name="category_id"
              required
              aria-label="Category Type"
              defaultValue={{
                _id: categoryIdValue,
                category_name: categoryNameValue,
              }}
              options={categories?.data}
              getOptionLabel={(x) => x?.category_name}
              getOptionValue={(x) => x?._id}
              onChange={(selectedOption) => setCategoryId(selectedOption?._id)}
            ></Select>
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <button
              type="button"
              onClick={() => setSubCategoryUpdateModal(false)}
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

export default UpdateSubCategory;
