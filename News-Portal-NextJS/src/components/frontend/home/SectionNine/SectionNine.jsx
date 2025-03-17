"use client";
import Link from "next/link";
import { BsArrowRightCircle } from "react-icons/bs";

const SectionNine = ({ categoryData, newsData, ad9, ad8 }) => {
  if (!newsData?.length > 0) return;
  ad9;
  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div>
        {/* Actual Content */}
        <div className="flex items-center justify-between py-2 border-b-4 border-gray-800">
          <Link
            href={`/${categoryData?.categoryDetails?.category_slug}`}
            className=" text-2xl font-semibold flex items-center gap-2 hover:text-pHoverTextColor duration-100"
          >
            <img
              src={categoryData?.categoryDetails?.category_logo}
              alt=""
              className="w-6 h-6 sm:w-10 sm:h-8 rounded-sm"
            />
            <p className="text-lg sm:text-xl">
              {categoryData?.categoryDetails?.category_name}
            </p>
          </Link>
          <Link
            href={`/${categoryData?.categoryDetails?.category_slug}`}
            className="hover:text-pHoverTextColor duration-100"
          >
            <BsArrowRightCircle size={24} className="font-semibold" />
          </Link>
        </div>

        <div className="grid grid-cols-2  md:grid-cols-5 gap-4 py-4">
          <div className="col-span-2 md:col-span-4 ">
            <div className="grid grid-cols-2  md:grid-cols-4 gap-3 gap-y-4  tracking-wide">
              {newsData?.slice(0, 8)?.map((item, index) => (
                <Link
                  href={`${categoryData?.categoryDetails?.category_slug}/${item?._id}`}
                  className="cursor-pointer hover:opacity-90 group rounded border pb-1 "
                  key={index}
                >
                  <div className="space-y-2 ">
                    <img
                      src={item?.main_image}
                      className="w-full h-40 md:h-28 lg:h-32 xl:h-40 rounded"
                      alt=""
                    />
                    <div className="px-2 pb-1.5 ">
                      <p
                        className="font-semibold text-pHeadingTextColor  text-sm sm:text-base group-hover:text-pHoverTextColor"
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
                        className="text-gray-500 mt-1 sm:text-sm text-xs"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: "2",
                          WebkitBoxOrient: "vertical",
                        }}
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Add */}
          <div className="space-y-2 hidden md:block mb-2">
            {ad8 && (
              <a target="_blank" rel="noreferrer" href={`${ad8?.ads_link}`}>
                <img
                  src={ad8?.ads_image}
                  className="w-full  h-1/2 rounded"
                  alt=""
                />
              </a>
            )}
            {ad9 && (
              <a target="_blank" rel="noreferrer" href={`${ad9?.ads_link}`}>
                <img
                  src={ad9?.ads_image}
                  className="w-full  h-1/2 rounded"
                  alt=""
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionNine;
