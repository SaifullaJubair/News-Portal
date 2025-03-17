import { FaAngleRight } from "react-icons/fa6";
import { BsArrowRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import SectionOneSkeleton from "../../../../shared/loader/FrontendLoader/SectionOneSkeleton";
import { FaRegClock } from "react-icons/fa";
import { getTime } from "../../../common/GetTime";

const SectionOne = ({ newsData, adsData, newsLoading }) => {
  if (newsLoading) return <SectionOneSkeleton />;
  if (!newsData?.news?.length > 0) return;

  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div className="flex items-center justify-between">
        <Link
          to={`/${newsData?.categoryDetails?.category_slug}`}
          className="text-2xl font-semibold flex items-center gap-2 hover:text-pHoverTextColor duration-100"
        >
          <img
            src={newsData?.categoryDetails?.category_logo}
            alt=""
            className="w-6 h-6 sm:w-10 sm:h-8 rounded-sm"
          />
          <p>{newsData?.categoryDetails?.category_name}</p>
        </Link>

        <Link
          to={`/${newsData?.categoryDetails?.category_slug}`}
          className="hover:text-pHoverTextColor duration-100"
        >
          <BsArrowRightCircle size={24} className="font-semibold" />
        </Link>
      </div>

      <div className="bg-gray-800 h-1 w-full mt-2"></div>

      {/* News */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-2 pt-6 tracking-wide">
        <div className="px-2 border-r-0 sm:border-r group mt-2">
          <Link
            to={`/${newsData?.categoryDetails?.category_slug}/${
              newsData?.news?.slice(0, 1)[0]?._id
            }`}
            className="cursor-pointer hover:opacity-90 "
          >
            <img
              src={newsData?.news?.slice(0, 1)[0]?.main_image}
              alt=""
              className="rounded-lg md:h-44 w-full"
            />

            <div className="py-2">
              <p className="font-semibold mb-2 text-pHeadingTextColor text-lg group-hover:text-pHoverTextColor duration-150 line-clamp-2">
                {newsData?.news?.slice(0, 1)[0]?.heading}
              </p>
              <p
                className="text-sm text-gray-600 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: newsData?.news?.slice(0, 1)[0]?.description,
                }}
              ></p>
              <p className="text-xs flex gap-2 items-center text-gray-700 my-1">
                <FaRegClock />
                {getTime(newsData?.news?.slice(0, 1)[0]?.createdAt)}
              </p>
            </div>
          </Link>
          <hr className="mb-2" />
          <Link
            to={`/${newsData?.categoryDetails?.category_slug}/${
              newsData?.news?.slice(1, 2)[0]?._id
            }`}
            className="cursor-pointer hover:opacity-90 md:flex gap-2 hidden   "
          >
            <img
              src={newsData?.news?.slice(1, 2)[0]?.main_image}
              alt=""
              className="w-24 h-16 rounded"
            />
            <div>
              <p className="text-pHeadingTextColor text-[14px] group-hover:text-pHoverTextColor duration-150 line-clamp-2">
                {newsData?.news?.slice(1, 2)[0]?.heading}
              </p>
              <p className="  text-xs flex gap-2 items-center text-gray-700 my-1">
                <FaRegClock />
                {getTime(newsData?.news?.slice(1, 2)[0]?.createdAt)}
              </p>
            </div>
          </Link>
        </div>

        {/* 2nd section */}
        <div className="flex flex-col gap-3 px-2 border-r-0 sm:border-r h-full divide-y">
          {newsData?.news?.slice(2, 6).map((item, index) => (
            <Link
              to={`/${newsData?.categoryDetails?.category_slug}/${item?._id}`}
              className="flex h-[25%]   items-center gap-1.5 cursor-pointer group"
              key={index}
            >
              <div className="w-[30%]">
                <img
                  src={item?.main_image}
                  className=" w-full h-auto md:h-[70px] xl:h-[76px] rounded-lg"
                  alt=""
                />
              </div>
              <div className="w-[65%]">
                <p
                  className="text-pHeadingTextColor text-[16px] md:text-[14px] xl:text-base group-hover:text-pHoverTextColor"
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

        {/* 3rd section */}
        <div className="md:flex-col md:gap-1 mt-2 gap-6 border-r-0 pr-2 sm:border-r divide-y hidden md:flex">
          {newsData?.news?.slice(6, 10)?.map((item, index) => (
            <Link
              to={`/${newsData?.categoryDetails?.category_slug}/${item?._id}`}
              className="h-full pt-2 group cursor-pointer"
              key={index}
              style={{ flexGrow: 1 }}
            >
              <div className="flex items-center gap-1">
                <div className="w-[5%]">
                  <FaAngleRight
                    size={20}
                    className="font-light  group-hover:text-pHoverTextColor"
                  />
                </div>
                <div className=" w-[95%]">
                  <p className="text-pHeadingTextColor  pl-1.5 group-hover:text-pHoverTextColor hover:text-pHoverTextColor line-clamp-2">
                    {item?.heading}
                  </p>
                  <div
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                    className="line-clamp-1 text-pTextDetailsColor text-sm"
                  ></div>
                </div>
              </div>
              <p className=" text-xs flex gap-2 items-center text-gray-700 my-1">
                <FaRegClock className="ml-2" />
                {getTime(newsData?.news?.slice(0, 1)[0]?.createdAt)}
              </p>
            </Link>
          ))}
        </div>

        {/* 4th section for ad */}
        <div className="hidden lg:block">
          {adsData && (
            <a target="_blank" rel="noreferrer" href={`${adsData?.ads_link}`}>
              <img src={adsData?.ads_image} className="w-full h-full" alt="" />
            </a>
          )}
        </div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
        <div className="border-b col-span-3 mt-4"></div>
      </div>
    </div>
  );
};

export default SectionOne;
