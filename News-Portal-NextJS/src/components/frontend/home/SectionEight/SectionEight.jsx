"use client";
import { BsArrowRightCircle } from "react-icons/bs";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles
import SectionEightSkeleton from "../../../../shared/loader/FrontendLoader/SectionEightSkeleton";
import Link from "next/link";

const SectionEight = ({ newsData, categoryData, newsLoading }) => {
  if (newsLoading) return <SectionEightSkeleton />;
  if (!newsData?.length > 0) return;
  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div>
        {/* Actual Content */}
        <div className="flex items-center justify-between py-2 border-b-4 border-gray-800">
          <Link
            href={`/${categoryData?.categoryDetails?.category_slug}`}
            className="text-2xl font-semibold flex items-center gap-2 hover:text-pHoverTextColor duration-100"
          >
            <img
              src={categoryData?.categoryDetails?.category_logo}
              alt=""
              className="w-6 h-6 sm:w-10 sm:h-8 rounded-sm"
            />
            <p>{categoryData?.categoryDetails?.category_name}</p>
          </Link>
          <Link
            href={`/${categoryData?.categoryDetails?.category_slug}`}
            className="hover:text-pHoverTextColor duration-100"
          >
            <BsArrowRightCircle size={24} className="font-semibold" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-6 tracking-wide">
          {/* 1st Column */}
          <div className="flex flex-col gap-1 px-2">
            {newsData?.slice(0, 4)?.map((item, index) => (
              <Link
                href={`${categoryData?.categoryDetails?.category_slug}/${item?._id}`}
                className="cursor-pointer hover:opacity-90 group"
                key={index}
              >
                <div className="mt-2 space-y-2">
                  <p
                    className="font-semibold text-pHeadingTextColor text-lg group-hover:text-pHoverTextColor"
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item?.heading}
                  </p>
                  <p
                    className="text-gray-500 text-sm"
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: "3",
                      WebkitBoxOrient: "vertical",
                    }}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></p>
                  <hr className="m-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* 2nd Column */}
          <Link
            href={`/${categoryData?.categoryDetails?.category_slug}/${
              newsData?.slice(4, 5)[0]?._id
            }`}
            className="cursor-pointer hover:opacity-90 group col-span-1 md:col-span-2 px-2 flex flex-col tracking-wide"
          >
            <img
              src={newsData?.slice(4, 5)[0]?.main_image}
              alt=""
              className="w-full"
            />
            <div className="p-2 space-y-2">
              <p
                className="font-semibold text-pHeadingTextColor text-lg lg:text-[20px] group-hover:text-pHoverTextColor"
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {newsData?.slice(4, 5)[0]?.heading}
              </p>
              <p
                className="text-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: newsData?.slice(4, 5)[0]?.description,
                }}
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: "4",
                  WebkitBoxOrient: "vertical",
                }}
              ></p>
            </div>
          </Link>

          {/* 3rd Column */}
          <div className="flex flex-col gap-1 px-2">
            {newsData?.slice(5, 9)?.map((item, index) => (
              <Link
                href={`/${categoryData?.categoryDetails?.category_slug}/${item?._id}`}
                className="cursor-pointer hover:opacity-90 group"
                key={index}
              >
                <div className="mt-2 space-y-2">
                  <p
                    className="font-semibold text-pHeadingTextColor text-lg group-hover:text-pHoverTextColor"
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item?.heading}
                  </p>
                  <p
                    className="text-gray-500 text-sm"
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: "3",
                      WebkitBoxOrient: "vertical",
                    }}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></p>
                  <hr className="m-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionEight;
