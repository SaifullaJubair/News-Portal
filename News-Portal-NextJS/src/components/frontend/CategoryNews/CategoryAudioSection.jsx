"use client";
import { getTime } from "@/components/common/GetTime";
import HorizontalNewsSkeleton from "@/shared/loader/FrontendLoader/HorizontalNewsSkeleton";
import MiniSpinner from "@/shared/loader/MiniSpinner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsArrowRightCircle } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";
import ReactPlayer from "react-player";

const CategoryAudioSection = ({
  subData,
  category_slug,
  isCategoryLoading,
  page,
  categoryData,
  hasMoreData,
  setPage,
}) => {
  const pathName = usePathname();
  const isActiveLink = (href) => {
    return pathName === href ? "text-pHoverTextColor" : "";
  };
  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="font-semibold text-pHeadingTextColor flex items-center justify-between gap-4  border-b-2 pb-2   flex-wrap">
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href={`/${subData?.categoryInfo?.category_slug}`}
            className={`hover:text-primaryLightColor text-xl duration-100 ${isActiveLink(
              `/${subData?.categoryInfo?.category_slug}`
            )}`}
          >
            {subData?.categoryInfo?.category_name}
          </Link>
          {subData?.matchedNewsBySubCategory
            ?.filter((item) => item?.news?.length > 0)
            ?.map((item, index) => (
              <Link
                key={index}
                href={`/category/${subData?.categoryInfo?.category_slug}/${item?.subCategoryDetails?.sub_category_slug}`}
                className={`hover:text-primaryLightColor duration-100 ${isActiveLink(
                  `/category/${subData?.categoryInfo?.category_slug}/${item?.subCategoryDetails?.sub_category_slug}`
                )}`}
              >
                {item?.subCategoryDetails?.sub_category_name}
              </Link>
            ))}
        </div>
        <Link
          href={`/all-news?category=${category_slug}`}
          className="hover:text-pHoverTextColor duration-100"
        >
          <BsArrowRightCircle size={24} className="font-semibold" />
        </Link>
      </div>
      <div className="pb-10">
        {isCategoryLoading && page === 1 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
            {Array(3)
              .fill()
              .map((_, index) => (
                <HorizontalNewsSkeleton key={index} />
              ))}
          </div>
        ) : (
          <div className="bg-white p-2 bo">
            {categoryData?.length === 0 && !isCategoryLoading && (
              <p className="text-center text-gray-500">
                No more data available.
              </p>
            )}
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6 ">
              {categoryData?.map((news) => (
                <div key={news?._id} className="border rounded p-1">
                  <Link
                    href={`/${category_slug}/${news?._id}`}
                    className="cursor-pointer bg-white  rounded hover:opacity-90   space-y-1.5 group    grid grid-cols-3 gap-2 "
                    key={news?._id}
                  >
                    <div className="col-span-1">
                      {news?.main_image ? (
                        <img
                          src={news?.main_image}
                          className="w-full border-x-[1px]  border-t-[1px] rounded border-red-500"
                          alt=""
                        />
                      ) : (
                        <div className="bg-gray-100 w-full h-24">
                          <p className="text-center text-gray-700 flex items-center justify-center">
                            Audio
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="col-span-2 ">
                      <p className="font-semibold text-pTextColor  text-base line-clamp-2 group-hover:text-pHoverTextColor">
                        {news?.heading}
                      </p>
                      <p className="text-xs flex gap-2 items-center text-gray-700 my-1">
                        <FaRegClock />
                        {getTime(news?.createdAt)}
                      </p>
                    </div>
                  </Link>
                  <div className="py-2">
                    <ReactPlayer
                      url={news?.audio_link}
                      controls
                      width="100%"
                      height="25px"
                    />
                  </div>
                </div>
              ))}
            </div>
            {categoryData?.length > 0 && hasMoreData && (
              <div className="flex justify-center">
                {isCategoryLoading ? (
                  <button
                    type="button"
                    className="btn btn-primary px-4 py-2 rounded bg-primaryMediumLightColor text-white font-semibold"
                  >
                    Loading... <MiniSpinner />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary px-4 py-2 rounded bg-primaryMediumLightColor text-white font-semibold"
                    onClick={() => setPage((prevPage) => prevPage + 1)}
                  >
                    Load More
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryAudioSection;
