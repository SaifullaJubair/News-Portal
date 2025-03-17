import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { IoMenuOutline } from "react-icons/io5";

const SecondMenuNavbar = ({
  setOpen,
  banglaDateMonth,
  bdDate,
  categories,
  isActive,
  open,
  formattedHijriDate,
}) => {
  return (
    <div className="" onMouseEnter={() => setOpen(true)}>
      <IoMenuOutline className="text-xl hidden lg:flex" />
      {open && (
        <div className="w-full min-h-40 absolute top-0 left-0 bg-white border border-gray-200 rounded shadow-lg  cursor-pointer">
          <CgClose
            className="absolute top-2 right-2 bg-slate-100 text-xl cursor-pointer hover:scale-105 duration-150 transition-all"
            onClick={() => setOpen(!open)}
          />
          <div className="p-3">
            <p className="font-semibold text-sm sm:text-base lg:text-lg text-pTextColor ">
              {banglaDateMonth} | {bdDate} | {formattedHijriDate}
            </p>
            <hr className="m-2" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4">
              {categories?.data.map((item) => (
                <Link
                  key={item._id}
                  href={`/${item?.category_slug}`}
                  className={`text-sm sm:text-base lg:text-lg font-semibold  hover:text-pHoverTextColor duration-300
                      ${
                        isActive(`/${item?.category_slug}`)
                          ? "text-pHoverTextColor"
                          : "text-pTextColor "
                      }`}
                >
                  {item?.category_name}
                </Link>
              ))}
            </div>
          </div>
          <hr className="m-2" />
          <div className="flex items-center justify-center gap-3 sm:gap-6 py-4 flex-wrap ">
            <Link
              href={"/all-news"}
              className={`text-sm sm:text-base lg:text-lg font-semibold  hover:text-pHoverTextColor duration-300
                      ${
                        isActive("/all-news")
                          ? "text-pHoverTextColor"
                          : "text-pTextColor "
                      }`}
            >
              সর্বশেষ
            </Link>
            {categories?.data
              ?.filter((item) => item?.special_category)
              .map((item) => (
                <Link
                  key={item?._id}
                  href={`/${item?.category_slug}`}
                  className={`text-sm sm:text-base lg:text-lg font-semibold   hover:text-pHoverTextColor duration-300 ${
                    isActive(`/${item?.category_slug}`)
                      ? "text-pHoverTextColor"
                      : "text-pTextColor "
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={item?.category_logo}
                      className="w-6 h-6 rounded"
                      alt=""
                    />
                    <p> {item?.category_name}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecondMenuNavbar;
