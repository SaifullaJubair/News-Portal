"use client";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

const TopAd = () => {
  const pathname = usePathname();

  const { data: adsData = [], isLoading: adsLoading } = useQuery({
    queryKey: ["/api/v1/ads"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/ads`);
      const data = await res.json();
      return data;
    },
  });

  const ad24 = adsData?.data?.find((item) => item?.ads_serial == "24");
  const [adsShow, setAdsShow] = useState(false);
  const [animateAd, setAnimateAd] = useState(true);
  useEffect(() => {
    const isCancel = sessionStorage.getItem("showAd");
    if (!isCancel) {
      setAdsShow(true);
    }
  }, []);
  const handleAdCancel = () => {
    // Start the transition effect first
    setAnimateAd(false);
    setTimeout(() => {
      setAdsShow(false);
    }, 500); // Match this timeout to the CSS transition duration (0.5s)
    sessionStorage.setItem("showAd", "true");
  };

  return (
    <div>
      {pathname === "/" && !adsLoading && ad24 && adsShow && (
        <div
          className={`max-w-[1400px] w-[95%] mx-auto relative transition-all duration-500 ease-in-out overflow-hidden ${
            animateAd ? "max-h-[150px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <MdOutlineCancel
            className="absolute right-0 top-0 text-3xl font-bold text-red-500 cursor-pointer hover:scale-105 duration-200"
            onClick={handleAdCancel}
          />
          <a target="_blank" rel="noreferrer" href={`${ad24?.ads_link}`}>
            <img src={ad24?.ads_image} alt="" className="w-full" />
          </a>
        </div>
      )}
    </div>
  );
};

export default TopAd;
