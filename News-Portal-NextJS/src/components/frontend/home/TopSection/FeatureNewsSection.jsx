"use client";
import Link from "next/link";

const FeatureNewsSection = ({ featureNews }) => {
  return (
    <div>
      {featureNews?.data?.length > 0 && (
        <div className="ml-1">
          <div className=" grid grid-cols-1  sm:grid-cols-5 gap-2 border-b ">
            <Link
              href={`/${featureNews?.data?.[0]?.category_info?.category_slug}/${featureNews?.data?.[0]?._id}`}
              className="relative col-span-3 group"
            >
              <img
                src={featureNews?.data?.[0]?.main_image}
                alt=""
                className="w-full h-56 "
              />
              <div className="absolute inset-0 h-56  bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>

              <h1 className=" text-base sm:text-xl text-pTextColor hover:text-pHoverTextColor font-bold my-2.5 md:max-w-lg w-full duration-150 group-hover:text-pHoverTextColor ">
                {featureNews?.data?.[0]?.heading}
              </h1>
            </Link>

            <div className="col-span-2">
              {featureNews?.data?.slice(1, 3)?.map((news, index) => (
                <Link
                  href={`/${news?.category_info?.category_slug}/${news?._id}`}
                  className=" group"
                  key={index}
                >
                  <div className="group  duration-200 mb-3 grid grid-cols-7 gap-1.5">
                    <img
                      src={news?.main_image}
                      alt=""
                      className="w-full col-span-3 group-hover:scale-105 duration-300"
                    />

                    <div className="col-span-4">
                      <h1 className=" font-extrabold  sm:line-clamp-3 hover:text-pHoverTextColor duration-150 text-base md:max-w-lg w-full  text-pTextColor group-hover:text-pHoverTextColor">
                        {news?.heading}
                      </h1>
                    </div>
                  </div>
                  <div
                    className=" md:max-w-lg w-full line-clamp-2 text-sm mt-1.5 text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: news?.description,
                    }}
                  ></div>
                  {index % 2 === 0 && <hr className="my-2" />}
                </Link>
              ))}
            </div>
          </div>

          {/* Left feature news */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 ">
            {featureNews?.data?.slice(3, 9)?.map((news, index) => (
              <>
                <Link
                  href={`/${news?.category_info?.category_slug}/${news?._id}`}
                  className="cursor-pointer group relative border-r px-2  mt-2"
                  key={index}
                >
                  <img
                    src={news?.main_image}
                    className="w-full h-32 lg:h-28 xl:h-32"
                    alt=""
                  />
                  <div className="absolute inset-0 mx-2  h-32 lg:h-28 xl:h-32 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 "></div>

                  <h1 className="font-extrabold line-clamp-2  hover:text-pHoverTextColor duration-150  md:max-w-lg w-full my-1.5 text-pTextColor group-hover:text-pHoverTextColor">
                    {news?.heading}
                  </h1>
                  <div
                    className=" md:max-w-lg w-full line-clamp-2 text-sm  text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: news?.description,
                    }}
                  ></div>
                </Link>
                {(index + 1) % 3 === 0 && index !== 5 && (
                  <div className="col-span-full hidden sm:block">
                    <hr className="" />
                  </div>
                )}
              </>
            ))}
          </div>
          <hr className="mt-2" />
        </div>
      )}
    </div>
  );
};

export default FeatureNewsSection;
