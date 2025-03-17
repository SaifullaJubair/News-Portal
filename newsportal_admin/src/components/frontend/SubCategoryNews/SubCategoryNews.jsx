/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/baseURL";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { Link, NavLink } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import HorizontalNewsSkeleton from "../../../shared/loader/FrontendLoader/HorizontalNewsSkeleton";
import { getYouTubeVideoId } from "../../../helper/youtubeVideo";
import ReactPlayer from "react-player";
import CategoryVideoSection from "../CategoryNews/CategoryVideoSection";
import CategoryAudioSection from "../CategoryNews/CategoryAudioSection";
import CategoryPhotoSection from "../CategoryNews/CategoryPhotoSection";

const SubCategoryNews = ({ subData, category_slug }) => {
  const [loadData, setLoadData] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isSubCategoryLoading, setIsSubCategoryLoading] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState([]);

  const fetchCategoryData = (page) => {
    setIsSubCategoryLoading(true);
    fetch(
      `${BASE_URL}/news/all_sub_category/${subData?.subCategoryInfo?._id}?page=${page}`
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
        setSubCategoryData((prevData) => {
          const newData = data?.data?.filter(
            (newItem) => !prevData.some((item) => item?._id === newItem?._id)
          );
          return [...prevData, ...newData];
        });
      })
      .finally(() => {
        setIsSubCategoryLoading(false);
      });
  };

  useEffect(() => {
    if (loadData === true) {
      setLoadData(false);
      fetchCategoryData(page);
    }
  }, [page, loadData]);

  return (
    <div className="bg-[#fbf9f9] pt-6 tracking-wide min-h-screen">
      <div className="max-w-[1400px] w-[95%] mx-auto">
        {/* Top Section Start */}

        {subData?.categoryInfo?.special_category == true &&
        subData?.categoryInfo?.special_category_serial == 2 ? (
          <CategoryVideoSection
            subData={subData}
            category_slug={category_slug}
            isCategoryLoading={isSubCategoryLoading}
            page={page}
            categoryData={subCategoryData}
            hasMoreData={hasMoreData}
            setPage={setPage}
          />
        ) : subData?.categoryInfo?.special_category == true &&
          subData?.categoryInfo?.special_category_serial == 3 ? (
          <CategoryAudioSection
            subData={subData}
            category_slug={category_slug}
            isCategoryLoading={isSubCategoryLoading}
            page={page}
            categoryData={subCategoryData}
            hasMoreData={hasMoreData}
            setPage={setPage}
          />
        ) : subData?.categoryInfo?.special_category == true &&
          subData?.categoryInfo?.special_category_serial == 1 ? (
          <CategoryPhotoSection
            subData={subData}
            category_slug={category_slug}
            isCategoryLoading={isSubCategoryLoading}
            page={page}
            categoryData={subCategoryData}
            hasMoreData={hasMoreData}
            setPage={setPage}
          />
        ) : (
          <>
            <div className="bg-white p-4 sm:p-6 border rounded ">
              <div className="font-semibold text-pHeadingTextColor flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center flex-wrap gap-4">
                  <NavLink
                    to={`/${subData?.categoryInfo?.category_slug}`}
                    className="hover:text-primaryLightColor text-xl duration-100"
                  >
                    {subData?.categoryInfo?.category_name}
                  </NavLink>
                  {subData?.matchedNewsBySubCategory
                    ?.filter((item) => item?.news?.length > 0)
                    .map((item, index) => (
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
                  to={`/all-news?category=${category_slug}&sub_category=${subData?.subCategoryInfo?.sub_category_slug}`}
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
                          className="absolute inset-0 w-full h-full "
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
                        <div className="flex text-sm"></div>
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

            <div className="pb-10">
              {isSubCategoryLoading && page === 1 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 my-6">
                  {" "}
                  {Array(5)
                    .fill()
                    .map((_, index) => (
                      <HorizontalNewsSkeleton key={index} />
                    ))}
                </div>
              ) : (
                <div className="">
                  <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 my-6 ">
                    {subCategoryData?.map((news) => (
                      <Link
                        to={`/${category_slug}/${news?._id}`}
                        className="cursor-pointer bg-white  rounded hover:opacity-90   space-y-1.5 group   border"
                        key={news?._id}
                      >
                        <div className="col-span-1">
                          {news?.video_link ? (
                            <iframe
                              className="w-full h-32 sm:h-36  md:h-40 rounded"
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
                              className="rounded w-full sm:h-36 h-32  md:h-40"
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

                  {hasMoreData && (
                    <div className="flex justify-center ">
                      {isSubCategoryLoading ? (
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
              )}
            </div>
          </>
        )}
      </div>

      {/* SubCategory News End */}
    </div>
  );
};

export default SubCategoryNews;
