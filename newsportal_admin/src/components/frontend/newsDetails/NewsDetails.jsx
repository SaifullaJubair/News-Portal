/* eslint-disable no-unsafe-optional-chaining */

import { useEffect, useState, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaRegCopy, FaUser } from "react-icons/fa";
import LatestNews from "../latestNews/LatestNews";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { getYouTubeVideoId } from "../../../helper/youtubeVideo";
import { BASE_URL } from "../../../utils/baseURL";
import ReactPlayer from "react-player";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import RenderNewsContent from "./RenderNewsContent";
import { FaPrint } from "react-icons/fa6";
import { getBanglaTimeInDhaka } from "../../common/GetBanglaTime";
import { Helmet } from "react-helmet-async";



const NewsDetails = ({
  initialNewsData,
  category_slug,
  categoryName,
  subCategroyInfo,
}) => {
  const [newsData, setNewsData] = useState([initialNewsData?.data]); // Initial news
  const [loading, setLoading] = useState(false);
  const [dataFetch, setDataFetch] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const minFontSize = 10;
  const maxFontSize = 26;

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

  const ad19 = adsData?.data?.find((item) => item?.ads_serial == "19");
  const ad20 = adsData?.data?.find((item) => item?.ads_serial == "20");
  const ad21 = adsData?.data?.find((item) => item?.ads_serial == "21");
  const ad22 = adsData?.data?.find((item) => item?.ads_serial == "22");

  const fetchNewsData = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/news/random_category_news/${category_slug}`
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
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };
  const title = newsData[0]?.news?.heading || "Default News Title";
  const description =
    newsData[0]?.news?.description?.substring(0, 150) ||
    "Default news description.";
  const imageUrl =
    newsData[0]?.news?.main_image ||
    "https://newsportal.classicitltd.com/default-image.jpg";
  const url = `https://newsportal.classicitltd.com/${category_slug}/${newsData[0]?.news?._id}`;
  const keywords =
    newsData[0]?.news?.meta_keyword?.map((item) => item?.keyword).join(", ") ||
    "news, articles";


  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={stripHtmlTags(description)} />
        <meta name="keywords" content={keywords} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={stripHtmlTags(description)} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />

        {/* Twitter */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={stripHtmlTags(description)} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
      </Helmet>
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
        <div className="col-span-6">
          {newsData?.map((newsItem, index) => (
            <div key={index}>
              <div>
                <div className="my-8 grid grid-cols-1 lg:grid-cols-6 gap-4">
                  {/* Left column */}
                  <div className="space-y-3 hidden  lg:block col-span-2">
                    {index === 0 && (
                      <>
                        <div className="flex gap-2 items-center ">
                          <NavLink to="/" className="hover:text-PDeepColor">
                            <FaHome size={18} />
                          </NavLink>
                          <NavLink
                            to={`/${category_slug}`}
                            className="hover:text-PDeepColor font-semibold"
                          >
                            / {categoryName}
                          </NavLink>
                          {subCategroyInfo && (
                            <NavLink
                              to={`/${subCategroyInfo?.sub_category_slug}`}
                              className="hover:text-PDeepColor font-semibold text-[#00954c]"
                            >
                              / {subCategroyInfo?.sub_category_name}
                            </NavLink>
                          )}
                        </div>

                        <hr />
                      </>
                    )}
                    <div className="border rounded">
                      <div>
                        {newsItem?.sideNews?.map((item) => (
                          <Link
                            to={`/${category_slug}/${item?._id}`}
                            className="grid grid-cols-5 my-4 mx-1.5 gap-1 cursor-pointer hover:opacity-90 p-2 rounded shadow group"
                            key={item?._id}
                          >
                            {item?.video_link ? (
                              <iframe
                                className="w-full rounded"
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                                  item?.video_link
                                )}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            ) : item?.main_image ? (
                              <img
                                src={item?.main_image}
                                alt=""
                                className="w-full rounded col-span-2"
                              />
                            ) : (
                              <ReactPlayer
                                url={newsItem?.news?.audio_link}
                                controls
                                width="100%"
                                height="50px"
                              />
                            )}

                            <div className="col-span-3">
                              <p className="font-semibold ml-2 text-sm line-clamp-3 group-hover:text-pHoverTextColor">
                                {item?.heading}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {!adsLoading && ad19 && index === 0 && (
                      <div className="my-6 no-print">
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={`${ad19?.ads_link}`}
                        >
                          <img src={ad19?.ads_image} alt="" />
                        </a>
                      </div>
                    )}
                    {!adsLoading && ad20 && index === 0 && (
                      <div className="my-6 no-print">
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={`${ad20?.ads_link}`}
                        >
                          <img src={ad20?.ads_image} alt="" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Middle column */}
                  <div className="lg:col-span-4 col-span-1 ">
                    <div>
                      <p className="md:text-2xl text-lg font-bold mb-6">
                        {newsItem?.news?.heading}
                      </p>

                      <div className="flex gap-2 sm:gap-2 md:gap-3 my-2 mr-2 items-center justify-end flex-nowrap no-print">
                        {/* Social Share Buttons */}
                        <FacebookShareButton
                          url={`https://newsportal.classicitltd.com/${category_slug}/${newsItem?.news?._id}`}
                          title={newsItem?.news?.heading}
                        >
                          <FacebookIcon
                            className="w-6 h-6 sm:w-10 sm:h-10"
                            round
                          />
                        </FacebookShareButton>
                        <FacebookMessengerShareButton
                          url={`https://newsportal.classicitltd.com/${category_slug}/${newsItem?.news?._id}`}
                          appId="291494419107518"
                          title={newsItem?.news?.heading}
                        >
                          <FacebookMessengerIcon
                            className="w-6 h-6 sm:w-10 sm:h-10"
                            round
                          />
                        </FacebookMessengerShareButton>
                        <TwitterShareButton
                          url={`https://newsportal.classicitltd.com/${category_slug}/${newsItem?.news?._id}`}
                          title={newsItem?.news?.heading}
                        >
                          <TwitterIcon
                            className="w-6 h-6 sm:w-10 sm:h-10"
                            round
                          />
                        </TwitterShareButton>
                        <WhatsappShareButton
                          url={`https://newsportal.classicitltd.com/${category_slug}/${newsItem?.news?._id}`}
                          title={newsItem?.news?.heading}
                        >
                          <WhatsappIcon
                            className="w-6 h-6 sm:w-10 sm:h-10"
                            round
                          />
                        </WhatsappShareButton>
                        <LinkedinShareButton
                          url={`https://newsportal.classicitltd.com/${category_slug}/${newsItem?.news?._id}`}
                          title={newsItem?.news?.heading}
                          summary={newsItem?.news?.description?.substring(
                            0,
                            150
                          )}
                          source="https://newsportal.classicitltd.com/"
                        >
                          <LinkedinIcon
                            className="w-6 h-6 sm:w-10 sm:h-10"
                            round
                          />
                        </LinkedinShareButton>

                        {/* Copy Button */}
                        <button
                          className="btn w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white bg-gray-700 flex-shrink-0"
                          onClick={() => {
                            navigator.clipboard
                              .writeText(
                                `https://newsportal.classicitltd.com/${category_slug}/${newsItem?.news?._id}`
                              )
                              .then(() => {
                                toast.success("URL copied to clipboard", {
                                  autoClose: 1000,
                                });
                              })
                              .catch((err) => {
                                console.error("Failed to copy text: ", err);
                              });
                          }}
                        >
                          <FaRegCopy className="" />
                        </button>

                        {/* Print Button */}
                        <button
                          className="btn w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white bg-gray-700 no-print flex-shrink-0"
                          onClick={() => window.print()}
                        >
                          <FaPrint className="" />
                        </button>

                        {/* Zoom Out Button */}
                        <button
                          className={`btn w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white ${
                            fontSize > minFontSize
                              ? "hover:bg-PDeepColor bg-gray-700"
                              : "bg-gray-500"
                          } no-print flex-shrink-0`}
                          onClick={handleZoomOut}
                          disabled={fontSize <= minFontSize}
                        >
                          অ-
                        </button>

                        {/* Zoom In Button */}
                        <button
                          className={`btn w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white ${
                            fontSize < maxFontSize
                              ? "hover:bg-PDeepColor bg-gray-700"
                              : "bg-gray-500"
                          } no-print flex-shrink-0`}
                          onClick={handleZoomIn}
                          disabled={fontSize >= maxFontSize}
                        >
                          অ+
                        </button>
                      </div>
                    </div>

                    {newsItem?.news?.video_link ? (
                      <iframe
                        className=" rounded"
                        width="100%"
                        height="75%"
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
                            className="w-full  rounded"
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

                          {!adsLoading && ad22 && (
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={`${ad22?.ads_link}`}
                            >
                              <img
                                src={ad22?.ads_image}
                                alt=""
                                className="w-full no-print absolute bottom-0 opacity-75 rounded"
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
                      className="flex gap-1.5  text-sm items-center mt-4 "
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

                    <p className="text-sm text-pTextColor mt-1">
                      {getBanglaTimeInDhaka(newsItem?.news?.createdAt)}
                    </p>
                    <p
                      className="tracking-wide leading-relaxed mt-3 mb-6"
                      style={{ fontSize: `${fontSize}px` }}
                      dangerouslySetInnerHTML={{
                        __html: RenderNewsContent({
                          description: newsItem?.news?.description,
                          newsItem: newsItem?.sideNews[0],
                          category_slug,
                          ad22,
                        }),
                      }}
                    ></p>

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
              {index !== newsData.length - 1 && <hr className="my-4" />}
            </div>
          ))}
        </div>
        <div className="lg:col-span-2 hidden lg:block my-10 ">
          <LatestNews />

          {!adsLoading && ad21 && (
            <div className="my-6 no-print">
              <a target="_blank" rel="noreferrer" href={`${ad22?.ads_link}`}>
                <img src={ad22?.ads_image} alt="" />
              </a>
            </div>
          )}
        </div>
      </div>
      {loading && (
        <div className="loader flex items-start justify-center my-6">
          Loading... <MiniSpinner />
        </div>
      )}
    </div>
  );
};

export default NewsDetails;
