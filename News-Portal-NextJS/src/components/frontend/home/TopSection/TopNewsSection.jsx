"use client";
import Link from "next/link";

const TopNewsSection = ({ topNews, adsData }) => {
  return (
    <div>
      <div className="block sm:hidden my-6">
        {adsData && (
          <a target="_blank" rel="noreferrer" href={`${adsData?.ads_link}`}>
            <img
              src={adsData?.ads_image}
              className="w-full h-20 rounded"
              alt=""
            />
          </a>
        )}
      </div>
      {topNews?.data?.length > 0 && (
        <div>
          <h1 className="text-lg font-bold text-white border-l-[5px]  border-primaryMediumLightColor bg-gradient-to-r from-PDeepColor to-primaryMediumLightColor rounded-lg p-2 pl-4 mb-2.5 xl:mb-2">
            টপ নিউজ
          </h1>
          <div className="border rounded px-1.5 py-3 ">
            {topNews?.data?.slice(0, 1).map((news, index) => (
              <div key={index} className="relative col-span-1 ">
                <Link
                  href={`/${news?.category_info?.category_slug}/${news._id}`}
                  className="cursor-pointer group"
                >
                  <img
                    src={news?.main_image}
                    className="w-full h-56 sm:h-44 lg:h-40 xl:h-44 "
                    alt=""
                  />
                  <div className="absolute inset-0 h-56 sm:h-44 lg:h-40 xl:h-44 bg-black/50 opacity-0 group-hover:opacity-25 transition-opacity  duration-300"></div>

                  <h1 className="font-bold line-clamp-2 my-2 ml-1 pl-1 w-full  text-pTextColor group-hover:text-primaryLightColor">
                    {news?.heading}
                  </h1>
                  <hr className="mb-3" />
                </Link>
              </div>
            ))}
            <div className="">
              {topNews?.data?.slice(1, 6).map((news, index) => (
                <Link
                  href={`/${news?.category_info?.category_slug}/${news?._id}`}
                  className="cursor-pointer group"
                  key={index}
                >
                  <div className="group  duration-200  grid grid-cols-7 gap-1.5">
                    <img
                      src={news?.main_image}
                      alt=""
                      className="w-full h-24 lg:h-[82px]  col-span-3 group-hover:scale-105 duration-300"
                    />

                    <div className="col-span-4">
                      <h1 className=" font-semibold  sm:line-clamp-2 hover:text-pHoverTextColor duration-150  md:max-w-lg w-full  text-gray-800 group-hover:text-pHoverTextColor">
                        {news?.heading}
                      </h1>
                  <p
                    className="line-clamp-1 mt-1 text-sm text-pTextDetailsColor "
                    dangerouslySetInnerHTML={{ __html: news?.description }}
                  ></p>
                    </div>
                  </div>

                  <hr className="my-2" />
                </Link>
              ))}
            </div>

            <div className="hidden sm:block mt-3">
              {adsData && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${adsData?.ads_link}`}
                >
                  <img
                    src={adsData?.ads_image}
                    className="w-full h-20 rounded"
                    alt=""
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNewsSection;
