"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import Select from "react-select";
import { BASE_URL } from "@/utils/baseURL";
import MiniSpinner from "@/shared/loader/MiniSpinner";
import Image from "next/image";

const UpdateAds = ({
  refetch,
  setAdsUpdateModal,
  adsUpdateModalValue,
  token,
}) => {
  const adsSerial = [
    {
      ads_serial: 1,
      _id: 1,
    },
    {
      ads_serial: 2,
      _id: 2,
    },
    {
      ads_serial: 3,
      _id: 3,
    },
    {
      ads_serial: 4,
      _id: 4,
    },
    {
      ads_serial: 5,
      _id: 5,
    },
    {
      ads_serial: 6,
      _id: 6,
    },
    {
      ads_serial: 7,
      _id: 7,
    },
    {
      ads_serial: 8,
      _id: 8,
    },
    {
      ads_serial: 9,
      _id: 9,
    },
    {
      ads_serial: 10,
      _id: 10,
    },
    {
      ads_serial: 11,
      _id: 11,
    },
    {
      ads_serial: 12,
      _id: 12,
    },
    {
      ads_serial: 13,
      _id: 13,
    },
    {
      ads_serial: 14,
      _id: 14,
    },
    {
      ads_serial: 15,
      _id: 15,
    },
    {
      ads_serial: 16,
      _id: 16,
    },
    {
      ads_serial: 17,
      _id: 17,
    },
    {
      ads_serial: 18,
      _id: 18,
    },
    {
      ads_serial: 19,
      _id: 19,
    },
    {
      ads_serial: 20,
      _id: 20,
    },
    {
      ads_serial: 21,
      _id: 21,
    },
    {
      ads_serial: 22,
      _id: 22,
    },
    {
      ads_serial: 23,
      _id: 23,
    },
    {
      ads_serial: 24,
      _id: 24,
    },
    {
      ads_serial: 25,
      _id: 25,
    },
  ];

  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [serial, setSerial] = useState(adsUpdateModalValue?.ads_serial);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  // post a User details
  const handleDataPost = async (data) => {
    setLoading(true);
    if (data?.ads_image[0]) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "ads_image") {
          formData.append(key, data?.ads_image[0]);
        } else formData.append(key, value);
      });

      formData.append("ads_serial", serial);
      formData.append("image_key", adsUpdateModalValue?.image_key);
      formData.append("_id", adsUpdateModalValue?._id);
      // Uncomment and adjust this according to your actual API call logic
      try {
        const response = await fetch(`${BASE_URL}/ads?role_type=ads_update`, {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        const result = await response.json();
        if (result?.statusCode === 200 && result?.success === true) {
          toast.success(result?.message || "Category update successfully!", {
            autoClose: 1000,
          });
          refetch();
          reset();
          setAdsUpdateModal(false);
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
      const sendData = {
        _id: adsUpdateModalValue?._id,
        image_key: adsUpdateModalValue?.image_key,
        ads_image: adsUpdateModalValue?.ads_image,
        ads_serial: serial,
        ads_status: data?.ads_status,
        ads_link: data?.ads_link,
      };
      try {
        const response = await fetch(`${BASE_URL}/ads?role_type=ads_update`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // Specify content type for JSON request
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(sendData),
        });
        const result = await response.json();
        if (result?.statusCode === 200 && result?.success === true) {
          toast.success(result?.message || "Category update successfully!", {
            autoClose: 1000,
          });
          refetch();
          reset();
          setAdsUpdateModal(false);
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
            className="text-[26px] font-bold text-gray-800  capitalize "
            id="modal-title"
          >
            {" "}
            Update Ads
          </h3>
          <button
            type="button"
            className="btn bg-white hover:bg-white border p-1"
            onClick={() => setAdsUpdateModal(false)}
          >
            <RxCross1 size={25}></RxCross1>
          </button>
        </div>

        <hr className="mt-2 mb-4" />

        <form
          onSubmit={handleSubmit(handleDataPost)}
          className="bg-white p-4 space-y-4"
        >
          <div>
            {imagePreview && (
              <Image
                width={1000}
                height={200}
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover mt-2"
              />
            )}
            {!imagePreview && adsUpdateModalValue?.ads_image && (
              <Image
              width={1000}
                height={200}
                src={adsUpdateModalValue?.ads_image}
                alt="Preview"
                className="w-full h-64 object-cover mt-2"
              />
            )}
            <input
              {...register("ads_image", {
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
              id="ads_image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
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
              placeholder="Ads Serial"
              aria-label="Ads Serial"
              defaultValue={{
                _id: adsUpdateModalValue?._id,
                ads_serial: adsUpdateModalValue?.ads_serial,
              }}
              options={adsSerial}
              getOptionLabel={(x) => x?.ads_serial}
              getOptionValue={(x) => x?._id}
              onChange={(selectedOption) => setSerial(selectedOption?._id)}
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
              defaultValue={adsUpdateModalValue?.ads_link}
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
              defaultValue={adsUpdateModalValue?.ads_status}
              className="block w-[200px] sm:w-[300px] md:w-[500px] p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
            >
              <option value={adsUpdateModalValue?.ads_status} disabled>
                {adsUpdateModalValue?.ads_status}
              </option>
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
            onClick={() => setAdsUpdateModal(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAds;
