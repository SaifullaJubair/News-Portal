"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import { BASE_URL } from "@/utils/baseURL";
import Link from "next/link";

const LatestNews = () => {
  const [toggle, setToggle] = useState(true);

  const { data: latestNews = [], isLoading: latestNewsLoading } = useQuery({
    queryKey: ["/api/v1/news/latest_create"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/news/latest_create`);
      const data = await res.json();
      return data;
    },
  });
  const { data: featureNews = [], isLoading: featureNewsLoading } = useQuery({
    queryKey: ["/api/v1/news/feature"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/news/feature`);
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="sticky top-32 bg-white">
      <div className="border px-4 py-2.5  rounded lg:h-[500px] h-[400px] my-6  overflow-y-auto   scrollbar-thin scrollbar-track-primaryLightColor flex flex-col ">
        <div>
          <div className="flex items-center gap-4 border-b overflow-y-auto scrollbar-thin  mb-2">
            <p
              className={`font-semibold text-pTextColor btn cursor-pointer p-1 ${
                toggle === true ? "btn-active border-b-2 border-gray-900" : ""
              }`}
              onClick={() => setToggle(true)}
            >
              সর্বশেষ
            </p>
            <p
              className={`font-semibold text-pTextColor btn cursor-pointer p-1 ${
                toggle === false ? "btn-active border-b-2 border-gray-900" : ""
              }`}
              onClick={() => setToggle(false)}
            >
              জনপ্রিয়
            </p>
          </div>
          <div className=" scrollbar-thumb-primaryLightColor mt-4 pb-3 px-2">
            {toggle === true && (
              <>
                {latestNewsLoading ? (
                  <>
                    {Array(7)
                      .fill()
                      .map((_, index) => (
                        <div className="flex items-center gap-4 " key={index}>
                          <Skeleton
                            height={30}
                            width={30}
                            circle="true"
                            className="mb-4"
                          />
                          <div className="w-full">
                            <Skeleton
                              height={15}
                              width={"95%"}
                              className="mb-4"
                            />
                          </div>
                        </div>
                      ))}
                  </>
                ) : (
                  <div className="space-y-4">
                    {latestNews?.data?.map((item, index) => (
                      <Link
                        href={`/${item?.category_info?.category_slug}/${item?._id}`}
                        key={item?._id}
                        className="border-b flex items-center   text-base gap-2"
                      >
                        <div className="flex gap-2 group">
                          <p className="bg-gray-100 text-pTextColor/70  group-hover:text-pHoverTextColor items-center flex w-8 h-8 rounded-full justify-center">
                            {index + 1}
                          </p>
                          <p className="w-full text-pTextColor line-clamp-2 group-hover:text-pHoverTextColor">
                            {item?.heading}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
            {toggle === false && (
              <>
                {featureNewsLoading ? (
                  <>
                    {Array(8)
                      .fill()
                      .map((_, index) => (
                        <div className="flex items-center gap-4 " key={index}>
                          <Skeleton
                            height={30}
                            width={30}
                            circle="true"
                            className="mb-4"
                          />
                          <div className="w-full">
                            <Skeleton
                              height={15}
                              width={"95%"}
                              className="mb-4"
                            />
                          </div>
                        </div>
                      ))}
                  </>
                ) : (
                  <div className="space-y-4">
                    {featureNews?.data?.map((item, index) => (
                      <Link
                        href={`/${item?.category_info?.category_slug}/${item?._id}`}
                        key={item?._id}
                        className="border-b flex items-center   text-sm gap-2"
                      >
                        <div className="flex gap-2 group">
                          <p className="bg-gray-100 text-pTextColor/70  group-hover:text-pHoverTextColor items-center flex w-8 h-8 rounded-full justify-center">
                            {index + 1}
                          </p>
                          <p className="w-full text-pTextColor line-clamp-2 group-hover:text-pHoverTextColor">
                            {item?.heading}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          <div>
            {toggle === true && (
              <Link href={`/all-news`}>
                <button className="btn w-full py-2 px-4 bg-primaryLightColor/20 text-primaryDeepColor/60 hover:text-pHoverTextColor font-semibold border  rounded my-2">
                  সর্বশেষ সব খবর
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
