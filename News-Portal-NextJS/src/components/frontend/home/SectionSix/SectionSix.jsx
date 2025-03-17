"use client";
import Link from "next/link";
import { BsArrowRightCircle } from "react-icons/bs";
const SectionSix = ({ newsData, adsData }) => {
  const categorySlug = newsData?.categoryDetails?.category_slug;
  if (!newsData?.news?.length > 0) return;
  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div className="flex items-center justify-between  py-2 border-b-4 border-gray-800 ">
        <Link
          href={`/${categorySlug}`}
          className="text-2xl font-semibold flex items-center gap-2 hover:text-pHoverTextColor duration-100"
        >
          <img
            src={newsData?.categoryDetails?.category_logo}
            alt=""
            className="w-6 h-6 sm:w-10 sm:h-8 rounded-sm"
          />
          <p className="text-lg sm:text-xl">
            {newsData?.categoryDetails?.category_name}
          </p>
        </Link>

        <Link
          href={`/${categorySlug}`}
          className="hover:text-pHoverTextColor duration-100"
        >
          {" "}
          <BsArrowRightCircle size={24} className="font-semibold" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <div className="col-span-2 md:col-span-3 lg:col-span-4">
          <div className=" grid grid-cols-1 sm:grid-cols-3 sm:divide-x-2 sm:gap-0 gap-3    mt-4 sm:my-6  ">
            {newsData?.news?.slice(0, 3).map((item) => (
              <Link
                href={`/${categorySlug}/${item?._id}`}
                className="cursor-pointer hover:opacity-90 px-1 sm:px-4 sm:mb-0 mb-2.5  space-y-2 rounded  group  sm:mx-0 mx-3 pb-2 sm:border-b-0 border-b"
                key={item?._id}
              >
                <img
                  src={item?.main_image}
                  className=" rounded   duration-200 w-full h-56 sm:h-48"
                  alt=""
                />
                <p
                  className=" font-semibold text-pTextColor  text-sm sm:text-base  group-hover:text-pHoverTextColor  "
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item?.heading}
                </p>
              </Link>
            ))}
          </div>
          <hr className="hidden sm:flex" />
          <div>
            <div className=" grid grid-cols-1 sm:grid-cols-3   sm:divide-x-2  lg:grid-cols-4 my-3 gap-4 sm:gap-0 ">
              {newsData?.news?.slice(3, 6).map((item) => (
                <Link
                  href={`/${categorySlug}/${item?._id}`}
                  className="cursor-pointer hover:opacity-90  group  mx-3 sm:mx-0 sm:px-3 pb-2 sm:border-b-0 border-b"
                  key={item?._id}
                >
                  <img
                    src={item?.main_image}
                    className=" rounded h-56 sm:h-36 w-full "
                    alt=""
                  />
                  <p
                    className=" font-semibold text-pTextColor  text-sm sm:text-base sm:mt-2 mt-3 group-hover:text-pHoverTextColor"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item?.heading}
                  </p>
                </Link>
              ))}
              <>
                {newsData?.news?.slice(6, 7).map((item) => (
                  <Link
                    href={`/${categorySlug}/${item?._id}`}
                    className="cursor-pointer hover:opacity-90 px-3  group hidden lg:block "
                    key={item?._id}
                  >
                    <img
                      src={item?.main_image}
                      className=" rounded h-28 sm:h-36 w-full "
                      alt=""
                    />
                    <p
                      className=" font-semibold text-pTextColor  text-sm sm:text-base mt-2 group-hover:text-pHoverTextColor"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item?.heading}
                    </p>
                  </Link>
                ))}
              </>
            </div>
            <hr className="hidden sm:flex " />
          </div>
        </div>
        {adsData && (
          <div className="hidden md:block h-full  pt-6 ">
            <a target="_blank" rel="noreferrer" href={`${adsData?.ads_link}`}>
              <img src={adsData?.ads_image} className="w-full h-full" alt="" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionSix;
