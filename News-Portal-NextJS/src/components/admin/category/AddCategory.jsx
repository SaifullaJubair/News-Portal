"use client";
import MiniSpinner from "@/shared/loader/MiniSpinner";
import { BASE_URL } from "@/utils/baseURL";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddCategory = ({ refetch, setIsAddModalOpen, token }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChecked = () => {
    setChecked(!checked);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Format the slug whenever it changes
  const formatSlug = (value) => {
    return value.toLowerCase().trim().replace(/\s+/g, "-");
  };

  // Handle Add Category
  const handleDataPost = async (data) => {
    setLoading(true);

    // Format slug before submission
    const formattedSlug = formatSlug(data.category_slug);
    setValue("category_slug", formattedSlug);

    const formData = new FormData();

    if (
      data?.special_category === true &&
      data?.special_category_serial === ""
    ) {
      toast.error("Special category value is required");
      setLoading(false);
      return;
    }

    if (data?.special_category !== true && data?.special_category_serial) {
      delete data?.special_category_serial;
    }

    Object.entries(data).forEach(([key, value]) => {
      if (key === "category_logo") {
        formData.append(key, data?.category_logo[0]);
      } else {
        formData.append(key, value);
      }
    });

    if (data?.special_category !== true) {
      formData.delete("special_category_serial");
    }

    try {
      const response = await fetch(
        `${BASE_URL}/category?role_type=category_create`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : "Category created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setIsAddModalOpen(false);
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
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <form
          onSubmit={handleSubmit(handleDataPost)}
          className="bg-white rounded-lg p-4 space-y-4 w-[550px] max-h-[100vh] overflow-y-auto"
        >
          <h1 className="text-lg font-semibold my-4 text-gray-700">
            Add Category
          </h1>

          {/* Category Name */}
          <div>
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Category Name
            </p>
            <input
              placeholder="Category Name"
              {...register("category_name", {
                required: "Category Name is required",
              })}
              id="category_name"
              type="text"
              className="block w-full  p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.category_name && (
              <p className="text-red-600">{errors.category_name?.message}</p>
            )}
          </div>

          {/* English Slug */}
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

          {/* Category image */}
          <div>
            {imagePreview && (
              <Image
              width={200}
                  height={200}
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover my-2 rounded "
              />
            )}
            <input
              {...register("category_logo", {
                required: "Logo is required",
                validate: {
                  isImage: (value) =>
                    (value[0] && value[0].type.startsWith("image/")) ||
                    "Only image files are allowed",
                },
              })}
              id="category_logo"
              type="file"
              accept="image/*"
              className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              onChange={handleImageChange}
            />
            {errors.category_logo && (
              <p className="text-red-600">{errors.category_logo?.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category Serial */}
            <div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Category Serial
              </p>

              <input
                placeholder="Category Serial"
                {...register("category_serial", {
                  required: "Category Serial is required",
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

            {/* Category Status */}
            <div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Category Status
              </p>

              <select
                {...register("category_status", {
                  required: "Category Status is required",
                })}
                id="category_status"
                className="block w-full p-2.5   text-gray-700 bg-white border border-gray-200 rounded-xl"
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

          {/* Special Category start */}
          <div className="flex items-center gap-2 ml-1">
            <input
              {...register("special_category")}
              id="special_category"
              type="checkbox"
              className="w-4 h-4"
              onChange={handleChecked}
            />
            <p>Special Category</p>
          </div>
          {checked === true && (
            <div>
              <select
                placeholder="Special Category Value"
                {...register("special_category_serial", {
                  required: "Special Category Value is required",
                })}
                id="special_category_serial"
                type="number"
                className="block w-1/2 p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
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
          {/* Special Category end */}
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
    </>
  );
};

export default AddCategory;
