"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { BASE_URL } from "@/utils/baseURL";
import MiniSpinner from "@/shared/loader/MiniSpinner";
import Image from "next/image";

const UpdateCategory = ({
  setCategoryUpdateModal,
  categoryUpdateModalValue,
  refetch,
  token,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(
    categoryUpdateModalValue?.special_category
  );

  const [isCategoryLogo, setIsCategoryLogo] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsCategoryLogo(URL.createObjectURL(file));
    }
  };

  // Format the slug whenever it changes
  const formatSlug = (value) => {
    return value.toLowerCase().trim().replace(/\s+/g, "-");
  };

  const handleDataPost = async (data) => {
    setLoading(true);
    // Format slug before submission
    const formattedSlug = formatSlug(data.category_slug);
    setValue("category_slug", formattedSlug);

    if (data?.category_logo[0]) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "category_logo") {
          formData.append(key, data?.category_logo[0]);
        } else if (key === "special_category_serial") {
          if (checked === false) {
            formData.append("special_category_serial", 0);
          } else {
            formData.append(
              "special_category_serial",
              data?.special_category_serial
            );
          }
        } else formData.append(key, value);
      });

      formData.append("image_key", categoryUpdateModalValue?.image_key);
      formData.append("_id", categoryUpdateModalValue?._id);
      // Uncomment and adjust this according to your actual API call logic
      try {
        const response = await fetch(
          `${BASE_URL}/category?role_type=category_update`,
          {
            method: "PATCH",
            headers: {
              authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
        const result = await response.json();
        if (result?.statusCode === 200 && result?.success === true) {
          toast.success(result?.message || "Category update successfully!", {
            autoClose: 1000,
          });
          refetch();
          reset();
          setCategoryUpdateModal(false);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(result?.message);
        }
      } catch (error) {
        toast.error("Network error or server is down", {
          autoClose: 1000,
        });
      } finally {
        setLoading(false);
      }
    } else {
      const specialCategorySerial =
        checked === true ? data?.special_category_serial : 0;
      const sendData = {
        _id: categoryUpdateModalValue?._id,
        image_key: categoryUpdateModalValue?.image_key,
        category_logo: categoryUpdateModalValue?.category_logo,
        category_name: data?.category_name,
        category_slug: formattedSlug,
        category_serial: data?.category_serial,
        category_status: data?.category_status,
        special_category: checked,

        special_category_serial: specialCategorySerial,
      };
      try {
        const response = await fetch(
          `${BASE_URL}/category?role_type=category_update`,
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
        if (result?.statusCode === 200 && result?.success === true) {
          toast.success(result?.message || "Category update successfully!", {
            autoClose: 1000,
          });
          refetch();
          reset();
          setCategoryUpdateModal(false);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(result?.message, {
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
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3
            className="text-[26px] font-bold text-[#0A0A0A] capitalize"
            id="modal-title"
          >
            Update Category
          </h3>
          <button
            type="button"
            className="btn bg-white hover:bg-white border p-1"
            onClick={() => setCategoryUpdateModal(false)}
          >
            <RxCross1 size={25} />
          </button>
        </div>

        <hr className="mt-2 mb-4" />

        <form onSubmit={handleSubmit(handleDataPost)}>
          <div className="mt-4">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Category Name
            </p>
            <input
              placeholder="Category Name"
              {...register("category_name", {
                required: "Category Name is required",
              })}
              defaultValue={categoryUpdateModalValue?.category_name}
              id="category_name"
              type="text"
              className="block w-full px-3 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
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
              defaultValue={categoryUpdateModalValue?.category_slug}
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
            {isCategoryLogo ? (
              <div className="flex items-center justify-center">
                <Image
                width={200}
                height={200}
                  src={isCategoryLogo}
                  alt="Category Logo"
                  className="h-[200px] w-full"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Image
                width={200}
                height={200}
                  src={categoryUpdateModalValue?.category_logo}
                  alt="Category Logo"
                  className="h-[250px] w-full"
                />
              </div>
            )}
            <input
              {...register("category_logo", {
                validate: (value) => {
                  if (value && value.length > 0) {
                    return (
                      value[0].type.startsWith("image/") ||
                      "Only image files are allowed"
                    );
                  }
                  return true;
                },
              })}
              id="category_logo"
              type="file"
              accept="image/*"
              className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
              onChange={handleImageChange}
            />
            {errors.category_logo && (
              <p className="text-red-600">{errors.category_logo?.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Category serial */}
            <div className="mt-4">
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Category Serial
              </p>

              <input
                placeholder="Category Serial"
                {...register("category_serial", {
                  required: "Category Serial is required",
                })}
                defaultValue={categoryUpdateModalValue?.category_serial}
                id="category_serial"
                type="number"
                className="block w-full px-3 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
              />
              {errors.category_serial && (
                <p className="text-red-600">
                  {errors.category_serial?.message}
                </p>
              )}
            </div>
            {/* Category status */}
            <div className="mt-4">
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Category Status
              </p>
              <select
                {...register("category_status", {
                  required: "Category Status is required",
                })}
                id="category_status"
                className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
              >
                <option
                  disabled
                  selected
                  value={categoryUpdateModalValue?.category_status}
                >
                  {categoryUpdateModalValue?.category_status}
                </option>
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
          {/*Special Category start */}

          <div className="flex items-center gap-2 mt-4 mb-2 ml-1">
            <input
              {...register("special_category")}
              id="special_category"
              type="checkbox"
              className="w-4 h-4"
              onChange={() => setChecked(!checked)}
              defaultChecked={categoryUpdateModalValue?.special_category}
            />
            <p>Special Category</p>
          </div>
          {checked === true && (
            <div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Special Category Serial
              </p>
              <select
                placeholder="Special Category Value"
                {...register("special_category_serial", {
                  required: "Special Category Value is required",
                })}
                id="special_category_serial"
                type="number"
                defaultValue={categoryUpdateModalValue?.special_category_serial}
                className="block w-1/2 px-2.5 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              {errors.special_category_serial && (
                <p className="text-red-600">
                  {errors.special_category_serial?.message}
                </p>
              )}
            </div>
          )}
          {/*Special Category end */}

          <div className="flex justify-end mt-6 gap-4">
            <button
              type="button"
              onClick={() => setCategoryUpdateModal(false)}
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
                type="submit"
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

export default UpdateCategory;
