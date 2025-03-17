import { Outlet, useLocation } from "react-router-dom";
import BreakingNews from "../components/frontend/home/BreakingNews/BreakingNews";
import Footer from "../components/frontend/Shared/footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../utils/baseURL.js";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import Navbar from "../components/frontend/Shared/navbar/Navbar.jsx";

const MainLayout = () => {
  const usePathname = useLocation();
  const pathname = usePathname?.pathname;
  const { data: adsData = [], isLoading: adsLoading } = useQuery({
    queryKey: ["/api/v1/ads"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/ads`);
      const data = await res.json();
      return data;
    },
  });

  const ad23 = adsData?.data?.find((item) => item?.ads_serial == "23");
  const [adsShow, setAdsShow] = useState(true);
  const [animateAd, setAnimateAd] = useState(true);

  const handleAdCancel = () => {
    // Start the transition effect first
    setAnimateAd(false);

    // After the transition, fully hide the ad
    setTimeout(() => {
      setAdsShow(false);
    }, 500); // Match this timeout to the CSS transition duration (0.5s)
  };

  return (
    <div>
      {pathname === "/" && !adsLoading && ad23 && adsShow && (
        <div
          className={`max-w-[1400px] w-[95%] mx-auto relative transition-all duration-500 ease-in-out overflow-hidden ${
            animateAd ? "max-h-[150px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <MdOutlineCancel
            className="absolute right-0 top-0 text-3xl font-bold text-red-500 cursor-pointer hover:scale-105 duration-200"
            onClick={handleAdCancel}
          />
          <a target="_blank" rel="noreferrer" href={`${ad23?.ads_link}`}>
            <img src={ad23?.ads_image} alt="" className="w-full" />
          </a>
        </div>
      )}

      <Navbar />

      <BreakingNews />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <footer className="no-print">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
