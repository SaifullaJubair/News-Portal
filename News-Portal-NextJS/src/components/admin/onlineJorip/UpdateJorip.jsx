"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BASE_URL } from "@/utils/baseURL";
import MiniSpinner from "@/shared/loader/MiniSpinner";
import Image from "next/image";

const UpdateJorip = ({
  refetch,
  setJoripUpdateModal,
  joripUpdateModalValue,
  token,
}) => {

  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [metaImagePreview, setMetaImagePreview] = useState(null);
  const [links, setLinks] = useState([{ online_jorip_question: "" }]);

  const [oldPageLink, setOldPageLink] = useState(
    joripUpdateModalValue?.online_jorip_all_question
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePlus = () => {
    setLinks([...links, { online_jorip_question: "" }]);
  };

  const handleMinus = () => {
    // if (links.length > 1) {
    setLinks(links.slice(0, -1));
    // }
  };

  const handleLinkChange = (index, event) => {
    const updatedLinks = links.map((link, i) =>
      i === index ? { ...link, [event.target.name]: event.target.value } : link
    );
    setLinks(updatedLinks);
  };

  const handleDeleteOldPageLink = (data) => {
    setOldPageLink(oldPageLink?.filter((item) => item._id !== data._id));
  };

  // post a User details
  const handleDataPost = async (data) => {
    setLoading(true);
    if (data?.online_jorip_image[0]) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "online_jorip_image") {
          formData.append(key, data?.online_jorip_image[0]);
        }
        else formData.append(key, value);
      });

      const combinedPageLink = oldPageLink.concat(links || []);
      if (combinedPageLink?.length < 1) {
        toast.error("Please add atleast one link", {
          autoClose: 1000,
        });
        setLoading(false);
        return;
      }

      combinedPageLink.forEach((link, index) => {
        Object.entries(link).forEach(([key, value]) => {
          formData.append(`media_page_link[${index}][${key}]`, value);
        });
      });

      formData.append("image_key", joripUpdateModalValue?.image_key);
      formData.append("_id", joripUpdateModalValue?._id);
      // Uncomment and adjust this according to your actual API call logic
      try {
        const response = await fetch(`${BASE_URL}/online_jorip?role_type=online_jorip_update`, {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        const result = await response.json();
        if (result?.statusCode === 200 && result?.success === true) {
          toast.success(result?.message || "Jorip update successfully!", {
            autoClose: 1000,
          });
          refetch();
          reset();
          setJoripUpdateModal(false);
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
      const combinedPageLink = oldPageLink.concat(links || []);
      if (combinedPageLink?.length < 1) {
        toast.error("Please add atleast one link", {
          autoClose: 1000,
        });
        setLoading(false);
        return;
      }
      const sendData = {
        _id: joripUpdateModalValue?._id,
        image_key: joripUpdateModalValue?.image_key,
        online_jorip_image: joripUpdateModalValue?.online_jorip_image,
        online_jorip_status: data?.online_jorip_status,
        online_jorip_title: data?.online_jorip_title,
        online_jorip_all_question: combinedPageLink?.map((item) => ({
          online_jorip_question: item?.online_jorip_question
        })),
      };
      try {
        const response = await fetch(`${BASE_URL}/online_jorip?role_type=online_jorip_update`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // Specify content type for JSON request
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(sendData),
        });
        const result = await response.json();
        if (result?.statusCode === 200 && result?.success === true) {
          toast.success(result?.message || "Jorip update successfully!", {
            autoClose: 1000,
          });
          refetch();
          reset();
          setJoripUpdateModal(false);
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
            Update Jorip
          </h3>
          <button
            type="button"
            className="btn bg-white hover:bg-white border p-1"
            onClick={() => setJoripUpdateModal(false)}
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
            {!imagePreview && joripUpdateModalValue?.online_jorip_image && (
              <Image
              width={1000}
                  height={200}
                src={joripUpdateModalValue?.online_jorip_image}
                alt="Preview"
                className="w-full h-64 object-cover mt-2"
              />
            )}
            <input
              {...register("online_jorip_image", {
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
              id="online_jorip_image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.online_jorip_image && (
              <p className="text-red-600">{errors.online_jorip_image?.message}</p>
            )}
          </div>
          {/* Status */}
          <div>
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Jorip Status
            </p>

            <select
              {...register("online_jorip_status", {
                required: "Sub Category Status is required",
              })}
              id="online_jorip_status"
              defaultValue={joripUpdateModalValue?.online_jorip_status}
              className="block w-[200px] sm:w-[300px] md:w-[500px] p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
            >
              <option value={joripUpdateModalValue?.online_jorip_status} disabled>
                {joripUpdateModalValue?.online_jorip_status}
              </option>
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
            {errors.online_jorip_status && (
              <p className="text-red-600">{errors.online_jorip_status?.message}</p>
            )}
          </div>

          <div>
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Ads Jorip Title
            </p>

            <input
              placeholder="Ads Jorip Title"
              {...register("online_jorip_title", {
                required: "Ads Jorip Title is required",
              })}
              id="online_jorip_title"
              type="text"
              defaultValue={joripUpdateModalValue?.online_jorip_title}
              className="block w-[200px] sm:w-[300px] md:w-[500px] p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.online_jorip_title && (
              <p className="text-red-600">{errors.online_jorip_title?.message}</p>
            )}
          </div>



          {oldPageLink && (
            <>
              <p className="ml-1 font-semibold py-1 text-gray-700">
                Media Page Link:{" "}
              </p>
              <table className="min-w-full divide-y-2 divide-gray-200 text-sm border border-gray-300 mt-4 rounded-xl">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                      Title
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                      Click
                    </th>
                    <th className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {oldPageLink?.map((link) => (
                    <tr key={link?._id}>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold">
                        {link?.online_jorip_question}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold">
                        {link?.online_jorip_question_click || 0}
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                        <MdDeleteForever
                          onClick={() => handleDeleteOldPageLink(link)}
                          className="cursor-pointer text-red-500 hover:text-red-300"
                          size={25}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          <div className="flex justify-between items-start gap-2">
            <p className="ml-1 font-semibold py-1 text-gray-700">
              Add Jorip Question
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlus}
                type="button"
                className="bg-[#3EA2FA] text-white px-4 py-2 rounded-xl"
              >
                <FaPlus />
              </button>
              <button
                onClick={handleMinus}
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                <FaMinus />
              </button>
            </div>
          </div>

          {links.map((link, index) => (
            <div key={index} className="flex flex-col gap-2">
              <input
                name="online_jorip_question"
                type="text"
                required
                value={link?.online_jorip_question}
                onChange={(e) => handleLinkChange(index, e)}
                placeholder="Link Title"
                className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              />
            </div>
          ))}



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
            onClick={() => setJoripUpdateModal(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateJorip;
