/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { BiLogOut, BiSolidCategoryAlt } from "react-icons/bi";
import { RiAdvertisementLine } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { TbCategoryPlus } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { eraseCookie } from "../../utils/cookie-storage";
import { authKey } from "../../utils/storageKey";
import { FiSettings, FiUserCheck } from "react-icons/fi";
import { LuUsers2 } from "react-icons/lu";
import { ImNewspaper } from "react-icons/im";
import { AuthContext } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../utils/baseURL";
import BigSpinner from "../loader/BigSpinner";
import { FaQuestionCircle } from "react-icons/fa";
const SideNavBar = () => {
  const usePathname = useLocation();
  const pathName = usePathname?.pathname;
  const { user } = useContext(AuthContext);

  const { data: siteSetting = [], isLoading } = useQuery({
    queryKey: ["/api/v1/siteSetting"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/siteSetting`);
      const data = await res.json();
      return data;
    },
  }); // get all site setting

  const [isTasksOpen, setIsTasksOpen] = useState(
    pathName === "/admin/category" ||
    pathName === "/admin/sub-category" ||
    pathName === "/admin/today-news-category"
  );
  const [isStaffsOpen, setIsStaffsOpen] = useState(
    pathName === "/admin/all-staffs" || pathName === "/admin/staff-permission"
  );
  const handleLogOut = () => {
    eraseCookie(authKey);
    window.location.reload();
  };

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <div className="flex flex-col flex-shrink-0 antialiased text-white bg-primaryColor min-h-screen">
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <div className="flex flex-wrap items-center justify-center mt-1 border-b pb-3">
          <Link to="/">
            <img
              src={siteSetting?.data?.[0]?.logo}
              alt="logo"
              className="w-20 h-20"
            />
          </Link>
        </div>
        <ul className="flex flex-col pb-4 space-y-1 list-none">
          {user?.role_id?.dashboard_show && (
            <li>
              <Link
                to="/admin"
                className={
                  pathName == "/admin"
                    ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                    : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                }
              >
                <span className="ml-3">
                  <IoMdHome size={20} className="text-white" />
                </span>
                <span className=" tracking-wide truncate ml-2">Dashboard</span>
              </Link>
            </li>
          )}

          {/* Category section */}
          {(user?.role_id?.category_show ||
            user?.role_id?.sub_category_show ||
            user?.role_id?.today_news_category_show) && (
              <li>
                <details
                  open={isTasksOpen}
                  className="group [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between  px-4 py-2 text-white hover:bg-successColor ">
                    <span className=" font-medium"> Tasks </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>
                  <ul className="mt-2 space-y-1 list-none">
                    {user?.role_id?.category_show && (
                      <li>
                        <Link
                          to="/admin/category"
                          className={
                            pathName == "/admin/category"
                              ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                          }
                        >
                          <span className="inline-flex justify-center items-center ml-6">
                            <BiSolidCategoryAlt />
                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">
                            Category
                          </span>
                        </Link>
                      </li>
                    )}
                    {user?.role_id?.sub_category_show && (
                      <li>
                        <Link
                          to="/admin/sub-category"
                          className={
                            pathName == "/admin/sub-category"
                              ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                          }
                        >
                          <span className="inline-flex justify-center items-center ml-6">
                            <TbCategoryPlus />
                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">
                            Sub Category
                          </span>
                        </Link>
                      </li>
                    )}
                    {user?.role_id?.today_news_category_show && (
                      <li>
                        <Link
                          to="/admin/today-news-category"
                          className={
                            pathName == "/admin/today-news-category"
                              ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                          }
                        >
                          <span className="inline-flex justify-center items-center ml-6">
                            <TbCategoryPlus />
                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">
                            Today News Category
                          </span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </details>
              </li>
            )}
          {user?.role_id?.news_show && (
            <li>
              <Link
                to="/admin/news"
                className={
                  pathName == "/admin/news"
                    ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                    : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                }
              >
                <span className="ml-3">
                  <ImNewspaper size={20} className="text-white" />
                </span>
                <span className=" tracking-wide truncate ml-2">News</span>
              </Link>
            </li>
          )}
          {user?.role_id?.ads_show && (
            <li>
              <Link
                to="/admin/ads"
                className={
                  pathName == "/admin/ads"
                    ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                    : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                }
              >
                <span className="ml-3">
                  <RiAdvertisementLine size={20} className="text-white" />
                </span>
                <span className=" tracking-wide truncate ml-2">Ads</span>
              </Link>
            </li>
          )}
          {user?.role_id?.online_jorip_show && (
            <li>
              <Link
                to="/admin/jorip"
                className={
                  pathName == "/admin/jorip"
                    ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                    : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                }
              >
                <span className="ml-3">
                  <FaQuestionCircle size={20} className="text-white" />
                </span>
                <span className=" tracking-wide truncate ml-2">Online Jorip</span>
              </Link>
            </li>
          )}
          {/* Staff section */}
          {(user?.role_id?.staff_show ||
            user?.role_id?.staff_permission_show) && (
              <li>
                <details
                  open={isStaffsOpen}
                  className="group [&_summary::-webkit-details-marker]:hidden "
                >
                  <summary className="flex cursor-pointer items-center justify-between  px-4 py-2  text-white hover:bg-successColor ">
                    <span className="font-medium"> Staff </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>
                  <ul className="mt-2 space-y-1 list-none">
                    {user?.role_id?.staff_show && (
                      <li>
                        <Link
                          to="/admin/all-staff"
                          className={
                            pathName == "/admin/all-staff"
                              ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                          }
                        >
                          <span className="inline-flex justify-center items-center ml-6">
                            <LuUsers2 />
                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">
                            All Staff
                          </span>
                        </Link>
                      </li>
                    )}
                    {user?.role_id?.staff_permission_show && (
                      <li>
                        <Link
                          to="/admin/staff-permission"
                          className={
                            pathName == "/admin/staff-permission"
                              ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                          }
                        >
                          <span className="inline-flex justify-center items-center ml-6">
                            <FiUserCheck />
                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">
                            Staff Permission
                          </span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </details>
              </li>
            )}
          {/*  social media */}
          <li>
            <Link
              to="/admin/social-media"
              className={
                pathName == "/admin/social-media"
                  ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                  : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
              }
            >
              <span className="ml-3">
                <IoShareSocialOutline size={20} className="text-white" />
              </span>
              <span className=" tracking-wide truncate ml-2">Social Media</span>
            </Link>
          </li>
          {/* setting */}
          <li>
            <Link
              to="/admin/setting"
              className={
                pathName == "/admin/setting"
                  ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                  : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
              }
            >
              <span className="ml-3">
                <FiSettings size={20} className="text-white" />
              </span>
              <span className=" tracking-wide truncate ml-2">Site Setting</span>
            </Link>
          </li>

          <li>
            <button
              onClick={() => handleLogOut()}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6 w-full"
            >
              <span className="ml-3">
                <BiLogOut size={20} className="text-red-500" />
              </span>
              <span className=" tracking-wide truncate ml-1 text-red-500">
                Log Out
              </span>
            </button>
          </li>
        </ul>
      </div>
      {/* </div> */}
    </div>
  );
};
export default SideNavBar;
