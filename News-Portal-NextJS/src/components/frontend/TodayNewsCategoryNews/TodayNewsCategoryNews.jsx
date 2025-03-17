"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/baseURL";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { Link, NavLink } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";

const TodayNewsCategoryNews = ({ filterData, categoryId, category_slug }) => {
  const [loadData, setLoadData] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const fetchCategoryData = (page) => {
    setIsCategoryLoading(true);
    fetch(`${BASE_URL}/today_news_category/category/${categoryId}?page=${page}`)
      .then((res) => {
        if (!res.ok) {
          console.log("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        // if (data.data.length < 10) {
        //   setHasMoreData(false);
        // }
        // Append the new data to the existing data without duplication
        // setCategoryData((prevData) => {
        //   const newData = data?.data?.filter(
        //     (newItem) => !prevData.some((item) => item?._id === newItem?._id)
        //   );
        //   return [...prevData, ...newData];
        // });

        setCategoryData(data);
      })
      .finally(() => {
        setIsCategoryLoading(false);
      });
  };

  useEffect(() => {
    fetchCategoryData(page);
  }, [page]);

  // (categoryData);

  return (
    <div className="bg-[#fbf9f9] pt-6 tracking-wide min-h-screen">
      <div className="max-w-[1400px] w-[95%] mx-auto">
        {/* Top Section Start */}
        <div className="bg-white p-6 border rounded">
          <div className="font-semibold text-pHeadingTextColor flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <NavLink
                to={`/${filterData?.categoryInfo?.category_slug}`}
                className="hover:text-primaryLightColor text-xl duration-100"
              >
                {filterData?.categoryInfo?.category_name}
              </NavLink>
              {filterData?.allSubCategory?.map((item, index) => (
                <NavLink
                  key={index}
                  to={`/category/${filterData?.categoryInfo?.category_slug}/${item?.sub_category_slug}`}
                  className="hover:text-primaryLightColor duration-100"
                >
                  {item?.sub_category_name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 pt-4 gap-4">
            <div className="col-span-1 sm:col-span-2">
              <Link
                to={`/${category_slug}/${filterData?.newsInCategory?.[0]?._id}`}
              >
                <div className="relative flex h-full min-h-[350px] rounded items-end justify-center group overflow-hidden">
                  <img
                    src={filterData?.newsInCategory?.[0]?.main_image}
                    alt={filterData?.newsInCategory?.[0]?.heading}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  <div className="relative text-white p-6 z-10">
                    <div className="flex text-sm"></div>
                    <h2 className="text-lg pt-1 group-hover:text-primaryLightColor font-semibold line-clamp-2">
                      {filterData?.newsInCategory?.[0]?.heading}
                    </h2>
                  </div>
                </div>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2 gap-4">
              {filterData?.newsInCategory?.slice(1, 5).map((news) => (
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
                  <Link to={`/${category_slug}/${news?._id}`}>
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
        </div>
        {/* Top Section end */}

        {/* If SubCategory is available sub category wise news start */}
        {filterData?.matchedNewsBySubCategory.length > 0 ? (
          <div className="bg-white p-4 border rounded my-6 ">
            {filterData?.map((item) => (
              <div key={item?.subCategoryDetails?._id} className="">
                <div className="flex items-center justify-between py-2 border-b-4 border-gray-800">
                  <Link
                    to={`/${category_slug}/${item?.subCategoryDetails?.sub_category_slug}`}
                    className="text-2xl font-semibold flex items-center gap-2 hover:text-pHoverTextColor duration-100"
                  >
                    <p>{item?.subCategoryDetails?.sub_category_name}</p>
                  </Link>

                  <Link
                    to={`/category/${category_slug}/${item?.subCategoryDetails?.sub_category_slug}`}
                    className="hover:text-pHoverTextColor duration-100"
                  >
                    <BsArrowRightCircle size={24} className="font-semibold" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 border-r-0 md:border-r pt-6">
                  {item?.news?.slice(0, 10).map((news) => (
                    <Link
                      to={`/${category_slug}/${item?.subCategoryDetails?.sub_category_slug}/${news?._id}`}
                      className="cursor-pointer hover:opacity-90 px-2 border-r space-y-1.5 group"
                      key={news?._id}
                    >
                      <img
                        src={news?.main_image}
                        className="rounded h-40"
                        alt=""
                      />
                      <p className="font-semibold text-pTextColor text-sm sm:text-base line-clamp-2 group-hover:text-pHoverTextColor">
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
          <div className=" pb-10">
            {isCategoryLoading && page === 1 ? (
              <div>
                Loading .. <MiniSpinner />
              </div>
            ) : (
              <div className="">
                <div className="p-4 rounded my-6 max-w-6xl mx-auto">
                  {categoryData?.map((item) => (
                    <Link
                      to={`/${category_slug}/${item?._id}`}
                      className="cursor-pointer hover:opacity-90  px-2 space-y-1.5 group grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 my-6 gap-4"
                      key={item?._id}
                    >
                      <div className="col-span-1">
                        <img
                          src={item?.main_image}
                          className="rounded w-full h-40"
                          alt=""
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2 md:grid-cols-3">
                        <p className="font-semibold text-pTextColor sm:text-base text-sm line-clamp-2 group-hover:text-pHoverTextColor">
                          {item?.heading}
                        </p>
                        <p
                          className="text-sm text-pTextDetailsColor line-clamp-3 my-3"
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
            )}
          </div>
        )}
      </div>

      {/* SubCategory News End */}
    </div>
  );
};

export default TodayNewsCategoryNews;
