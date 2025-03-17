"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { getCookie } from "@/utils/cookie-storage";
import { authKey } from "@/utils/storageKey";
import { BASE_URL } from "@/utils/baseURL";
import MiniSpinner from "@/shared/loader/MiniSpinner";
import { districts } from "@/data/districts";
import { divisions } from "@/data/divisions";
import Select from "react-select";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import ImageUploader from "../news/ImageUploader";

const AddStaff = ({ refetch, setIsAddModalOpen, roleData, isLoading }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [districtsData, setDistrictsData] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [isOpenDistrict, setIsOpenDistrict] = useState(true);
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (districtId) {
      const districtData = districts.filter(
        (district) => district?.division_id === districtId
      );
      setDistrictsData(districtData);
    }
  }, [districtId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelImage = () => {
    setImagePreview(null); // Clear image preview
    // Clear input value (optional)
    const inputElement = document.getElementById("user_image");
    if (inputElement) {
      inputElement.value = null;
    }
  };

  // get token
  const token = getCookie(authKey);
  const handleDataPost = async (data) => {
    setLoading(true);
    let user_image;
    if (data?.user_image?.length > 0) {
      const imageUpload = await ImageUploader(data?.user_image[0]);
      if (imageUpload[2] == true) {
        user_image = imageUpload[0];
      } else {
        toast.error("Image upload failed", {
          autoClose: 1000,
        });
        setLoading(false);
        return;
      }
    }

    const sendData = {
      user_name: data?.user_name,
      user_designation: data?.user_designation,
      user_email: data?.user_email,
      user_phone: data?.user_phone,
      user_id: data?.user_id,
      user_password: data?.user_password,
      user_status: data?.user_status,
      role_id: data?.role_id,
      division,
      district,
      user_description: description,
      user_image: user_image,
      joining_date: data?.joining_date,
      reference_number: data?.reference_number,
      user_address: data?.user_address
    };
    try {
      const response = await fetch(
        `${BASE_URL}/userReg?role_type=staff_create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(sendData),
        }
      );
      const result = await response.json();
      if (result?.statusCode == 200 && result?.success == true) {
        toast.success(
          result?.message ? result?.message : "New Staff created successfully",
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

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[750px] p-6 max-h-[100vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <h3
              className="text-[26px] font-bold text-gray-800 capitalize"
              id="modal-title"
            >
              {" "}
              User Information
            </h3>
            <button className="btn bg-white hover:bg-white border p-1">
              <RxCross1
                onClick={() => setIsAddModalOpen(false)}
                size={25}
              ></RxCross1>
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
                id="user_name"
                type="text"
                className="block w-full px-2 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              />
              {errors.user_name && (
                <p className="text-red-600">{errors.user_name?.message}</p>
              )}
            </div>
            <div className="mt-4">
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                User Designation
              </p>
              <input
                placeholder=" User Designation"
                {...register("user_designation")}
                id="user_designation"
                type="text"
                className="block w-full px-2 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              />
              {errors.user_designation && (
                <p className="text-red-600">{errors.user_designation?.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                  id="user_phone"
                  type="text"
                  className="block w-full px-2 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
                {errors.user_phone && (
                  <p className="text-red-600">{errors.user_phone?.message}</p>
                )}
              </div>
              {/* Reference Number */}
              <div className="mt-4">
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  Reference Number
                </p>
                <input
                  placeholder=" Reference Number"
                  {...register("reference_number")}
                  id="reference_number"
                  type="text"
                  className="block w-full px-2 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
              </div>
              {/* User Email */}
              <div className="mt-4">
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  User Email
                </p>
                <input
                  placeholder=" User Email"
                  {...register("user_email")}
                  id="user_email"
                  type="email"
                  className="block w-full px-2 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
              </div>
              {/* Joining Date */}
              <div className="mt-4">
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  Joining Date
                </p>
                <input
                  placeholder=" Joining Date"
                  {...register("joining_date")}
                  id="joining_date"
                  type="date"
                  className="block w-full px-2 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* User Password */}
              <div className="mt-4">
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  User Password
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
                  <p className="text-red-600">
                    {errors.user_password?.message}
                  </p>
                )}
              </div>
              {/* User ID */}
              <div className="mt-4">
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  User ID
                </p>
                <input
                  placeholder=" User ID"
                  {...register("user_id")}
                  id="user_id"
                  type="number"
                  className="block w-full px-2 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
              </div>
            </div>

            {/* User Address */}
            <div className="my-4">
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  User Address
                </p>
                <textarea
                  placeholder=" User Address"
                  {...register("user_address")}
                  rows="4"
                  id="user_address"
                  type="text"
                  className="block w-full px-2 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
              </div>

            {/* Division & District */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="form-control w-full">
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  Division
                </p>
                <Select
                  id="division"
                  name="division"
                  aria-label="Select a division"
                  options={divisions}
                  getOptionLabel={(x) => x?.name}
                  getOptionValue={(x) => x?.id}
                  onChange={(selectedOption) => {
                    setIsOpenDistrict(false);
                    setDistrict();
                    setDistrictId(selectedOption?.id);
                    setDivision(selectedOption?.name);
                    setTimeout(() => {
                      setIsOpenDistrict(true);
                    }, 100);
                  }}
                ></Select>
              </div>
              {isOpenDistrict && (
                <div className="form-control w-full">
                  <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                    District
                  </p>
                  <Select
                    id="district"
                    name="district"
                    aria-label="Select a district"
                    options={districtsData}
                    getOptionLabel={(x) => x?.name}
                    getOptionValue={(x) => x?.id}
                    onChange={(selectedOption) => {
                      setDistrict(selectedOption?.name);
                    }}
                  ></Select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                >
                  <option value="active">Active</option>
                  <option value="in-active">In-Active</option>
                </select>
                {errors.user_status && (
                  <p className="text-red-600">{errors.user_status?.message}</p>
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
                  className=" w-full px-2 py-1.5  text-gray-700 bg-white border border-gray-200 rounded-xl"
                >
                  {isLoading ? (
                    <MiniSpinner />
                  ) : (
                    <>
                      {" "}
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
            </div>

            {/* User Description */}
            <div className="mt-4">
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                User Description
              </p>
              <ReactQuill
                className="mt-4"
                theme="snow"
                value={description}
                onChange={setDescription}
              />
            </div>

            {/* News Main image */}
            <div className="relative">
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Main Image
              </p>
              {imagePreview && (
                <>
                  <Image
                    width={300}
                    height={200}
                    src={imagePreview}
                    alt="Preview"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 px-2 hover:bg-red-600"
                    onClick={handleCancelImage}
                  >
                    X
                  </button>
                </>
              )}

              <input
                {...register("user_image", {
                  validate: {
                    isImage: (value) =>
                      !value.length || // Pass validation if no file is selected
                      (value[0] && value[0].type.startsWith("image/")) ||
                      "Only image or audio files are allowed",
                  },
                })}
                id="user_image"
                type="file"
                accept="image/*"
                className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
                onChange={handleImageChange}
              />
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
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
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStaff;
