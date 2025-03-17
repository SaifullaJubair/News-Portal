/* eslint-disable no-unsafe-optional-chaining */
"use client";
import { useEffect, useState, useCallback, useContext } from "react";
import { FaUser } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useQuery } from "@tanstack/react-query";
import RenderNewsContent from "./RenderNewsContent";
import { BASE_URL } from "@/utils/baseURL";
import { getYouTubeVideoId } from "@/helper/youtubeVideo";
import { getBanglaTimeInDhaka } from "@/components/common/GetBanglaTime";
import LatestNews from "../latestNews/LatestNews";
import MiniSpinner from "@/shared/loader/MiniSpinner";
import SocialShare from "./SocialShare";
import NewsDetailsLeftColumn from "./NewsDetailsLeftColumn";
import { SettingContext } from "@/provider/SettingProvider";
// import "react-quill/dist/quill.snow.css";

const NewsDetails = ({
  initialNewsData,
  category_slug,
  categoryName,
  subCategroyInfo,
}) => {
  const [newsData, setNewsData] = useState([initialNewsData?.data]); // Initial news
  const { loading: settingLoading, settingData } = useContext(SettingContext);

  const [loading, setLoading] = useState(false);
  const [dataFetch, setDataFetch] = useState(true);
  const [fontSize, setFontSize] = useState(20);
  const minFontSize = 12;
  const maxFontSize = 32;

  const handleZoomIn = () => {
    setFontSize((prevSize) => Math.min(prevSize + 2, maxFontSize));
  };

  const handleZoomOut = () => {
    setFontSize((prevSize) => Math.max(prevSize - 2, minFontSize));
  };

  const { data: adsData = [], isLoading: adsLoading } = useQuery({
    queryKey: ["/api/v1/ads"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/ads`);
      const data = await res.json();

      return data;
    },
  });
  const handlePrint = (index) => {
    const allNewsItems = document.querySelectorAll(".news-item");
    const targetNewsItem = document.getElementById(
      `news-print-section-${index}`
    );

    // Hide all news items except the target
    allNewsItems.forEach((item) => {
      if (item !== targetNewsItem) {
        item.style.display = "none";
      }
    });

    // Show logo only during printing
    const logoElement = document.getElementById("print-logo");
    logoElement.style.display = "block";

    // Print and then show all items again
    window.print();

    // Restore all news items and hide the logo after printing
    allNewsItems.forEach((item) => {
      item.style.display = "block";
    });
    logoElement.style.display = "none";
  };

  const ad19 = adsData?.data?.find((item) => item?.ads_serial == "19");
  const ad20 = adsData?.data?.find((item) => item?.ads_serial == "20");
  const ad21 = adsData?.data?.find((item) => item?.ads_serial == "21");
  const ad22 = adsData?.data?.find((item) => item?.ads_serial == "22");
  const ad23 = adsData?.data?.find((item) => item?.ads_serial == "23");

  const fetchNewsData = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/news/random_category_news/${category_slug}?news_id=${initialNewsData?.data?.news?._id}`
      );
      const data = await response.json();
      if (data?.statusCode === 200 && data?.success) {
        setNewsData((prevData) => [...prevData, ...data?.data]);
      }
    } catch (error) {
      console.error("Error fetching news data:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, category_slug]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        newsData?.length < 10 &&
        dataFetch
      ) {
        fetchNewsData();
        setDataFetch(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dataFetch, fetchNewsData, newsData?.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div id="print-logo" className="hidden">
        {settingData?.logo && (
          <img
            src={settingData.logo}
            alt="Site Logo"
            className="w-1/3 -mb-4 mt-2"
          />
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
        <div className="col-span-6 ">
          {newsData?.map((newsItem, index) => (
            <div
              key={index}
              id={`news-print-section-${index}`}
              className="news-item"
            >
              <div>
                <div className="my-8 grid grid-cols-1 lg:grid-cols-6 gap-4">
                  {/* Left column */}
                  <NewsDetailsLeftColumn
                    index={index}
                    newsItem={newsItem}
                    categoryName={categoryName}
                    category_slug={category_slug}
                    subCategroyInfo={subCategroyInfo}
                    ad19={ad19}
                    ad20={ad20}
                    adsLoading={adsLoading}
                  />

                  {/* Middle column */}
                  <div className="lg:col-span-4 col-span-1 ">
                    {!adsLoading && ad19 && index === 0 && (
                      <div className="mb-6 no-print ">
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={`${ad19?.ads_link}`}
                        >
                          <img
                            src={ad19?.ads_image}
                            className="lg:hidden block md:h-60 h-52 w-full sm:w-auto  mx-auto object-cover"
                            alt=""
                          />
                        </a>
                      </div>
                    )}
                    <div className="mb-3">
                      <p className="md:text-2xl xl:text-3xl text-lg font-bold text-gray-700">
                        {newsItem?.news?.heading}
                      </p>
                      <p
                        className="text-base md:text-lg tracking-wide text-gray-700 pt
                      -1.5 mb-3"
                      >
                        {newsItem?.news?.sub_heading}
                      </p>
                      {/* Social Share */}
                      <SocialShare
                        newsItem={newsItem}
                        category_slug={category_slug}
                        handleZoomIn={handleZoomIn}
                        handleZoomOut={handleZoomOut}
                        minFontSize={minFontSize}
                        fontSize={fontSize}
                        maxFontSize={maxFontSize}
                        index={index}
                        handlePrint={handlePrint}
                      />
                    </div>

                    {newsItem?.news?.video_link ? (
                      <iframe
                        className=" rounded w-full md:h-96 sm:h-80 h-52 "
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                          newsItem?.news?.video_link
                        )}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : newsItem?.news?.audio_link ? (
                      <>
                        <div className="">
                          <img
                            src={newsItem?.news?.main_image}
                            alt=""
                            className="w-full   rounded"
                          />
                        </div>
                        <ReactPlayer
                          url={newsItem?.news?.audio_link}
                          controls
                          width="100%"
                          height="50px"
                        />
                      </>
                    ) : (
                      <div>
                        <div className="relative md:h-[460px] lg:h-auto ">
                          <img
                            src={newsItem?.news?.main_image}
                            alt=""
                            className="w-full  md:h-[460px] lg:h-auto   "
                          />

                          {!adsLoading && ad23 && (
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={`${ad23?.ads_link}`}
                            >
                              <img
                                src={ad23?.ads_image}
                                alt=""
                                className="w-full h-16 no-print absolute bottom-0 opacity-75 rounded"
                              />
                            </a>
                          )}
                        </div>
                        {newsItem?.news?.main_image_source && (
                          <div className="bg-gray-200 w-full ">
                            <p className="text-center text-sm text-pTextColor p-1.5">
                              {newsItem?.news?.main_image_source}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    <div
                      className="flex gap-1.5  text-base items-center mt-4 "
                      title="writer"
                    >
                      <span>
                        {newsItem?.news?.writer_image ? (
                          <>
                            <img
                              src={newsItem?.news?.writer_image}
                              className="w-8 h-8 rounded-full"
                              alt=""
                            />
                          </>
                        ) : (
                          <FaUser />
                        )}
                      </span>
                      <span>
                        {" "}
                        {newsItem?.news?.writer_name
                          ? newsItem?.news?.writer_name
                          : "নিজস্ব প্রতিবেদক"}
                      </span>
                    </div>

                    <p className="text-base text-pTextColor mt-1">
                      {getBanglaTimeInDhaka(newsItem?.news?.createdAt)}
                    </p>
                    <div
                      // className="tracking-wide leading-relaxed mt-3 mb-6"
                      style={{ fontSize: `${fontSize}px` }}
                      // dangerouslySetInnerHTML={{
                      //   __html: newsItem?.news?.description,
                      // }}
                      dangerouslySetInnerHTML={{
                        __html: RenderNewsContent({
                          description: newsItem?.news?.description,
                          newsItem: newsItem?.sideNews[0],
                          category_slug,
                          adsData: ad21,
                        }),
                      }}
                    ></div>

                    <div className="flex gap-4 flex-wrap">
                      {newsItem?.news?.meta_keyword?.map((item, index) => (
                        <div className="bg-gray-200 p-1 rounded" key={index}>
                          {item?.keyword}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {!adsLoading && ad20 && index === 0 && (
                <div className="my-6 no-print">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`${ad20?.ads_link}`}
                  >
                    <img
                      src={ad20?.ads_image}
                      className="lg:hidden block md:h-96 h-72 sm:h-80 w-full object-cover"
                      alt=""
                    />
                  </a>
                </div>
              )}
              {index !== newsData.length - 1 && <hr className="my-4" />}
            </div>
          ))}
        </div>
        <div className="lg:col-span-2 hidden lg:block my-10 ">
          {!adsLoading && ad22 && (
            <div className="my-6 no-print">
              <a target="_blank" rel="noreferrer" href={`${ad22?.ads_link}`}>
                <img src={ad22?.ads_image} alt="" />
              </a>
            </div>
          )}
          <LatestNews />
        </div>
      </div>
      {loading && (
        <div className="loader flex items-start justify-center my-6">
          <MiniSpinner />
        </div>
      )}
    </div>
  );
};

export default NewsDetails;
