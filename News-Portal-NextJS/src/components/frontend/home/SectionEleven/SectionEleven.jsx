"use client";
import Link from "next/link";
import { BsArrowRightCircle } from "react-icons/bs";

const SectionEleven = ({ categoryData, newsData, adsData }) => {
  const categorySlug = categoryData?.categoryDetails?.category_slug;
  newsData;
  if (!newsData?.length > 0) return;

  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div className="flex items-center justify-between py-2 border-b-4 border-gray-800">
        <Link
          href={`/${categorySlug}`}
          className="text-2xl font-semibold flex items-center gap-2 hover:text-pHoverTextColor duration-100"
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
          href={`/${categorySlug}`}
          className="hover:text-pHoverTextColor duration-100"
        >
          <BsArrowRightCircle size={24} className="font-semibold" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 ">
        <div className="col-span-2 md:col-span-3 lg:col-span-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-4">
            {newsData?.slice(0, 8).map((news, index) => (
              <>
                <div className="" key={index}>
                  <Link
                    href={`/${categorySlug}/${news?._id}`}
                    className=" group hover:text-pHoverTextColor duration-100"
                  >
                    <div className="space-y-2">
                      <img
                        src={news?.main_image}
                        alt=""
                        className="rounded w-full "
                      />
                      <div className="">
                        <p className="text-pTextColor group-hover:text-pHoverTextColor duration-100 line-clamp-2 text-sm sm:text-base">
                          {news?.heading}
                        </p>
                        <span className="text-sm text-gray-500">
                          {news.news_date}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* every row <hr> add */}
                {(index + 1) % 4 === 0 && (
                  <div className="lg:block hidden lg:col-span-4">
                    <hr className="my-1.5" />
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        {/* ads */}
        {adsData && (
          <div className=" mt-6 px-4 md:col-span-1 col-span-2 ">
            <a target="_blank" rel="noreferrer" href={`${adsData?.ads_link}`}>
              <img
                src={adsData?.ads_image}
                className="w-full md:h-auto h-40 object-cover"
                alt=""
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionEleven;
