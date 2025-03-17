"use client";
import { BsArrowRightCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { BASE_URL } from "@/utils/baseURL";
import { NoMoreNewsMessage } from "@/shared/EmptyData/NoMoreNews";
import Link from "next/link";
import MiniSpinner from "@/shared/loader/MiniSpinner";
import { getYouTubeVideoId } from "@/helper/youtubeVideo";

const TodayNews = ({ filterData }) => {
  const [categoryId, setCategoryId] = useState(null);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [categoryHeadData, setCategoryHeadData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchCategoryData = () => {
    setIsCategoryLoading(true);
    fetch(`${BASE_URL}/today_news_category/category/${categoryId}`)
      .then((res) => {
        if (!res.ok) {
          console.log("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        if (data?.data?.news?.length < 10) {
          setHasMoreData(false);
        }
        setCategoryHeadData(data?.data?.headNews);
        setCategoryData(data?.data?.news);
      })
      .finally(() => {
        setIsCategoryLoading(false);
      });
  };
  useEffect(() => {
    if (categoryId) {
      // If it's the initial fetch, skip resetting the data and page
      fetchCategoryData();
    }
  }, [categoryId]);

  const fetchCategoryLoadMoreData = (page) => {
    setIsCategoryLoading(true);
    fetch(
      `${BASE_URL}/today_news_category/category/load_more/${categoryId}?page=${page}`
    )
      .then((res) => {
        if (!res.ok) {
          console.log("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        if (data?.data?.length < 10) {
          setHasMoreData(false);
        }
        setCategoryData((prevData) => {
          const newData = data?.data?.news?.filter(
            (newItem) => !prevData.some((item) => item?._id === newItem?._id)
          );
          return [...prevData, ...newData];
        });
      })
      .finally(() => {
        setIsCategoryLoading(false);
      });
  };
  useEffect(() => {
    if (categoryId && page > 1) {
      // If it's the initial fetch, skip resetting the data and page
      fetchCategoryLoadMoreData(page);
    }
  }, [categoryId, page]);
  // (filterData);

  if (filterData?.length === 0) return <NoMoreNewsMessage />;
  return (
    <div className="bg-[#fbf9f9] pt-6 tracking-wide">
      <div className="max-w-[1400px] w-[95%] mx-auto">
        {/* Top Section Start */}
        <div className="bg-white p-6 border rounded">
          <div className="font-semibold text-pHeadingTextColor flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href={`/today-news`}
                onClick={() => {
                  setCategoryId(null);
                  setCategoryData([]);
                  setCategoryHeadData([]);
                }}
                className="hover:text-primaryLightColor text-xl duration-100"
              >
                আজকের পত্রিকা
              </Link>
              {filterData?.map((item, index) => (
                <p
                  key={index}
                  className={`hover:text-primaryLightColor duration-100 cursor-pointer ${
                    categoryId === item?.categoryDetails?._id
                      ? "text-primaryLightColor font-bold"
                      : ""
                  }`}
                  onClick={() => setCategoryId(item?.categoryDetails?._id)}
                >
                  {item?.categoryDetails?.category_name}
                </p>
              ))}
            </div>
          </div>
        </div>
        {/* Top Section End */}

        <div className="bg-white p-4 border rounded ">
          {categoryHeadData?.length > 0 || categoryData?.length > 0 ? (
            <div>
              {/* Conditionally Rendered Category Data */}
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 pt-4 gap-4">
                <div className="col-span-1 sm:col-span-2 ">
                  <Link
                    href={`/${categoryHeadData?.[0]?.category_id?.category_slug}/${categoryHeadData?.[0]?._id}`}
                  >
                    <div className="relative flex h-full min-h-[350px] rounded items-end justify-center group overflow-hidden ">
                      {categoryHeadData?.[0]?.video_link ? (
                        <iframe
                          className="absolute inset-0 w-full h-full object-cover"
                          src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                            categoryHeadData?.[0]?.video_link
                          )}`}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : categoryHeadData?.[0]?.main_image ? (
                        <img
                          src={categoryHeadData?.[0]?.main_image}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <ReactPlayer
                          url={categoryHeadData?.[0]?.audio_link}
                          controls
                          width="100%"
                          height="50px"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                      <div className="relative text-white p-6 z-10">
                        <div className="flex text-sm"></div>
                        <h2 className="text-lg pt-1  group-hover:text-primaryLightColor font-semibold line-clamp-2">
                          {categoryHeadData?.[0]?.heading}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2 gap-4">
                  {categoryHeadData?.slice(1, 5).map((news) => (
                    <div
                      key={news?._id}
                      className="rounded shadow-md h-52 w-full group duration-300 hover:-translate-y-2"
                      style={{
                        background: `linear-gradient(0deg, #151515eb 15%, rgba(6, 10, 10, 0) 100%), url(${news?.main_image})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                      }}
                    >
                      <Link
                        href={`/${news?.category_id?.category_slug}/${news?._id}`}
                      >
                        <div className="flex items-end h-full justify-center">
                          <div className="p-4 text-white">
                            <h2 className="text-sm mb-1 line-clamp-1 group-hover:text-primaryLightColor">
                              {news?.heading}
                            </h2>
                            <div className="flex text-sm"></div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 my-6">
                  {categoryData?.map((item) => (
                    <Link
                      href={`/${item?.category_id?.category_slug}/${item?._id}`}
                      className="cursor-pointer bg-white  rounded hover:opacity-90   space-y-1.5 group   border"
                      key={item?._id}
                    >
                      <div className="col-span-1">
                        <img
                          src={item?.main_image}
                          className="rounded w-full h-40"
                          alt=""
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2 md:grid-cols-3 px-2.5">
                        <p className="font-semibold text-pTextColor sm:text-base text-sm line-clamp-2 group-hover:text-pHoverTextColor">
                          {item?.heading}
                        </p>
                        <p
                          className="text-sm text-pTextDetailsColor line-clamp-2 my-3"
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        ></p>
                      </div>
                    </Link>
                  ))}
                </div>
                {hasMoreData && (
                  <div className="flex justify-center ">
                    {isCategoryLoading ? (
                      <button
                        type="button"
                        className="btn btn-primary px-4 py-2   rounded bg-primaryMediumLightColor text-white font-semibold"
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
            </div>
          ) : (
            // Render other categories' news when categoryData is not loaded
            filterData?.map((item, index) => (
              <div key={index} className="mb-10">
                <div className="flex items-center justify-between py-2 border-b-4 border-gray-800">
                  <p
                    className="text-2xl font-semibold flex items-center gap-2 hover:text-pHoverTextColor duration-100 cursor-pointer"
                    onClick={() => setCategoryId(item?.categoryDetails?._id)}
                  >
                    {item?.categoryDetails?.category_name}
                  </p>

                  <p
                    className="hover:text-pHoverTextColor duration-100 cursor-pointer"
                    onClick={() => setCategoryId(item?.categoryDetails?._id)}
                  >
                    {" "}
                    <BsArrowRightCircle size={24} className="font-semibold" />
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
                  {item?.news?.slice(0, 12).map((newsItem) => (
                    <Link
                      href={`/${item?.categoryDetails?.category_slug}/${newsItem?._id}`}
                      className="cursor-pointer hover:opacity-90  space-y-1.5 group border rounded"
                      key={newsItem?._id}
                    >
                      <img
                        src={newsItem?.main_image}
                        className="rounded-t w-full h-48"
                        alt=""
                      />
                      <div className="py-2">
                        <p className=" font-semibold text-pTextColor px-2 text-[13px] sm:text-base line-clamp-2 group-hover:text-pHoverTextColor ">
                          {newsItem?.heading}
                        </p>
                        <p
                          className=" mt-1 text-pTextDetailsColor px-2 text-sm  line-clamp-2 group-hover:text-pHoverTextColor "
                          dangerouslySetInnerHTML={{
                            __html: newsItem?.description,
                          }}
                        ></p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default TodayNews;
