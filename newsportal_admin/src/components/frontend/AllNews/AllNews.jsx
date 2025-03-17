import { BASE_URL } from "../../../utils/baseURL";
import { FaHome } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import LatestNews from "../../../components/frontend/latestNews/LatestNews";
import { useEffect, useRef, useState } from "react";
import { getYouTubeVideoId } from "../../../helper/youtubeVideo";
import Skeleton from "react-loading-skeleton";
import { getBanglaTimeInDhaka } from "../../common/GetBanglaTime";

const AllNews = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [categoryData, setCategoryData] = useState([]);
  const [page, setPage] = useState(1);
  const category = queryParams.get("category");
  const subCategory = queryParams.get("sub_category");
  const searchTerm = queryParams.get("searchTerm");
  const isInitialFetch = useRef(true); // Track if it's the initial fetch
  const [loading, setLoading] = useState(false);
  const fetchCategoryData = (page) => {
    setLoading(true);
    fetch(
      `${BASE_URL}/news/all_news?category_slug=${category}&sub_category_slug=${subCategory}&page=${page}&searchTerm=${searchTerm}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setCategoryData((prevData) => {
          const newData = data?.data?.news?.filter(
            (newItem) => !prevData.some((item) => item?._id === newItem?._id)
          );
          return [...prevData, ...newData];
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isInitialFetch?.current) {
      // If it's the initial fetch, skip resetting the data and page
      fetchCategoryData(1);
      isInitialFetch.current = false; // Mark initial fetch as done
    }
  }, [category, subCategory]);

  // Fetch more data when the page number is incremented
  useEffect(() => {
    if (page > 1) {
      fetchCategoryData(page);
    }
  }, [page]);

  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div className="flex items-center my-4 gap-2 text-sm">
        <Link to="/">
          <FaHome />
        </Link>{" "}
        <span>/</span>
        <NavLink to="/all-news" className="font-semibold">
          সর্বশেষ সব খবর
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="cols-span-1 sm:col-span-2">
          {loading ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-4">
                {Array(10)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index}
                      className="flex my-4 gap-2.5 tracking-wide"
                    >
                      <div>
                        <Skeleton height={80} width={128} className="rounded" />
                      </div>
                      <div className="w-full">
                        <Skeleton height={10} width="90%" className="rounded" />
                        <Skeleton height={10} width="60%" className="rounded" />
                        <Skeleton height={10} width="15%" className="rounded" />
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-4">
                {categoryData?.map((item) => (
                  <div key={item?._id} className="">
                    <Link
                      to={`/${item?.category_id?.category_slug}/${item?._id}`}
                    >
                      <div className="flex  my-4 gap-2.5 tracking-wide">
                        {item?.video_link ? (
                          <iframe
                            className="w-32 h-20 rounded"
                            src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                              item?.video_link
                            )}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : item?.main_image ? (
                          <img
                            src={item?.main_image}
                            alt=""
                            className="w-32 h-20 rounded"
                          />
                        ) : (
                          <audio
                            src={item?.audio_link}
                            controls
                            className="z-[-10] w-40"
                          />
                        )}
                        <div>
                          <p className="text-sm font-semibold text-pTextColor line-clamp-2">
                            {item?.heading}
                          </p>
                          {item?.createdAt && (
                            <p className="text-xs text-pTextColor mt-1.5">
                              {getBanglaTimeInDhaka(item?.createdAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              {!loading && (
                <div className="flex items-center justify-center my-8">
                  <button
                    type="button"
                    className="btn btn-primary px-4 py-2 rounded bg-primaryMediumLightColor text-white font-semibold"
                    onClick={() => setPage((prevPage) => prevPage + 1)}
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        {/* Latest news */}
        <div>
          <LatestNews />
        </div>
      </div>
    </div>
  );
};

export default AllNews;
