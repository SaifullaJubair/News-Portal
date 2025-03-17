"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaMinus, FaPlus } from "react-icons/fa";
import { getCookie } from "@/utils/cookie-storage";
import { authKey } from "@/utils/storageKey";
import { BASE_URL } from "@/utils/baseURL";
import MiniSpinner from "@/shared/loader/MiniSpinner";
import Image from "next/image";

const AddSocialMedia = ({ refetch, setIsAddModalOpen }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [links, setLinks] = useState([{ link_title: "", link_url: "" }]);
  const token = getCookie(authKey);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleDataPost = async (data) => {
    setLoading(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "media_image") {
        formData.append(key, data.media_image[0]);
      } else {
        formData.append(key, value);
      }
    });

    links.forEach((link, index) => {
      Object.entries(link).forEach(([key, value]) => {
        formData.append(`media_page_link[${index}][${key}]`, value);
      });
    });
    // formData.append("media_page_link", JSON.stringify(links));

    try {
      const response = await fetch(
        `${BASE_URL}/social_media?role_type=social_media_create`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const result = await response.json();
      if (result?.statusCode == 200 && result?.success == true) {
        toast.success(
          result?.message
            ? result?.message
            : "Social Media created successfully",
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

  const handlePlus = () => {
    setLinks([...links, { link_title: "", link_url: "" }]);
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
          <h1 className="text-lg font-semibold my-4 text-gray-700">
            Add Social Media
          </h1>
          {/* Social Name */}
          <div>
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Social Media Name
            </p>

            <input
              placeholder="Social Media Name"
              {...register("media_name", {
                required: "Social Media Name is required",
              })}
              id="media_name"
              type="text"
              className="block w-full  p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.media_name && (
              <p className="text-red-600">{errors.media_name?.message}</p>
            )}
          </div>
          {/* Category image */}
          <div>
            {imagePreview && (
              <Image
              width={1000}
              height={200}
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover my-2 rounded "
              />
            )}
            <input
              {...register("media_image", {
                required: "Media image is required",
                validate: {
                  isImage: (value) =>
                    (value[0] && value[0].type.startsWith("image/")) ||
                    "Only image files are allowed",
                },
              })}
              id="media_image"
              type="file"
              accept="image/*"
              className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              onChange={handleImageChange}
            />
            {errors.media_image && (
              <p className="text-red-600">{errors.media_image?.message}</p>
            )}
          </div>
          <hr />
          <div className="flex justify-between items-start gap-2">
            <p className="ml-1 font-semibold py-1 text-gray-700">
              Media Page Link
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
                name="link_title"
                required
                type="text"
                value={link?.link_title}
                onChange={(e) => handleLinkChange(index, e)}
                placeholder="Link Title"
                className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              />
              <input
                name="link_url"
                required
                value={link.link_url}
                type="url"
                onChange={(e) => handleLinkChange(index, e)}
                placeholder="Link URL"
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
            type="button"
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

export default AddSocialMedia;
