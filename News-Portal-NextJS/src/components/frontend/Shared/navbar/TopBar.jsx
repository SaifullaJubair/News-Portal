"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaRegFileArchive } from "react-icons/fa";
import { IoMenuOutline, IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineChangeCircle, MdOutlineSearch } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import { TiNews } from "react-icons/ti";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { SettingContext } from "@/provider/SettingProvider";
import { usePathname, useRouter } from "next/navigation";
import { FiUser } from "react-icons/fi";

const TopBar = ({
  categories,
  isLoading,
  banglaDateMonth,
  bdDate,
  formattedHijriDate,
}) => {
  const [search, setSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, settingData } = useContext(SettingContext);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef(null);

  const isActive = (href) => {
    return pathname === href ? "text-pHoverTextColor" : "text-gray-900";
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      router.push(`/`);
    } else {
      router.push(`/all-news?searchTerm=${searchTerm}`);
    }
    setSearch(false);
    setOpen(false);
  };
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearch(false); // Close the search bar when clicked outside
    }
  };
  // Use effect to add/remove the click event listener
  useEffect(() => {
    if (search) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup
    };
  }, [search]);
  return (
    <div className="border-b border-gray-300 mt-2 py-2 ">
      <div className="max-w-[1400px] w-[95%] mx-auto ">
        <div className="flex justify-between items-center">
          {/* Start Logo */}
          {loading ? (
            <div>
              <Skeleton className="h-12 sm:h-16 sm:w-52 md:w-60 w-32" />
            </div>
          ) : (
            <Link href={"/"}>
              <img
                src={settingData?.logo}
                alt="logo"
                className="xl:w-80 lg:w-60 w-32 sm:w-52 md:w-60"
              />
            </Link>
          )}

          {/* Content */}
          <ul
            className={`lg:py-0 text-nowrap md:py-0 sm:py-6 py-6 md:pb-0 absolute md:static md:bg-white bg-gray-5 w-full md:w-auto md:pl-0 md:mt-0 mt-8 sm:mt-12 lg:flex hidden no-print`}
          >
            {/* <li className="md:mt-0 lg:mt-0">
              <Link
                href="/today-news"
                className={`md:ml-4 xl:ml-6 flex lg:gap-2 gap-1 items-center text-gray-800 md:text-[13px] lg:text-lg font-semibold md:my-0 my-5 border-b-2 border-transparent duration-300 ${isActive(
                  "/today-news"
                )}`}
              >
                <HiOutlineNewspaper />
                <span className="tiro">আজকের পত্রিকা</span>
              </Link>
            </li> */}
            <li className="md:mt-0 lg:mt-0">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://epaper.dailyourbangladesh.com"
                className={`md:ml-4 xl:ml-6 flex lg:gap-2 gap-1 items-center text-gray-800 md:text-[13px] lg:text-lg font-semibold md:my-0 my-5  border-b-2 border-transparent duration-300 ${isActive(
                  "/e-paper"
                )}`}
              >
                <TiNews />
                <span>ই-পেপার</span>
              </a>
            </li>
            <li className="md:mt-0 lg:mt-0">
              <Link
                href="/archive"
                className={`md:ml-4 xl:ml-6 flex lg:gap-2 gap-1 items-center text-gray-800 md:text-[13px] lg:text-lg font-semibold md:my-0 my-5  border-b-2 border-transparent duration-300 ${isActive(
                  "/archive"
                )}`}
              >
                <FaRegFileArchive />
                <span>আর্কাইভ</span>
              </Link>
            </li>
            <li className="md:mt-0 lg:mt-0">
              <Link
                href="/social-media"
                className={`md:ml-4 xl:ml-6 flex lg:gap-2 gap-1 items-center text-gray-800 md:text-[13px] lg:text-lg font-semibold md:my-0 my-5  border-b-2 border-transparent duration-300 ${isActive(
                  "/social-media"
                )}`}
              >
                <IoShareSocialOutline />
                <span>সোশ্যাল মিডিয়া</span>
              </Link>
            </li>
            <li className="md:mt-0 lg:mt-0 mr-2">
              <Link
                href="/bangla_converter"
                className={`md:ml-4 xl:ml-6 flex lg:gap-2 gap-1 items-center text-gray-800 md:text-[13px] lg:text-lg font-semibold md:my-0 my-5  border-b-2 border-transparent duration-300 ${isActive(
                  "/bangla_converter"
                )}`}
              >
                <MdOutlineChangeCircle />
                <span>বাংলা কনভার্টার</span>
              </Link>
            </li>
            <li className="md:mt-0 lg:mt-0 mr-2">
              <a
                href="https://old.dailyourbangladesh.com"
                className={`md:ml-4 xl:ml-6 flex lg:gap-2 gap-1 items-center text-gray-800 text-xl md:text-[13px] lg:text-lg font-semibold md:my-0 my-5  border-b-2 border-transparent duration-300 ${isActive(
                  "/bangla_converter"
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <BiNews />
                <span>পুরাতন পত্রিকা</span>
              </a>
            </li>
          </ul>

          <div className="flex gap-2 sm:gap-4 items-center no-print">
            <a
              href="https://old.dailyourbangladesh.com"
              target="_blank"
              rel="noreferrer"
              className="lg:hidden flex gap-1 items-center my-4  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300 text-gray-800 font-semibold  md:text-base"
            >
              <TiNews className="text-xl hidden sm:flex" />
              <span className="text-sm sm:text-base">পুরাতন পত্রিকা</span>
            </a>
            <a
              href="https://epaper.dailyourbangladesh.com"
              target="_blank"
              rel="noreferrer"
              className="lg:hidden flex gap-1 items-center my-4  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300 font-semibold text-gray-800 md:text-base"
            >
              <TiNews className="text-xl hidden sm:flex" />
              <span className="text-sm sm:text-base">ই-পেপার</span>
            </a>
            <Link
              href="/reporter"
              className="sm:flex hidden gap-1 items-center my-4  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300 font-semibold text-gray-800 md:text-base"
            >
              <FiUser className="text-xl hidden sm:flex" />
              <span className="text-sm sm:text-base">রিপোর্টার</span>
            </Link>
            {/* Search and Menu */}
            <div className="items-center gap-6 sm:flex hidden">
              <div className="flex items-center relative" ref={searchRef}>
                <div
                  className={`bg-gray-100 lg:text-3xl lg:h-8 lg:w-8 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 hover:scale-110 duration-200`}
                >
                  <MdOutlineSearch onClick={() => setSearch(!search)} />
                </div>
                {search && (
                  <form onSubmit={handleSubmit}>
                    <div className="absolute right-10 -top-1 transform transition-transform duration-300 ease-in-out">
                      <div className="relative">
                        <input
                          onChange={(e) => setSearchTerm(e.target.value)}
                          value={searchTerm}
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

            <div className="z-50 lg:hidden flex  ">
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
              {/* Sidebar */}
              <div
                className={` z-50  overflow-y-auto scrollbar-thin w-full sm:w-[320px] h-screen fixed top-0 left-0 border-r bg-white border border-gray-200 rounded shadow-lg cursor-pointer transform transition-transform duration-300 ease-in-out ${
                  open ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <CgClose
                  className="absolute top-2 right-1 bg-slate-100 text-xl cursor-pointer hover:scale-105 duration-150 transition-all"
                  onClick={handleOpen}
                />
                <div className="p-4 pt-6  ">
                  <p className="font-bold text-sm text-gray-800">
                    <span className="whitespace-nowrap">
                      {" "}
                      {banglaDateMonth}{" "}
                    </span>
                    | <span className="whitespace-nowrap">{bdDate}</span> |{" "}
                    <span className="whitespace-nowrap">
                      {formattedHijriDate}
                    </span>
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
                      categories?.data?.map((item) => (
                        <Link
                          key={item._id}
                          href={`/${item.category_slug}`}
                          className={`text-sm  hover:text-pHoverTextColor duration-300 ${isActive(
                            `/${item.category_slug}`
                          )}`}
                          onClick={handleOpen}
                        >
                          {item?.category_name}
                        </Link>
                      ))}
                  </div>
                </div>
                <hr className="m-2" />
                <div className="grid grid-cols-2 gap-4 px-4 pb-3 pt-1 ">
                  <Link
                    href={"/all-news"}
                    className={`text-sm font-semibold  hover:text-pHoverTextColor duration-300 ${isActive(
                      "/all-news"
                    )}`}
                    onClick={handleOpen}
                  >
                    সর্বশেষ
                  </Link>
                  {!isLoading &&
                    categories?.data
                      ?.filter((item) => item?.special_category)
                      .map((item) => (
                        <Link
                          key={item?._id}
                          href={`/${item?.category_slug}`}
                          className={`text-sm font-semibold  hover:text-pHoverTextColor duration-300 ${isActive(
                            `/${item?.category_slug}`
                          )}`}
                          onClick={handleOpen}
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={item?.category_logo}
                              className="w-6 h-6 rounded"
                              alt=""
                            />
                            <p>{item?.category_name}</p>
                          </div>
                        </Link>
                      ))}
                </div>
                <div className="border-t mx-4">
                  <ul className="">
                    {/* <li>
                      <Link
                        href="/today-news"
                        className={`flex gap-1 items-center my-4  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300 text-gray-800 ${isActive(
                          "/today-news"
                        )}`}
                        onClick={handleOpen}
                      >
                        <HiOutlineNewspaper />
                        <span>আজকের পত্রিকা</span>
                      </Link>
                    </li> */}
                    <li>
                      <a
                        href="https://old.dailyourbangladesh.com"
                        target="_blank"
                        rel="noreferrer"
                        className={`flex gap-1 items-center my-4  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300 text-gray-800 ${isActive(
                          "/old-news"
                        )}`}
                        onClick={handleOpen}
                      >
                        <TiNews />
                        <span>পুরাতন পত্রিকা</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://epaper.dailyourbangladesh.com"
                        target="_blank"
                        rel="noreferrer"
                        className={`flex gap-1 items-center my-4  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300 text-gray-800 ${isActive(
                          "/e-paper"
                        )}`}
                        onClick={handleOpen}
                      >
                        <TiNews />
                        <span>ই-পেপার</span>
                      </a>
                    </li>
                    <li>
                      <Link
                        href="/archive"
                        className={`flex gap-1 items-center my-4  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300 text-gray-800 ${isActive(
                          "/archive"
                        )}`}
                        onClick={handleOpen}
                      >
                        <FaRegFileArchive />
                        <span>আর্কাইভ</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/social-media"
                        className={`flex gap-1 items-center my-4  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300 text-gray-800 ${isActive(
                          "/social-media"
                        )}`}
                        onClick={handleOpen}
                      >
                        <IoShareSocialOutline />
                        <span>সোশ্যাল মিডিয়া</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/bangla_converter"
                        className={`flex gap-1 items-center my-4  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300 text-gray-800 ${isActive(
                          "/bangla_converter"
                        )}`}
                        onClick={handleOpen}
                      >
                        <MdOutlineChangeCircle />
                        <span>বাংলা কনভার্টার</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/reporter"
                        className={`flex gap-1 items-center my-4  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300 text-gray-800 ${isActive(
                          "/reporter"
                        )}`}
                        onClick={handleOpen}
                      >
                        <FiUser />
                        <span>রিপোর্টার</span>
                      </Link>
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
