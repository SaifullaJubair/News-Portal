import { useForm } from "react-hook-form";
import { useState } from "react";

import Select from "react-select";
import { BASE_URL } from "../../../utils/baseURL";
import { toast } from "react-toastify";
import { FaMinus, FaPlus } from "react-icons/fa";

const AddJorip = ({ refetch, setIsJoripModalOpen, token }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [links, setLinks] = useState([{ online_jorip_question: "" }]);

  const handleDataPost = async (data) => {
    setLoading(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key == "online_jorip_image") {
        formData.append(key, data?.online_jorip_image[0]);
      } else formData.append(key, value);
    });

    links.forEach((link, index) => {
      Object.entries(link).forEach(([key, value]) => {
        formData.append(`online_jorip_all_question[${index}][${key}]`, value);
      });
    });

    try {
      const response = await fetch(`${BASE_URL}/online_jorip?role_type=online_jorip_create`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();
      if (result?.statusCode == 200 && result?.success == true) {
        toast.success(
          result?.message ? result?.message : "Online Jorip created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setIsJoripModalOpen(false);
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

  const handlePlus = () => {
    setLinks([...links, { online_jorip_question: ""}]);
  };

  const handleMinus = () => {
    if (links.length > 1) {
      setLinks(links.slice(0, -1));
    }
  };

  const handleLinkChange = (index, event) => {
    const updatedLinks = links.map((link, i) =>
      i === index ? { ...link, [event.target.name]: event.target.value } : link
    );
    setLinks(updatedLinks);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <form
          onSubmit={handleSubmit(handleDataPost)}
          className="bg-white rounded-lg p-4 space-y-4 w-[550px] max-h-[100vh] overflow-y-auto"
        >
          <h2 className="font-semibold text-[20px]">Add A Online Jorip:</h2>
            <div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover mt-2"
                />
              )}
              <input
                {...register("online_jorip_image", {
                  required: "Image is required",
                  validate: {
                    isImage: (value) =>
                      (value[0] && value[0].type.startsWith("image/")) ||
                      "Only image files are allowed",
                  },
                })}
                id="online_jorip_image"
                type="file"
                accept="image/*"
                className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
                onChange={handleImageChange}
              />
              {errors.online_jorip_image && (
                <p className="text-red-600">{errors.online_jorip_image?.message}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Online Jorip Status
              </p>

              <select
                {...register("online_jorip_status", {
                  required: "Online Jorip Status is required",
                })}
                id="online_jorip_status"
                className="block w-[200px] sm:w-[300px] md:w-[500px] p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              >
                <option value="active">Active</option>
                <option value="in-active">In-Active</option>
              </select>
              {errors.online_jorip_status && (
                <p className="text-red-600">{errors.online_jorip_status?.message}</p>
              )}
            </div>
            <div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Online Jorip Title
              </p>

              <input
                placeholder="Online Jorip Title"
                {...register("online_jorip_title", {
                  required: "Online Jorip Title is required",
                })}
                id="online_jorip_title"
                type="text"
                className="block w-[200px] sm:w-[300px] md:w-[500px] p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              />
              {errors.online_jorip_title && (
                <p className="text-red-600">{errors.online_jorip_title?.message}</p>
              )}
            </div>

            <div className="flex justify-between items-start gap-2">
            <p className="ml-1 font-semibold py-1 text-gray-700">
              Question Name
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
                required
                type="text"
                value={link?.online_jorip_question}
                onChange={(e) => handleLinkChange(index, e)}
                placeholder="Question Name"
                className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              />
            </div>
          ))}

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
              onClick={() => setIsJoripModalOpen(false)}
            >
              Cancel
            </button>
          </form>
        </div>
    </>
  );
};

export default AddJorip;
