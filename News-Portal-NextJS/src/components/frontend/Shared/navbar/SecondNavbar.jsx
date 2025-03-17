"use client";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SecondMenuNavbar from "./SecondMenuNavbar";
const SecondNavbar = ({
  categories,
  isLoading,
  banglaDateMonth,
  bdDate,
  formattedHijriDate,
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href) => {
    return pathname === href;
  };
  if (isLoading) return null;

  return (
    <div className=" bg-white shadow no-print">
      <div
        className="max-w-[1400px] w-[95%] mx-auto relative"
        onMouseLeave={() => setOpen(false)}
      >
        <div className="flex items-center justify-around  ">
          <ul>
            <li className="text-gray-800 font-semibold tracking-tighter lg:text-base text-sm md:text-base hidden sm:flex whitespace-nowrap">
              {banglaDateMonth}
            </li>
          </ul>
          <ul className="flex items-center text-nowrap gap-2 lg:gap-3 overflow-x-auto scrollbar-thin py-2.5">
            <li className="flex items-center">
              <Link
                href="/"
                className={`ml-2 lg:ml-6 lg:text-lg font-semibold text-gray-800 border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300 ${
                  isActive("/") ? "text-pHoverTextColor" : "text-gray-800 "
                }`}
              >
                <FaHome size={20} />
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                href="/all-news"
                className={`ml-2 lg:ml-6 text-sm md:text-base font-semibold pt-1 pr-1  border-b-2 border-transparent hover:border-PDeepColor hover:text-pHoverTextColor duration-300 ${
                  isActive("/all-news")
                    ? "text-pHoverTextColor"
                    : "text-gray-800 hover:border-PDeepColor "
                }`}
              >
                সর্বশেষ
              </Link>
            </li>
            {categories?.data?.map(
              (item) =>
                item?.show_title === "active" && (
                  <li key={item?._id}>
                    <Link
                      href={`/${item?.category_slug}`}
                      className={`ml-2 lg:ml-6 text-sm md:text-base font-semibold pr-1   border-b-2 border-transparent hover:text-pHoverTextColor duration-300 ${
                        isActive(`/${item?.category_slug}`)
                          ? "text-pHoverTextColor"
                          : "text-gray-800 hover:border-PDeepColor "
                      }`}
                    >
                      {item?.category_name}
                    </Link>
                  </li>
                )
            )}
          </ul>
          {/* hover menu */}
          <SecondMenuNavbar
            open={open}
            setOpen={setOpen}
            categories={categories}
            bdDate={bdDate}
            banglaDateMonth={banglaDateMonth}
            isActive={isActive}
            formattedHijriDate={formattedHijriDate}
          />
        </div>
      </div>
    </div>
  );
};

export default SecondNavbar;
