import { FaHome } from "react-icons/fa";
import { IoMenuOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
const SecondNavbar = ({ categories, isLoading, banglaDateMonth, bdDate }) => {
  const [open, setOpen] = useState(false);
  if (isLoading) return null;

  return (
    <div className=" bg-white shadow no-print">
      <div
        className="max-w-[1400px] w-[95%] mx-auto relative"
        onMouseLeave={() => setOpen(false)}
      >
        <div className="flex items-center justify-around  ">
          <ul>
            <li className="text-gray-900 font-semibold tracking-tighter lg:text-sm text-sm hidden sm:flex">
              {banglaDateMonth}
            </li>
          </ul>
          <ul className="flex items-center text-nowrap gap-2 lg:gap-3 overflow-x-auto scrollbar-thin py-2.5">
            <li className="flex items-center">
              <NavLink
                to="/"
                className="ml-2 lg:ml-6 lg:text-[18px] font-extrabold text-gray-900 border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300"
              >
                <FaHome size={20} />
              </NavLink>
            </li>
            <li className="flex items-center">
              <NavLink
                to="/all-news"
                className="ml-2 lg:ml-6 text-sm font-extrabold pt-1 pr-1  text-gray-900 border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300"
              >
                সর্বশেষ
              </NavLink>
            </li>
            {categories?.data?.map(
              (item) =>
                item?.show_title === "active" && (
                  <li key={item?._id}>
                    <NavLink
                      to={item?.category_slug}
                      className="ml-2 lg:ml-6 text-sm font-extrabold pr-1  text-gray-900 border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300"
                    >
                      {item?.category_name}
                    </NavLink>
                  </li>
                )
            )}
          </ul>
          <div className="" onMouseEnter={() => setOpen(true)}>
            <IoMenuOutline className="text-lg hidden lg:flex" />
            {open && (
              <div className="w-full min-h-40 absolute top-0 left-0 bg-white border border-gray-200 rounded shadow-lg  cursor-pointer">
                <CgClose
                  className="absolute top-2 right-2 bg-slate-100 text-xl cursor-pointer hover:scale-105 duration-150 transition-all"
                  onClick={() => setOpen(!open)}
                />
                <div className="p-3">
                  <p className="font-semibold text-sm text-gray-900">
                    {banglaDateMonth} | {bdDate}
                  </p>
                  <hr className="m-2" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4">
                    {categories?.data.map((item) => (
                      <NavLink
                        key={item._id}
                        to={item.category_slug}
                        className="text-sm text-gray-900 hover:text-pHoverTextColor duration-300"
                      >
                        {item?.category_name}
                      </NavLink>
                    ))}
                  </div>
                </div>
                <hr className="m-2" />
                <div className="flex items-center justify-center gap-3 sm:gap-6 py-4 flex-wrap ">
                  <NavLink
                    to={"/all-news"}
                    className="text-sm font-semibold  text-gray-900 hover:text-pHoverTextColor duration-300"
                  >
                    সর্বশেষ
                  </NavLink>
                  {categories?.data
                    ?.filter((item) => item?.special_category)
                    .map((item) => (
                      <NavLink
                        key={item?._id}
                        to={item?.category_slug}
                        className="text-sm font-semibold  text-gray-900 hover:text-pHoverTextColor duration-300"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={item?.category_logo}
                            className="w-6 h-6 rounded"
                            alt=""
                          />
                          <p> {item?.category_name}</p>
                        </div>
                      </NavLink>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondNavbar;
