import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ImageUploader from "../news/ImageUploader";
import { BASE_URL } from "../../../utils/baseURL";
import { getCookie } from "../../../utils/cookie-storage";
import { authKey } from "../../../utils/storageKey";

const LogoVidio = ({ refetch, initialData, user }) => {
  const { register, reset, handleSubmit } = useForm(); //get data in form

  // get token
  const token = getCookie(authKey);

  const handleDataPost = async (data) => {
    toast.error("Please wait a moment", {
      autoClose: 1000,
    });
    let logo;
    let favicon;
    if (data?.logo?.[0]) {
      const logoUpload = await ImageUploader(data?.logo?.[0]);
      logo = logoUpload[0];
    }
    if (data?.favicon?.[0]) {
      const faviconUpload = await ImageUploader(data?.favicon?.[0]);
      favicon = faviconUpload[0];
    }
    const sendData = {
      logo: logo || initialData?.logo,
      favicon: favicon || initialData?.favicon,
      title: data?.title || initialData?.title,
      emergency_contact:
        data?.emergency_contact || initialData?.emergency_contact,
      _id: initialData?._id,
      email: data?.email || initialData?.email,
      advertisement: data?.advertisement || initialData?.advertisement,
    };
    try {
      const response = await fetch(
        `${BASE_URL}/siteSetting?role_type=site_setting_update`,
        {
          method: "PATCH",
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
          result?.message ? result?.message : "Setting created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
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
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleDataPost)}>
        <div className="grid gap-6 grid-cols-2">
          <div>
            <label className="font-semibold" htmlFor="logo">
              Logo<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              {...register("logo", {
                validate: (value) => {
                  if (value && value.length > 0) {
                    return (
                      value[0].type.startsWith("image/") ||
                      "Only image files are allowed"
                    );
                  }
                },
              })}
              id="logo"
              type="file"
              accept="image/*"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="favicon">
              Favicon<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              {...register("favicon", {
                validate: (value) => {
                  if (value && value.length > 0) {
                    return (
                      value[0].type.startsWith("image/") ||
                      "Only image files are allowed"
                    );
                  }
                },
              })}
              id="favicon"
              type="file"
              accept="image/*"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="title">
              Title<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.title}
              {...register("title")}
              id="title"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="emergency_contact">
              Contact No<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.emergency_contact}
              {...register("emergency_contact")}
              id="emergency_contact"
              type="number"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="email">
              E-Mail
              <span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.email}
              {...register("email")}
              id="email"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="advertisement">
              Advertisement
              <span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.advertisement}
              {...register("advertisement")}
              id="advertisement"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
        </div>
        { }
        {user?.role_id?.site_setting_update && (
          <div className="mt-2 flex items-center justify-end">
            <button
              type="submit"
              className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default LogoVidio;
