"use client";
import { getTime } from "@/components/common/GetTime";
import Link from "next/link";
import { BsArrowRightCircle } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";

const SectionTen = ({ newsData, adsData }) => {
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
      <div className="grid grid-cols-2  md:grid-cols-9 gap-2 py-6  ">
        {/* 1st */}

        <div className="flex flex-row md:flex-col justify-between gap-3 md:gap-1 col-span-2  px-2 tracking-wider md:divide-y">
          {newsData?.news?.slice(0, 2)?.map((item, index) => (
            <Link
              href={`/${categorySlug}/${item?._id}`}
              className=" cursor-pointer group hover:opacity-90 pt-3 md:w-full w-1/2"
              key={index}
            >
              <img
                src={item?.main_image}
                className="w-full h-[150px] sm:h-[220px] md:h-[150px] lg:h-[170px] xl:h-[180px]  rounded-lg"
                alt=""
              />
              <div className="my-3">
                <p
                  className="font-semibold  text-pTextColor  text-sm  md:text-base  group-hover:text-pHoverTextColor hover:text-pHoverTextColor"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item?.heading}
                </p>
                <p className="text-xs flex gap-2 items-center text-gray-700 my-1">
                  <FaRegClock />
                  {getTime(item?.createdAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {/*  2nd */}
        <div className="cursor-pointer  hover:opacity-90 col-span-2 md:col-span-3 px-2 md:border-x mt-3 md:flex flex-col  group ">
          <Link href={`/${categorySlug}/${newsData?.news[2]?._id}`}>
            <div className="">
              <img
                src={newsData?.news[2]?.main_image}
                alt=""
                className="rounded-lg h-[260px] sm:h-[350px] md:h-[260px] xl:h-[300px] w-full"
              />
            </div>
            <div className="p-2  ">
              <p className="font-bold mb-2 text-gray-900 my-1.5 text-lg lg:text-[22px]  group-hover:text-pHoverTextColor hover:text-pHoverTextColor line-clamp-2 sm:line-clamp-3">
                {newsData?.news[2]?.heading}
              </p>
              <p
                className="text-pTextDetailsColor line-clamp-6 text-xs sm:text-sm"
                dangerouslySetInnerHTML={{
                  __html: newsData?.news[2]?.description,
                }}
              ></p>
              <p className="text-xs flex gap-2 items-center text-gray-600 my-2">
                <FaRegClock />
                {getTime(newsData?.news[2]?.createdAt)}
              </p>
            </div>
          </Link>
        </div>
        {/* 3rd */}
        <div className="flex flex-row md:flex-col justify-between gap-3 md:gap-1 col-span-2  px-2 tracking-wider md:divide-y">
          {newsData?.news?.slice(3, 5)?.map((item, index) => (
            <Link
              href={`/${categorySlug}/${item?._id}`}
              className=" cursor-pointer group hover:opacity-90 pt-3  md:w-full w-1/2"
              key={index}
            >
              <img
                src={item?.main_image}
                className="w-full h-[150px] sm:h-[220px] md:h-[150px] lg:h-[170px] xl:h-[180px]  rounded-lg"
                alt=""
              />
              <div className="my-3">
                <p
                  className="font-semibold  text-pTextColor  text-sm  md:text-base  group-hover:text-pHoverTextColor hover:text-pHoverTextColor"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item?.heading}
                </p>
                <p className="text-xs flex gap-2 items-center text-gray-700 my-1">
                  <FaRegClock />
                  {getTime(item?.createdAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {/* 4th */}
        <div className="border-l mt-3 flex flex-col  gap-1  md:col-span-2 px-2 tracking-wider ">
          {adsData && (
            <div className="hidden md:block  w-full h-full">
              <a target="_blank" rel="noreferrer" href={`${adsData?.ads_link}`}>
                <img
                  src={adsData?.ads_image}
                  className="w-full h-full"
                  alt=""
                />
              </a>
            </div>
          )}
        </div>
        <hr className="col-span-2 md:col-span-7 mt-2 " />
      </div>
    </div>
  );
};

export default SectionTen;
