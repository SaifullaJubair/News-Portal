import { Link, NavLink, useParams } from "react-router-dom";
import { BASE_URL } from "../../../utils/baseURL";
import { BsArrowRightCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import "react-loading-skeleton/dist/skeleton.css";
import CategoryPageSkeleton from "../../../shared/loader/FrontendLoader/CategoryPageSkeleton";
import { getYouTubeVideoId } from "../../../helper/youtubeVideo";
import { NoMoreNewsMessage } from "../../../shared/EmptyData/NoMoreNews";
import ReactPlayer from "react-player";
import HorizontalNewsSkeleton from "../../../shared/loader/FrontendLoader/HorizontalNewsSkeleton";
import CategoryVideoSection from "./CategoryVideoSection";
import CategoryAudioSection from "./CategoryAudioSection";
import CategoryJoripSection from "./CategoryJoripSection";

const CategoryNews = () => {
  const { category_slug } = useParams();
  const [subData, setSubData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  // const [categoryId, setCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [categoryData, setCategoryData] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    setSubData(null);
    setFilterData(null);
    setCategoryData([]);
    setPage(1);
    setHasMoreData(true);
    setIsLoading(true);
    setIsCategoryLoading(false);
    setIsLoading(true);

    fetch(`${BASE_URL}/news/category_sub_category_news/${category_slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setSubData(data?.data);
        // setCategoryId(data?.data?.categoryInfo?._id);
        // Filter the data to only include items with non-empty news arrays
        const filteredData = data?.data?.matchedNewsBySubCategory?.filter(
          (item) => item.news.length > 0
        );
        setFilterData(filteredData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category_slug]);

  const fetchCategoryData = (page) => {
    setIsCategoryLoading(true);
    fetch(
      `${BASE_URL}/news/all_category/${subData?.categoryInfo?._id}?page=${page}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        if (data.data.length < 10) {
          setHasMoreData(false);
        }
        // Append the new data to the existing data without duplication
        setCategoryData((prevData) => {
          const newData = data?.data?.filter(
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
    if (subData?.matchedNewsBySubCategory.length === 0) {
      fetchCategoryData(page);
    }
  }, [page, subData?.matchedNewsBySubCategory?.length]);
  const isNoNewsAvailable =
    (!subData?.newsInCategory || subData?.newsInCategory?.length === 0) &&
    (!filterData || filterData?.length === 0);

  return (
    <div className="bg-[#fbf9f9] pt-6 tracking-wide min-h-screen">
      <div className="max-w-[1400px] w-[95%] mx-auto">
        {category_slug === "online_jorip" ? (
          <CategoryJoripSection />
        ) : subData?.categoryInfo?.special_category == true &&
          subData?.categoryInfo?.special_category_serial == 2 ? (
          <CategoryVideoSection
            subData={subData}
            category_slug={category_slug}
            isCategoryLoading={isCategoryLoading}
            page={page}
            categoryData={categoryData}
            hasMoreData={hasMoreData}
            setPage={setPage}
          />
        ) : subData?.categoryInfo?.special_category == true &&
          subData?.categoryInfo?.special_category_serial == 3 ? (
          <CategoryAudioSection
            subData={subData}
            category_slug={category_slug}
            isCategoryLoading={isCategoryLoading}
            page={page}
            categoryData={categoryData}
            hasMoreData={hasMoreData}
            setPage={setPage}
          />
        ) : (
          <div>
            {isLoading ? (
              <CategoryPageSkeleton />
            ) : isNoNewsAvailable ? (
              <NoMoreNewsMessage />
            ) : (
              <>
                {/* Top Section Start */}
                <div className="bg-white p-4 sm:p-6 border rounded ">
                  <div className="font-semibold text-pHeadingTextColor flex items-center justify-between gap-4  border-b-[3px] pb-2 border-gray-700  flex-wrap">
                    <div className="flex items-center gap-4 flex-wrap">
                      <NavLink
                        to={`/${subData?.categoryInfo?.category_slug}`}
                        className="hover:text-primaryLightColor text-xl duration-100"
                      >
                        {subData?.categoryInfo?.category_name}
                      </NavLink>
                      {subData?.matchedNewsBySubCategory
                        ?.filter((item) => item?.news?.length > 0)
                        ?.map((item, index) => (
                          <NavLink
                            key={index}
                            to={`/category/${subData?.categoryInfo?.category_slug}/${item?.subCategoryDetails?.sub_category_slug}`}
                            className="hover:text-primaryLightColor duration-100"
                          >
                            {item?.subCategoryDetails?.sub_category_name}
                          </NavLink>
                        ))}
                    </div>
                    <NavLink
                      to={`/all-news?category=${category_slug}`}
                      className="hover:text-pHoverTextColor duration-100"
                    >
                      <BsArrowRightCircle size={24} className="font-semibold" />
                    </NavLink>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 pt-4  gap-4">
                    <div className="col-span-1 sm:col-span-1 md:col-span-2">
                      <Link
                        to={`/${category_slug}/${subData?.newsInCategory?.[0]?._id}`}
                      >
                        <div className="relative flex h-60 sm:h-[350px] md:h-[310px] lg:h-[370px] xl:h-[400px] rounded items-end justify-center group overflow-hidden">
                          {subData?.newsInCategory?.[0]?.video_link ? (
                            <iframe
                              className="absolute inset-0 w-full h-full object-cover"
                              src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                                subData?.newsInCategory?.[0]?.video_link
                              )}`}
                              title={subData?.newsInCategory?.[0]?.heading}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          ) : subData?.newsInCategory?.[0]?.main_image ? (
                            <img
                              src={subData?.newsInCategory?.[0]?.main_image}
                              alt={subData?.newsInCategory?.[0]?.heading}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          ) : (
                            <ReactPlayer
                              url={subData?.newsInCategory?.[0]?.audio_link}
                              controls
                              width="100%"
                              height="50px"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                          <div className="relative text-white p-6 z-10">
                            <h2 className="text-lg pt-1 group-hover:text-primaryLightColor font-semibold line-clamp-2">
                              {subData?.newsInCategory?.[0]?.heading}
                            </h2>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="grid grid-cols-2  sm:grid-cols-2 md:col-span-2 gap-3 sm:gap-4">
                      {subData?.newsInCategory?.slice(1, 5).map((news) => (
                        <div
                          key={news?._id}
                          className="rounded shadow-md h-36 sm:h-44 md:h-36 lg:h-44 xl:h-48 w-full group duration-300 hover:-translate-y-2 relative items-end justify-center flex overflow-hidden"
                        >
                          <Link to={`/${category_slug}/${news?._id}`}>
                            {news?.video_link ? (
                              <iframe
                                className="absolute inset-0 w-full h-full object-cover"
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                                  news?.video_link
                                )}`}
                                title={news?.heading}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            ) : news?.main_image ? (
                              <img
                                src={news?.main_image}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            ) : (
                              <ReactPlayer
                                url={news?.audio_link}
                                controls
                                width="100%"
                                height="50px"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                            <div className="relative text-white z-10 p-4 ">
                              <h2 className="text-sm mb-1 line-clamp-1 group-hover:text-primaryLightColor ">
                                {news?.heading}
                              </h2>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Top Section end */}

                {/* If SubCategory is available sub category wise news start */}
                {subData?.matchedNewsBySubCategory.length > 0 &&
                filterData?.length > 0 ? (
                  <div className="bg-white p-4 sm:p-6 border rounded my-6">
                    {filterData?.map((item) => (
                      <div key={item?.subCategoryDetails?._id} className="mb-4">
                        <div className="flex items-center justify-between py-2 border-b-[3px] border-gray-700">
                          <Link
                            to={`/${category_slug}/${item?.subCategoryDetails?.sub_category_slug}`}
                            className="text-lg text-pTextColor font-semibold flex items-center gap-2 hover:text-pHoverTextColor duration-100"
                          >
                            {item?.subCategoryDetails?.sub_category_name}
                          </Link>

                          <Link
                            to={`/category/${category_slug}/${item?.subCategoryDetails?.sub_category_slug}`}
                            className="hover:text-pHoverTextColor duration-100"
                          >
                            <BsArrowRightCircle
                              size={24}
                              className="font-semibold"
                            />
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 border-r-0 md:border-r pt-6">
                          {item?.news?.slice(0, 10).map((news) => (
                            <Link
                              to={`/${category_slug}/${item?.subCategoryDetails?.sub_category_slug}/${news?._id}`}
                              className="cursor-pointer hover:opacity-90 px-2 border-r space-y-1.5 group"
                              key={news?._id}
                            >
                              {news?.video_link ? (
                                <iframe
                                  className="w-full h-40"
                                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                                    news?.video_link
                                  )}`}
                                  title={news?.heading}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              ) : news?.main_image ? (
                                <img
                                  src={news?.main_image}
                                  className="rounded h-40"
                                  alt=""
                                />
                              ) : (
                                <ReactPlayer
                                  url={news?.audio_link}
                                  controls
                                  width="100%"
                                  height="50px"
                                />
                              )}
                              <p className="font-semibold text-pTextColor text-[12px] sm:text-[14px] line-clamp-2 group-hover:text-pHoverTextColor">
                                {news?.heading}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    {/* If SubCategory is available sub category wise news End */}
                  </div>
                ) : (
                  <div className="pb-10">
                    {isCategoryLoading && page === 1 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 my-6">
                        {Array(5)
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
                        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 my-6 ">
                          {categoryData?.map((news) => (
                            <Link
                              to={`/${category_slug}/${news?._id}`}
                              className="cursor-pointer bg-white rounded hover:opacity-90 space-y-1.5 group border"
                              key={news?._id}
                            >
                              <div className="col-span-1">
                                {news?.video_link ? (
                                  <iframe
                                    className="w-full h-36 sm:h-36 md:h-40 rounded"
                                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                                      news?.video_link
                                    )}`}
                                    title={news?.heading}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  ></iframe>
                                ) : news?.main_image ? (
                                  <img
                                    src={news?.main_image}
                                    className="rounded w-full h-32 sm:h-36 md:h-40"
                                    alt=""
                                  />
                                ) : (
                                  <ReactPlayer
                                    url={news?.audio_link}
                                    controls
                                    width="100%"
                                    height="50px"
                                  />
                                )}
                              </div>
                              <div className="col-span-1 sm:col-span-2 md:grid-cols-3 px-2">
                                <p className="font-semibold text-pTextColor sm:text-base text-[12px] line-clamp-2 group-hover:text-pHoverTextColor">
                                  {news?.heading}
                                </p>
                                <p
                                  className="text-[12px] text-pTextDetailsColor line-clamp-2 my-3"
                                  dangerouslySetInnerHTML={{
                                    __html: news?.description,
                                  }}
                                ></p>
                              </div>
                            </Link>
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
                                onClick={() =>
                                  setPage((prevPage) => prevPage + 1)
                                }
                              >
                                Load More
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryNews;
