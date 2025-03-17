import { BsArrowRightCircle } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getTime } from "../../../common/GetTime";

const SectionFive = ({ newsData }) => {
  const categorySlug = newsData?.categoryDetails?.category_slug;
  if (!newsData?.news?.length > 0) return;
  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div className="flex items-center justify-between  py-2 border-b-4 border-gray-800 ">
        <Link
          to={`/${categorySlug}`}
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
          to={`/${categorySlug}`}
          className="hover:text-pHoverTextColor duration-100"
        >
          {" "}
          <BsArrowRightCircle size={24} className="font-semibold" />
        </Link>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-9 gap-2 pt-6 pb-3 ">
        {/* 1st */}

        <div className="flex md:flex-col justify-between gap-4 md:gap-1 md:col-span-2  px-2 tracking-wider divide-y md:border-r border-b md:border-b-0 ">
          {newsData?.news?.slice(0, 2)?.map((item, index) => (
            <Link
              to={`/${categorySlug}/${item?._id}`}
              className=" cursor-pointer spacey-y-2 group hover:opacity-90 w-1/2 sm:w-full md:border-b "
              key={index}
            >
              <img
                src={item?.main_image}
                className="w-full h-36 sm:h-44 md:h-36 rounded-lg"
                alt=""
              />
              <div className="my-3">
                <p
                  className="font-semibold  text-pTextColor  text-sm  md:text-base group-hover:text-pHoverTextColor hover:text-pHoverTextColor"
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
        <div className="cursor-pointer  hover:opacity-90 col-span-1 md:col-span-3 px-2 md:flex items-center justify-between gap-2 group  ">
          <Link to={`/${categorySlug}/${newsData?.news[2]?._id}`}>
            <div className="">
              <img
                src={newsData?.news[2]?.main_image}
                alt=""
                className="rounded-lg h-[240px] sm:h-[320px] md:h-[240px] w-full"
              />
            </div>
            <div className="p-2  ">
              <p className="font-bold mb-2 text-gray-900 my-1.5 text-[16px] lg:text-[20px]  group-hover:text-pHoverTextColor hover:text-pHoverTextColor line-clamp-2 sm:line-clamp-3">
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
        <div className="flex md:flex-col   justify-between gap-4 md:gap-1 md:col-span-2  px-2 tracking-wider divide-y  md:border-x border-b md:border-b-0">
          {newsData?.news?.slice(3, 5)?.map((item, index) => (
            <Link
              to={`/${categorySlug}/${item?._id}`}
              className=" cursor-pointer spacey-y-2 group hover:opacity-90 w-1/2 sm:w-full md:border-b"
              key={index}
            >
              <img
                src={item?.main_image}
                className="w-full h-36 sm:h-44 md:h-36 rounded-lg"
                alt=""
              />
              <div className="my-3">
                <p
                  className="font-semibold  text-pTextColor  text-sm  md:text-[14px]   lg:text-base group-hover:text-pHoverTextColor hover:text-pHoverTextColor"
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
        <div className="flex md:flex-col   justify-between gap-4 md:gap-1  md:col-span-2 px-2 tracking-wider divide-y  ">
          {newsData?.news?.slice(5, 7)?.map((item, index) => (
            <Link
              to={`/${categorySlug}/${item?._id}`}
              className=" cursor-pointer spacey-y-2 group hover:opacity-90 w-1/2 sm:w-full md:border-b"
              key={index}
            >
              <img
                src={item?.main_image}
                className="w-full h-36 sm:h-44 md:h-36 rounded-lg"
                alt=""
              />
              <div className="my-3">
                <p
                  className="font-semibold  text-pTextColor  text-sm  md:text-[14px] lg:text-base  group-hover:text-pHoverTextColor hover:text-pHoverTextColor"
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
      </div>
      <hr />
    </div>
  );
};

export default SectionFive;
