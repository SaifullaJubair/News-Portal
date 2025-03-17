"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/baseURL";
import { IoMdClose } from "react-icons/io"; // X icon for close button

const PopUpAd = () => {
  const { data: adsData = [], isLoading: adsLoading } = useQuery({
    queryKey: ["/api/v1/ads"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/ads`);
      const data = await res.json();
      return data;
    },
  });

  const ad25 = adsData?.data?.find((item) => item?.ads_serial == "25");

  // State for popup visibility
  const [isVisible, setIsVisible] = useState(false);

  // Show popup if not dismissed in the current session
  useEffect(() => {
    const isDismissed = sessionStorage.getItem("popupDismissed");
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle close button click
  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("popupDismissed", "true"); // Prevents popup from reappearing in the same session
  };

  return (
    <>
      {!adsLoading && isVisible && ad25 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="relative pb-4 rounded-lg shadow-lg  lg:w-[1000px] lg:h-[500px] md:w-[600px] md:h-[400px] h-[400px] w-11/12 motion-preset-pop">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 bg-white rounded-md shadow border hover:border-red-500 hover:bg-red-500 hover:text-white duration-200"
              onClick={handleClose}
            >
              <IoMdClose size={24} />
            </button>

            {/* Popup Content */}
            <a href={ad25?.ads_link} target="_blank" rel="noopener noreferrer">
              <img
                src={ad25?.ads_image}
                alt="Ad"
                className="w-[1000px] h-[500px]"
              />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpAd;
