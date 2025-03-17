"use client";
import { BASE_URL } from "@/utils/baseURL";
import { getCookie } from "@/utils/cookie-storage";
import { authKey } from "@/utils/storageKey";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const StoreDetails = ({ refetch, initialData, user }) => {
  const {
    register,
    reset,
    handleSubmit,
    // formState: { errors },
  } = useForm(); //get data in form
  const token = getCookie(authKey);

  const handleDataPost = async (data) => {
    toast.error("Please wait a moment");
    const sendData = {
      facebook: data?.facebook || initialData?.facebook,
      instagram: data?.instagram || initialData?.instagram,
      you_tube: data?.you_tube || initialData?.you_tube,
      watsapp: data?.watsapp || initialData?.watsapp,
      linkedin: data?.linkedin || initialData?.linkedin,
      twitter: data?.twitter || initialData?.twitter,
      _id: initialData?._id,
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
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3">
          <div>
            <label className="font-semibold" htmlFor="linkedin">
              Linkedin<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.linkedin}
              {...register("linkedin")}
              id="linkedin"
              type="url"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="facebook">
              Facebook<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.facebook}
              {...register("facebook")}
              id="facebook"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="instagram">
              Instagram<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.instagram}
              {...register("instagram")}
              id="instagram"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="you_tube">
              You Tube<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.you_tube}
              {...register("you_tube")}
              id="you_tube"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="watsapp">
              Watsapp<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.watsapp}
              {...register("watsapp")}
              id="watsapp"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>

          <div>
            <label className="font-semibold" htmlFor="twitter">
              Twitter<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.twitter}
              {...register("twitter")}
              id="twitter"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
        </div>
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

export default StoreDetails;
