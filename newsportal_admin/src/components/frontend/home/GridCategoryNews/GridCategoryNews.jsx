import { FaAngleRight, FaRegClock, FaRegCopy } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../utils/baseURL";
import { useState } from "react";
import { getTime } from "../../../common/GetTime";

// Function to convert English digits to Bangla digits
const convertToBanglaDigits = (number) => {
  const banglaDigits = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };
  return number
    .toString()
    .split("")
    .map((digit) => banglaDigits[digit] || digit)
    .join("");
};

const GridCategoryNews = ({ joripData, newsData2ndCol, refetch }) => {
  const [index, setIndex] = useState([]);

  // Handle vote submission
  const handleVote = async (option, jorip, click, questionAnsId) => {
    setIndex([...index, option]);
    const sendData = {
      _id: jorip?._id,
      online_jorip_all_question: jorip?.online_jorip_all_question?.map(
        (item) => {
          if (item?._id === questionAnsId) {
            return {
              ...item,
              online_jorip_question_click: (click ? click : 0) + 1,
            };
          } else {
            return {
              ...item,
              online_jorip_question_click: item?.online_jorip_question_click,
            };
          }
        }
      ),
    };
    try {
      const response = await fetch(`${BASE_URL}/online_jorip`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        refetch();
      }
    } catch (error) {
      toast.error("Network error or server is down", {
        autoClose: 1000,
      });
    } finally {
      console.log("first");
    }
  };

  return (
    <div className="max-w-[1400px] w-[95%] mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-6 tracking-wide">
        <>
          {joripData.map((jorip, i) => (
            <div key={i} className="">
              {/* Category title */}
              <div className="flex items-center  gap-2 sm:gap-4 mt-1 mb-5  group">
                <div className="flex-grow border-y h-[5px] border-gray-500 group-hover:border-pHoverTextColor"></div>
                <Link to={`/online_jorip`} className="relative ">
                  <p className="sm:text-4xl md:text-2xl lg:text-4xl text-3xl font-extrabold text-gray-500 opacity-10 group-hover:text-pHoverTextColor">
                    অনলাইন জরিপ
                  </p>
                  <p className=" font-semibold -mt-8 ml-1.5 flex items-center justify-center gap-1 text-pTextColor group-hover:text-pHoverTextColor lg:text-lg">
                    অনলাইন জরিপ
                    <FaAngleRight />
                  </p>
                </Link>
                <div className="flex-grow border-y h-[5px] border-gray-500 group-hover:border-pHoverTextColor"></div>
              </div>

              {/* JORIP */}
              <div key={jorip?._id} className="group border rounded-md">
                <Link
                  to={`/online_jorip?jorip_id=${jorip?._id}`}
                  className="cursor-pointer hover:opacity-90"
                >
                  <img
                    src={jorip?.online_jorip_image}
                    alt=""
                    className="rounded h-[280px] md:h-[220px] sm:h-[380px] lg:h-[280px] w-full"
                  />

                  <div className="p-2">
                    <p className="text-xs flex gap-2 items-center text-gray-700 my-1 ">
                      <FaRegClock />
                      {getTime(jorip?.createdAt)}
                    </p>
                    <p className="font-semibold mb-2 text-pHeadingTextColor text-[16px] group-hover:text-pHoverTextColor duration-150 line-clamp-2">
                      {jorip?.online_jorip_title}
                    </p>
                  </div>
                </Link>

                <div className="space-y-4 mb-2 mx-2">
                  {index.includes(i)
                    ? jorip?.online_jorip_all_question?.map((question) => {
                        const totalClicks =
                          jorip?.online_jorip_all_question?.reduce(
                            (sum, q) =>
                              sum + (q?.online_jorip_question_click || 0),
                            0
                          );

                        const percentage = totalClicks
                          ? ((question?.online_jorip_question_click || 0) /
                              totalClicks) *
                            100
                          : 0;

                        const percentageInBangla = convertToBanglaDigits(
                          percentage.toFixed(2)
                        );

                        return (
                          <div
                            key={question?._id}
                            className="relative w-full h-7 bg-gray-300 rounded-lg"
                          >
                            {/* Progress bar */}
                            <div
                              className="absolute left-0 top-0 h-full  bg-gradient-to-r from-PDeepColor to-primaryMediumLightColor rounded-lg"
                              style={{ width: `${percentage}%` }}
                            ></div>
                            {/* Text on the progress bar */}
                            <div className="absolute inset-0 flex justify-between px-3 text-white text-sm items-center">
                              <p> {question?.online_jorip_question}</p>
                              <p> {percentageInBangla}%</p>
                            </div>
                          </div>
                        );
                      })
                    : jorip?.online_jorip_all_question?.map((question) => (
                        <button
                          key={question?._id}
                          onClick={() =>
                            handleVote(
                              i,
                              jorip,
                              question?.online_jorip_question_click,
                              question?._id
                            )
                          }
                          className="block w-full border rounded hover:bg-gray-100 py-1 text-sm"
                        >
                          {question?.online_jorip_question}
                        </button>
                      ))}
                </div>
                <p className="p-2 flex gap-2 font-semibold items-center text-gray-700">
                  মোট ভোটদাতাঃ
                  <span>
                    {" "}
                    {convertToBanglaDigits(
                      jorip?.online_jorip_all_question?.reduce(
                        (sum, q) => sum + (q?.online_jorip_question_click || 0),
                        0
                      )
                    )}{" "}
                    জন
                  </span>
                </p>

                <div className="flex gap-3 my-2 pb-2 mr-2 items-center justify-center flex-wrap">
                  <FacebookShareButton
                    url={`https://daily-our-bangladesh-j9pfe.ondigitalocean.app/online_jorip?jorip_id=${jorip?._id}`}
                    title={jorip?.online_jorip_title}
                  >
                    <FacebookIcon size={24} round />
                  </FacebookShareButton>
                  <FacebookMessengerShareButton
                    url={`https://daily-our-bangladesh-j9pfe.ondigitalocean.app/online_jorip?jorip_id=${jorip?._id}`}
                    appId="291494419107518"
                    title={jorip?.online_jorip_title}
                  >
                    <FacebookMessengerIcon size={24} round />
                  </FacebookMessengerShareButton>

                  <TwitterShareButton
                    url={`https://daily-our-bangladesh-j9pfe.ondigitalocean.app/online_jorip?jorip_id=${jorip?._id}`}
                    title={jorip?.online_jorip_title}
                  >
                    <TwitterIcon size={24} round />
                  </TwitterShareButton>

                  <WhatsappShareButton
                    url={`https://daily-our-bangladesh-j9pfe.ondigitalocean.app/online_jorip?jorip_id=${jorip?._id}`}
                    title={jorip?.online_jorip_title}
                  >
                    <WhatsappIcon size={24} round />
                  </WhatsappShareButton>

                  <LinkedinShareButton
                    url={`https://daily-our-bangladesh-j9pfe.ondigitalocean.app/online_jorip?jorip_id=${jorip?._id}`}
                    title={jorip?.online_jorip_title}
                    source="https://daily-our-bangladesh-j9pfe.ondigitalocean.app/"
                  >
                    <LinkedinIcon size={24} round />
                  </LinkedinShareButton>

                  <button
                    className={`btn w-6 h-6 flex items-center justify-center rounded-full text-white bg-gray-700`}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://daily-our-bangladesh-j9pfe.ondigitalocean.app/online_jorip?jorip_id=${jorip?._id}`
                      );
                      toast.success("Copied link to clipboard!", {
                        autoClose: 1000,
                      });
                    }}
                  >
                    <FaRegCopy />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
        {/* Jiboni Start */}

        <div className="col-span-2">
          <div className="flex items-center  gap-2  sm:gap-4 mt-1 mb-5 group">
            <div className="flex-grow border-y h-[5px] border-gray-500 group-hover:border-pHoverTextColor"></div>
            <Link
              to={`/${newsData2ndCol?.categoryDetails?.category_slug}`}
              className="relative "
            >
              <p className="sm:text-4xl text-3xl font-extrabold text-gray-500 opacity-10 group-hover:text-pHoverTextColor">
                {newsData2ndCol?.categoryDetails?.category_name}
              </p>
              <p className=" font-semibold -mt-8 ml-1.5 flex items-center justify-center gap-1 text-pTextColor group-hover:text-pHoverTextColor lg:text-lg">
                {newsData2ndCol?.categoryDetails?.category_name}
                <FaAngleRight />
              </p>
            </Link>
            <div className="flex-grow border-y h-[5px] border-gray-500 group-hover:border-pHoverTextColor"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {" "}
            <div className="flex flex-col h-full justify-between border rounded">
              <div className="flex-1">
                {newsData2ndCol?.news?.slice(0, 1).map((item) => (
                  <Link
                    to={`/${newsData2ndCol?.categoryDetails?.category_slug}/${item?._id}`}
                    key={item?._id}
                    className="group mb-3 "
                  >
                    <img
                      src={item?.main_image}
                      className="w-full h-[280px] md:h-[220px] sm:h-[380px] lg:h-[280px] rounded group-hover:opacity-90 "
                      alt=""
                    />
                    <div className="mx-2">
                      <p className="text-xs flex gap-2 mt-3 items-center text-gray-700 ">
                        <FaRegClock />
                        {getTime(item?.createdAt)}
                      </p>
                      <p className="line-clamp-2  text-lg  font-semibold text-pTextColor my-1 group-hover:text-pHoverTextColor">
                        {item?.heading}
                      </p>
                      <p
                        className=" my-2 tracking-wider space-y-[2px] text-sm text-pTextDetailsColor"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: "10",
                          WebkitBoxOrient: "vertical",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: item?.description,
                        }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col h-full justify-between border rounded">
              <div className="flex-1">
                {newsData2ndCol?.news?.slice(1, 2).map((item) => (
                  <Link
                    to={`/${newsData2ndCol?.categoryDetails?.category_slug}/${item?._id}`}
                    key={item?._id}
                    className="group mb-3 "
                  >
                    <img
                      src={item?.main_image}
                      className="w-full h-[280px] md:h-[220px] sm:h-[380px] lg:h-[280px] rounded group-hover:opacity-90 "
                      alt=""
                    />
                    <div className="mx-2">
                      <p className="text-xs flex gap-2 mt-3 items-center text-gray-700 ">
                        <FaRegClock />
                        {getTime(item?.createdAt)}
                      </p>
                      <p className="line-clamp-2  text-lg  font-semibold text-pTextColor my-1 group-hover:text-pHoverTextColor">
                        {item?.heading}
                      </p>
                      <p
                        className=" my-2 tracking-wider space-y-[2px] text-sm text-pTextDetailsColor"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: "10",
                          WebkitBoxOrient: "vertical",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: item?.description,
                        }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* jiboni end */}
      </div>
    </div>
  );
};

export default GridCategoryNews;
