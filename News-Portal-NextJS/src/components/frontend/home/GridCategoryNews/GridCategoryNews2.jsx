"use client"
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6"

const GridCategoryNews2 = ({
  newsData1stCol,
  newsData2ndCol,
  newsData3rdCol,
  newsData4thCol,
}) => {
  return (
    <div className="max-w-[1400px] w-[95%] mx-auto ">
      <div className="grid grid-cols-1  sm:grid-cols-2   lg:grid-cols-4 gap-6 tracking-wide mb-16">
        {[newsData1stCol, newsData2ndCol, newsData3rdCol, newsData4thCol]?.map(
          (columnData, index) =>
            columnData?.news?.length > 0 && (
              <div key={index} className="">
                {/* Category title */}
                <div className="flex items-center my-8 gap-2  sm:gap-4 group">
                  <div className="flex-grow border-y h-[5px] border-gray-500 group-hover:border-pHoverTextColor"></div>
                  <Link
                    href={`/${columnData?.categoryDetails?.category_slug}`}
                    className="relative "
                  >
                    <p className="sm:text-4xl text-3xl font-extrabold text-gray-500 opacity-10 group-hover:text-pHoverTextColor">
                      {columnData?.categoryDetails?.category_name}
                    </p>
                    <p className=" font-semibold -mt-8 ml-1.5 flex items-center justify-center gap-1 text-pTextColor group-hover:text-pHoverTextColor">
                      {columnData?.categoryDetails?.category_name}
                      <FaAngleRight />
                    </p>
                  </Link>
                  <div className="flex-grow border-y h-[5px] border-gray-500 group-hover:border-pHoverTextColor"></div>
                </div>
                {/* News */}
                <div className="flex flex-col h-full justify-between">
                  <div className="flex-1">
                    {columnData?.news?.slice(0, 1).map((item) => (
                      <Link
                        href={`/${columnData?.categoryDetails?.category_slug}/${item?._id}`}
                        key={item?._id}
                        className="group mb-3"
                      >
                        <img
                          src={item?.main_image}
                          className="w-full h-[220px] rounded group-hover:opacity-90 "
                          alt=""
                        />
                        <p className="line-clamp-2 text-base  font-semibold text-pTextColor my-2 group-hover:text-pHoverTextColor">
                          {item?.heading}
                        </p>
                        <p
                          className="line-clamp-2 text-sm text-gray-500"
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />
                      </Link>
                    ))}
                  </div>
                  <div className="flex-1">
                    {columnData?.news?.slice(1, 3).map((item) => (
                      <Link
                        href={`/${columnData?.categoryDetails?.category_slug}/${item?._id}`}
                        key={item?._id}
                        className="group border-t mt-3"
                      >
                        <p className="line-clamp-2 font-semibold text-pTextColor my-2 group-hover:text-pHoverTextColor">
                          {item?.heading}
                        </p>
                        <div className="grid grid-cols-3 gap-1.5">
                          <div className="col-span-2">
                            <p
                              className="line-clamp-3 pt-1 text-sm text-gray-500"
                              dangerouslySetInnerHTML={{
                                __html: item?.description,
                              }}
                            />
                          </div>
                          <img
                            src={item?.main_image}
                            className="rounded-lg w-full px-1 h-20 group-hover:opacity-85 "
                            alt=""
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default GridCategoryNews2;
