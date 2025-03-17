"use client";
import { useContext, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { LuUsers2 } from "react-icons/lu";
import { ImNewspaper } from "react-icons/im";
import { TbCategoryPlus } from "react-icons/tb";
import { FaQuestionCircle } from "react-icons/fa";
import { RiAdvertisementLine } from "react-icons/ri";
import { IoShareSocialOutline } from "react-icons/io5";
import { FiSettings, FiUserCheck, FiChevronDown } from "react-icons/fi";
import { BiLogOut, BiSolidCategoryAlt } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/baseURL";
import Link from "next/link";
import { authKey } from "@/utils/storageKey";
import { eraseCookie } from "@/utils/cookie-storage";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/context/context";

const SideNavBar = () => {
  const pathName = usePathname();
  const { user, loading } = useContext(AuthContext);

  const { data: siteSetting = [], isLoading } = useQuery({
    queryKey: ["/api/v1/siteSetting"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/siteSetting`);
      const data = await res.json();
      return data;
    },
  });

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStaffOpen, setIsStaffOpen] = useState(false);

  const handleLogOut = () => {
    eraseCookie(authKey);
    window.location.reload();
  };

  const isActive = (route) =>
    pathName === route
      ? "bg-successColor border-secondary2"
      : "border-transparent";

  if (isLoading || loading) {
    return <BigSpinner />;
  }

  return (
    <div className="flex flex-col text-white  bg-primaryColor min-h-screen">
      <div className="overflow-y-auto flex-grow">
        <div className="flex items-center justify-center mt-1 border-b pb-3">
          <Link href="/">
            <img
              src={siteSetting?.data?.[0]?.logo}
              alt="logo"
              className="w-20 h-16"
            />
          </Link>
        </div>

        <ul className="flex flex-col space-y-1  list-none  ">
          {user?.role_id?.dashboard_show && (
            <li>
              <Link
                href="/admin"
                className={`flex items-center  h-11 pr-6 pl-4  hover:bg-successColor hover:border-secondary2 border-r-4 ${isActive(
                  "/admin"
                )}`}
              >
                <IoMdHome size={20} className="text-white" />
                <span> Dashboard</span>
              </Link>
            </li>
          )}

          {/* Category Section */}
          {(user?.role_id?.category_show ||
            user?.role_id?.sub_category_show ||
            user?.role_id?.today_news_category_show) && (
            <>
              <li>
                <button
                  className="flex items-center justify-between w-full px-4 py-2 text-white focus:outline-none hover:bg-successColor"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  <span>Tasks</span>
                  {/* React Icon: Chevron */}
                  <FiChevronDown
                    size={20}
                    className={`transform transition-transform ${
                      isCategoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </li>
              {isCategoryOpen && (
                <>
                  {user?.role_id?.category_show && (
                    <li>
                      <Link
                        href="/admin/category"
                        className={`pl-10 flex items-center h-11 pr-6 hover:bg-successColor border-r-4 ${isActive(
                          "/admin/category"
                        )}`}
                      >
                        <BiSolidCategoryAlt />
                        <span className="ml-2">Category</span>
                      </Link>
                    </li>
                  )}
                  {user?.role_id?.sub_category_show && (
                    <li>
                      <Link
                        href="/admin/sub-category"
                        className={`pl-10 flex items-center h-11 pr-6 hover:bg-successColor border-r-4 ${isActive(
                          "/admin/sub-category"
                        )}`}
                      >
                        <TbCategoryPlus />
                        <span className="ml-2">Sub Category</span>
                      </Link>
                    </li>
                  )}
                  {user?.role_id?.today_news_category_show && (
                    <li>
                      <Link
                        href="/admin/today-news-category"
                        className={`pl-10 flex items-center h-11 pr-6 hover:bg-successColor border-r-4 ${isActive(
                          "/admin/today-news-category"
                        )}`}
                      >
                        <TbCategoryPlus />
                        <span className="ml-2">Today News Category</span>
                      </Link>
                    </li>
                  )}
                </>
              )}
            </>
          )}

          {/* News Section */}
          {user?.role_id?.news_show && (
            <li>
              <Link
                href="/admin/news"
                className={`flex items-center h-11 pr-6 pl-4 hover:bg-successColor border-r-4 ${isActive(
                  "/admin/news"
                )}`}
              >
                <ImNewspaper size={20} />
                <span className="ml-2">News</span>
              </Link>
            </li>
          )}

          {/* Ads Section */}
          {user?.role_id?.ads_show && (
            <li>
              <Link
                href="/admin/ads"
                className={`flex items-center h-11 pr-6 pl-4 hover:bg-successColor border-r-4 ${isActive(
                  "/admin/ads"
                )}`}
              >
                <RiAdvertisementLine size={20} />
                <span className="ml-2">Ads</span>
              </Link>
            </li>
          )}

          {/* Jorip Section */}
          {user?.role_id?.online_jorip_show && (
            <li>
              <Link
                href="/admin/jorip"
                className={`flex items-center h-11 pr-6 pl-4 hover:bg-successColor border-r-4 ${isActive(
                  "/admin/jorip"
                )}`}
              >
                <FaQuestionCircle size={20} />
                <span className="ml-2">Online Jorip</span>
              </Link>
            </li>
          )}

          {/* Staff Section */}
          {(user?.role_id?.staff_show ||
            user?.role_id?.staff_permission_show) && (
            <>
              <li>
                <button
                  className="flex items-center justify-between w-full px-4 py-2 text-white focus:outline-none hover:bg-successColor"
                  onClick={() => setIsStaffOpen(!isStaffOpen)}
                >
                  <span>Staff</span>
                  <FiChevronDown
                    size={20}
                    className={`transform transition-transform ${
                      isStaffOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </li>
              {isStaffOpen && (
                <>
                  {user?.role_id?.staff_show && (
                    <li>
                      <Link
                        href="/admin/all-staff"
                        className={`pl-10 flex items-center h-11 pr-6 hover:bg-successColor border-r-4 ${isActive(
                          "/admin/all-staff"
                        )}`}
                      >
                        <LuUsers2 />
                        <span className="ml-2">All Staff</span>
                      </Link>
                    </li>
                  )}
                  {user?.role_id?.staff_permission_show && (
                    <li>
                      <Link
                        href="/admin/staff-permission"
                        className={`pl-10 flex items-center h-11 pr-6 hover:bg-successColor border-r-4 ${isActive(
                          "/admin/staff-permission"
                        )}`}
                      >
                        <FiUserCheck />
                        <span className="ml-2">Staff Permission</span>
                      </Link>
                    </li>
                  )}
                </>
              )}
            </>
          )}

          {/* Social Links Section */}
          <li>
            <Link
              href="/admin/social-media"
              className={`flex items-center h-11 pr-6 pl-4 hover:bg-successColor border-r-4 ${isActive(
                "/admin/social-media"
              )}`}
            >
              <IoShareSocialOutline size={20} />
              <span className="ml-2">Social Links</span>
            </Link>
          </li>

          {/* Settings Section */}
          <li>
            <Link
              href="/admin/setting"
              className={`flex items-center h-11 pr-6 pl-4 hover:bg-successColor border-r-4 ${isActive(
                "/admin/setting"
              )}`}
            >
              <FiSettings size={20} />
              <span className="ml-2">Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Section */}
      <div className="py-4 px-2 border-t border-gray-700">
        <button
          onClick={handleLogOut}
          className="flex items-center w-full text-left bg-red-400 text-white hover:bg-red-500 px-4 py-2 rounded-md"
        >
          <BiLogOut size={20} />
          <span className="ml-2">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SideNavBar;
