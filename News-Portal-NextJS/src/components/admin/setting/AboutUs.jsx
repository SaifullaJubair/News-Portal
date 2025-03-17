"use client";
import { BASE_URL } from "@/utils/baseURL";
import { getCookie } from "@/utils/cookie-storage";
import { authKey } from "@/utils/storageKey";
import { useState } from "react";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const AboutUs = ({ initialData, refetch, user }) => {
  const [aboutUs, setAboutUs] = useState(initialData?.about_us);
  const [terms_condition, setterms_condition] = useState(
    initialData?.terms_condition
  );
  const [privacy_policy, setprivacy_policy] = useState(
    initialData?.privacy_policy
  );
  const [address, setAddress] = useState(initialData?.address);
  const token = getCookie(authKey);
  // about us post
  const handleDataPost = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      about_us: aboutUs,
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

  // terms_condition post
  const handleDataPost6 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      terms_condition: terms_condition,
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

  // privacy_policy post
  const handleDataPost7 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      privacy_policy: privacy_policy,
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

  // address post
  const handleDataPost2 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      address: address,
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
      {/* About us */}
      <ReactQuill theme="snow" value={aboutUs} onChange={setAboutUs} />
      {user?.role_id?.site_setting_update && (
        <div className="mt-2 flex items-center justify-end">
          <button
            onClick={() => handleDataPost()}
            type="submit"
            className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
          >
            Submit
          </button>
        </div>
      )}

      {/* address Info */}
      <h4 className="font-semibold text-[20px] mt-2">Address</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      {user?.role_id?.site_setting_update && (
        <div className="mt-2 flex items-center justify-end">
          <button
            onClick={() => handleDataPost2()}
            type="submit"
            className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
          >
            Submit
          </button>
        </div>
      )}

      {/* privacy_policy Info */}
      <h4 className="font-semibold text-[20px] mt-2">Privacy And Policy</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={privacy_policy}
        onChange={setprivacy_policy}
      />
      {user?.role_id?.site_setting_update && (
        <div className="mt-2 flex items-center justify-end">
          <button
            onClick={() => handleDataPost7()}
            type="submit"
            className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
          >
            Submit
          </button>
        </div>
      )}

      {/* terms_condition Info */}
      <h4 className="font-semibold text-[20px] mt-2">Terms And Condition</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={terms_condition}
        onChange={setterms_condition}
      />
      {user?.role_id?.site_setting_update && (
        <div className="mt-2 flex items-center justify-end">
          <button
            onClick={() => handleDataPost6()}
            type="submit"
            className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
          >
            Submit
          </button>
        </div>
      )}

      {/* <Test /> */}
    </>
  );
};

export default AboutUs;
