import { useContext, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaRegFileArchive } from "react-icons/fa";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { IoMenuOutline, IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineChangeCircle, MdOutlineSearch } from "react-icons/md";
import { TiNews } from "react-icons/ti";
import Skeleton from "react-loading-skeleton";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SettingContext } from "../../../../context/SettingProvider";

const TopBar = ({ categories, isLoading, banglaDateMonth, bdDate }) => {
  const [search, setSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState(false);
  const { loading, settingData } = useContext(SettingContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/all-news?searchTerm=${searchTerm}`);
    setSearchTerm("");
  };
  return (
    <div className="border-b border-gray-300 mt-2 py-2 ">
      <div className="max-w-[1400px] w-[95%] mx-auto ">
        <div className="flex justify-between items-center">
          {/* Start Logo */}
          {loading ? (
            <div>
              <Skeleton className="h-12 sm:h-16 sm:w-40 w-32" />
            </div>
          ) : (
            <Link to={"/"}>
              <img
                src={settingData?.logo}
                alt="logo"
                className="xl:w-full lg:w-52 w-40 sm:w-full"
              />
            </Link>
          )}

          {/* Content */}
          <ul
            className={`  lg:py-0 text-nowrap md:py-0 sm:py-6 py-6 md:pb-0 absolute md:static md:bg-white bg-gray-5 w-full md:w-auto md:pl-0  md:mt-0 mt-8 sm:mt-12 lg:flex hidden no-print `}
          >
            <li className="md:mt-0 lg:mt-0">
              <NavLink
                to="/today-news"
                className="md:ml-4 xl:ml-6 flex lg:gap-2 gap-1 items-center md:text-[13px] lg:text-[18px] font-bold md:my-0 my-5 text-gray-900 border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300"
              >
                <HiOutlineNewspaper />
                <span className="tiro">আজকের পত্রিকা</span>
              </NavLink>
            </li>
            <li className="md:mt-0 lg:mt-0">
              <NavLink
                to="/e-paper"
                className="md:ml-4 xl:ml-6 flex lg:gap-2 gap-1 items-center md:text-[13px] lg:text-[18px] font-bold md:my-0 my-5 text-gray-900 border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300"
              >
                <TiNews />
                <span>ই-পেপার</span>
              </NavLink>
            </li>
            <li className="md:mt-0 lg:mt-0">
              <NavLink
                to="/archive"
                className="md:ml-4 xl:ml-6 flex lg:gap-2 gap-1 items-center md:text-[13px] lg:text-[18px] font-bold md:my-0 my-5 text-gray-900 border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300"
              >
                <FaRegFileArchive />
                <span>আর্কাইভ</span>
              </NavLink>
            </li>
            <li className="md:mt-0 lg:mt-0">
              <NavLink
                to="/social-media"
                className="md:ml-4 xl:ml-6 flex lg:gap-2 gap-1 items-center md:text-[13px] lg:text-[18px] font-bold md:my-0 my-5 text-gray-900 border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300"
              >
                <IoShareSocialOutline />
                <span>সোশ্যাল মিডিয়া</span>
              </NavLink>
            </li>
            <li className="md:mt-0 lg:mt-0 mr-2">
              <NavLink
                to="/bangla_converter"
                className="md:ml-4 xl:ml-6 flex lg:gap-2 gap-1 items-center md:text-[13px] lg:text-[18px] font-bold md:my-0 my-5 text-gray-900 border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300"
              >
                <MdOutlineChangeCircle />
                <span>বাংলা কনভার্টার</span>
              </NavLink>
            </li>
          </ul>

          <div className="flex gap-2 items-center no-print">
            <NavLink
              to="/e-paper"
              className="lg:hidden flex gap-1 items-center my-4  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300 font-semibold text-gray-800 md:text-base"
            >
              <TiNews className="text-xl" />
              <span className="">ই-পেপার</span>
            </NavLink>
            {/* Search and Menu */}
            <div className="items-center gap-6 sm:flex hidden">
              <div className="flex items-center relative">
                <div
                  className={`bg-gray-100 lg:text-3xl lg:h-8 lg:w-8 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 hover:scale-110 duration-200`}
                >
                  <MdOutlineSearch onClick={() => setSearch(!search)} />
                </div>
                {search && (
                  <form onSubmit={handleSubmit}>
                    <div className="absolute right-10 -top-1 transform transition-transform duration-300 ease-in-out ">
                      <div className="relative">
                        <input
                          onChange={(e) => setSearchTerm(e.target.value)}
                          type="text"
                          placeholder="Search..."
                          className="border border-gray-300 rounded-full py-2 px-10 w-[240px] sm:w-[300px] transition-all duration-300 ease-in-out"
                        />
                        <button type="submit">
                          <MdOutlineSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar Menu */}
            <div className="z-50 lg:hidden flex ">
              <IoMenuOutline
                className=" sm:text-3xl text-2xl  "
                onClick={handleOpen}
              />
              {open && (
                <div
                  className="fixed inset-0 bg-black opacity-30 z-30"
                  onClick={handleOpen} // Clicking the overlay should also close the sidebar
                ></div>
              )}

              <div
                className={` z-50  overflow-y-scroll scrollbar-thin w-full sm:w-[320px] min-h-screen fixed top-0 left-0 border-r bg-white border border-gray-200 rounded shadow-lg cursor-pointer transform transition-transform duration-300 ease-in-out ${
                  open ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <CgClose
                  className="absolute top-2 right-1 bg-slate-100 text-xl cursor-pointer hover:scale-105 duration-150 transition-all"
                  onClick={handleOpen}
                />
                <div className="p-4 pt-6  ">
                  <p className="font-semibold text-sm text-gray-900">
                    {banglaDateMonth} | {bdDate}
                  </p>
                  <hr className="my-2" />
                  {/* Search field for sidebar */}
                  <form onSubmit={handleSubmit} className="relative">
                    <label htmlFor="Search" className="sr-only">
                      {" "}
                      Search{" "}
                    </label>

                    <input
                      onChange={(e) => setSearchTerm(e.target.value)}
                      type="text"
                      placeholder="Search news..."
                      className="w-full rounded-md border-gray-200 py-2 px-2 shadow-sm text-sm border"
                    />

                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                      <button
                        type="submit"
                        className="text-gray-600 hover:text-gray-700"
                      >
                        <span className="sr-only">Search</span>

                        <MdOutlineSearch />
                      </button>
                    </span>
                  </form>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {!isLoading &&
                      categories?.data.map((item) => (
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
                <div className="grid grid-cols-2 gap-4 px-4 pb-3 pt-1 ">
                  <NavLink
                    to={"/all-news"}
                    className="text-sm font-semibold text-gray-900 hover:text-pHoverTextColor duration-300"
                  >
                    সর্বশেষ
                  </NavLink>
                  {!isLoading &&
                    categories?.data
                      ?.filter((item) => item?.special_category)
                      .map((item) => (
                        <NavLink
                          key={item?._id}
                          to={item?.category_slug}
                          className="text-sm font-semibold text-gray-900 hover:text-pHoverTextColor duration-300"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={item?.category_logo}
                              className="w-6 h-6 rounded"
                              alt=""
                            />
                            <p>{item?.category_name}</p>
                          </div>
                        </NavLink>
                      ))}
                </div>
                <div className="border-t mx-4">
                  <ul className="">
                    <li>
                      <NavLink
                        to="/today-news"
                        className="flex gap-1 items-center my-4  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300"
                      >
                        <HiOutlineNewspaper />
                        <span>আজকের পত্রিকা</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/e-paper"
                        className="flex gap-1 items-center my-4  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300"
                      >
                        <TiNews />
                        <span>ই-পেপার</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/archive"
                        className="flex gap-1 items-center my-4  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300"
                      >
                        <FaRegFileArchive />
                        <span>আর্কাইভ</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/social-media"
                        className="flex gap-1 items-center my-4  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300"
                      >
                        <IoShareSocialOutline />
                        <span>সোশ্যাল মিডিয়া</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/bangla_converter"
                        className="flex gap-1 items-center my-4  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300"
                      >
                        <MdOutlineChangeCircle />
                        <span>বাংলা কনভার্টার</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
