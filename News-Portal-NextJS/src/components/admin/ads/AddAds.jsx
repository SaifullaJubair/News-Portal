"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/baseURL";
import Image from "next/image";

const AddAds = ({ refetch, setIsAddModalOpen, token }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [serial, setSerial] = useState(0);

  // post a Ads
  // const handleDataPost = (data) => {
  //   setLoading(true);
  //   const adsImage = data?.ads_image[0];

  //   const sendData = {
  //     ads_title: data?.ads_title,
  //     ads_serial: serial,
  //     ads_status: data?.ads_status,
  //     ads_link: data?.ads_link,
  //     ads_image: adsImage,
  //   };
  // };

  const handleDataPost = async (data) => {
    setLoading(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key == "ads_image") {
        formData.append(key, data?.ads_image[0]);
      } else formData.append(key, value);
    });

    formData.append("ads_serial", serial);

    try {
      const response = await fetch(`${BASE_URL}/ads?role_type=ads_create`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();
      if (result?.statusCode == 200 && result?.success == true) {
        toast.success(
          result?.message ? result?.message : "Ads created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setIsAddModalOpen(false);
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        {/* Add A Sub Category Type */}
        <div className="bg-white rounded-lg p-4 ">
          <h2 className="font-semibold text-[20px]">Add A News Ads:</h2>
          <form
            onSubmit={handleSubmit(handleDataPost)}
            className="bg-white p-4 space-y-4"
          >
            <div>
              {imagePreview && (
                <div className=" relative w-full h-60">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover my-2 rounded "
                  />
                </div>
              )}
              <input
                {...register("ads_image", {
                  required: "Ads Image is required",
                  validate: {
                    isImage: (value) =>
                      (value[0] && value[0].type.startsWith("image/")) ||
                      "Only image files are allowed",
                  },
                })}
                id="ads_image"
                type="file"
                accept="image/*"
                className="block w-full p-2.5 mt-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
                onChange={handleImageChange}
              />
              {errors.ads_image && (
                <p className="text-red-600">{errors.ads_image?.message}</p>
              )}
            </div>

            {/* serial */}
            <div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Ads Serial
              </p>

              <Select
                id="ads_serial"
                name="ads_serial"
                required
                placeholder="Ads Serial"
                aria-label="Ads Serial"
                options={Array.from({ length: 25 }, (_, i) => ({
                  id: i + 1,
                  name: i + 1,
                }))}
                getOptionLabel={(x) => x?.name}
                getOptionValue={(x) => x?.id}
                onChange={(selectedOption) => setSerial(selectedOption?.id)}
              ></Select>
            </div>
            <div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Ads Link
              </p>

              <input
                placeholder="Ads Link"
                {...register("ads_link", {
                  required: "Ads Link is required",
                })}
                id="ads_link"
                type="url"
                className="block w-[200px] sm:w-[300px] md:w-[500px] p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              />
              {errors.ads_link && (
                <p className="text-red-600">{errors.ads_link?.message}</p>
              )}
            </div>
            {/* Status */}
            <div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Ads Status
              </p>

              <select
                {...register("ads_status", {
                  required: "Sub Category Status is required",
                })}
                id="ads_status"
                className="block w-[200px] sm:w-[300px] md:w-[500px] p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              >
                <option value="active">Active</option>
                <option value="in-active">In-Active</option>
              </select>
              {errors.ads_status && (
                <p className="text-red-600">{errors.ads_status?.message}</p>
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
              type="button"
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

export default AddAds;
