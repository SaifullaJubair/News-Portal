"use client";
import { useQuery } from "@tanstack/react-query";
import { BsArrowRightCircle } from "react-icons/bs";
import { FaRegClock, FaRegCopy } from "react-icons/fa6";
import { useEffect, useState } from "react";
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
import Link from "next/link";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";
import SectionOneSkeleton from "@/shared/loader/FrontendLoader/SectionOneSkeleton";
import { getTime } from "@/components/common/GetTime";
import MiniSpinner from "@/shared/loader/MiniSpinner";
import { onlineJoripp } from "@/utils/ImageImport";
import { useSearchParams } from "next/navigation";
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
const CategoryJoripSection = () => {
  const searchParams = useSearchParams();
  const jorip_id = searchParams.get("jorip_id");
  const [index, setIndex] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: joripData = [],
    isLoading: joripLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/online_jorip/alll?page=${page}&limit=${limit}`],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/online_jorip/all?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      if (data?.data?.length < 10) {
        setHasMoreData(false);
      }
      return data;
    },
  });

  // Handle vote submission
  const handleVote = async (option, jorip, click, questionAnsId) => {
    setIndex([...index, option]);
    // Create the data to send
    const sendData = {
      _id: jorip?._id,
      online_jorip_all_question: jorip?.online_jorip_all_question?.map(
        (item) => {
          // Check if this is the question that was answered
          if (item?._id === questionAnsId) {
            return {
              ...item,
              online_jorip_question_click: (click ? click : 0) + 1, // Increment the click count
            };
          } else {
            return {
              ...item,
              online_jorip_question_click: item?.online_jorip_question_click, // Set click to existing or 0 if none
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
      ("first");
    }
  };

  if (joripLoading) {
    return <SectionOneSkeleton />;
  }

  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div className="flex items-center justify-between">
        <Link
          href={`/online_jorip`}
          className="text-2xl font-semibold flex items-center gap-2 hover:text-pHoverTextColor duration-100"
        >
          <img
            src={onlineJoripp}
            alt=""
            className="w-6 h-6 sm:w-10 sm:h-8 rounded-sm"
          />
          <p>অনলাইন জরিপ</p>
        </Link>

        <Link
          href={`/online_jorip`}
          className="hover:text-pHoverTextColor duration-100"
        >
          <BsArrowRightCircle size={24} className="font-semibold" />
        </Link>
      </div>

      <div className="bg-gray-800 h-1 w-full mt-2"></div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6">
        {joripData?.data
          ?.sort((a, b) =>
            a?._id === jorip_id ? -1 : b?._id === jorip_id ? 1 : 0
          )
          ?.map((jorip, i) => (
            <div key={jorip?._id} className="group border rounded-md">
              <Link
                href={`/online_jorip/${jorip?._id}`}
                className="cursor-pointer hover:opacity-90"
              >
                <img
                  src={jorip?.online_jorip_image}
                  alt=""
                  className="rounded h-[250px] lg:h-[280px] w-full"
                />

                <div className="p-2">
                  <p className="text-xs flex gap-2 items-center text-gray-700 my-1">
                    <FaRegClock />
                    {getTime(jorip?.createdAt)}
                  </p>
                  <p className="font-semibold mb-2 text-pHeadingTextColor text-lg group-hover:text-pHoverTextColor duration-150 line-clamp">
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
              <p className="p-2  gap-2  font-semibold items-center text-gray-700">
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
                  url={`https://dailyourbangladesh.com/online_jorip/${jorip?._id}`}
                  title={jorip?.online_jorip_title}
                >
                  <FacebookIcon size={24} round />
                </FacebookShareButton>
                <FacebookMessengerShareButton
                  url={`https://dailyourbangladesh.com/online_jorip/${jorip?._id}`}
                  appId="291494419107518"
                  title={jorip?.online_jorip_title}
                >
                  <FacebookMessengerIcon size={24} round />
                </FacebookMessengerShareButton>

                <TwitterShareButton
                  url={`https://dailyourbangladesh.com/online_jorip/${jorip?._id}`}
                  title={jorip?.online_jorip_title}
                >
                  <TwitterIcon size={24} round />
                </TwitterShareButton>

                <WhatsappShareButton
                  url={`https://dailyourbangladesh.com/online_jorip/${jorip?._id}`}
                  title={jorip?.online_jorip_title}
                >
                  <WhatsappIcon size={24} round />
                </WhatsappShareButton>

                <LinkedinShareButton
                  url={`https://dailyourbangladesh.com/online_jorip/${jorip?._id}`}
                  title={jorip?.online_jorip_title}
                  source="https://dailyourbangladesh.com"
                >
                  <LinkedinIcon size={24} round />
                </LinkedinShareButton>

                <button
                  className={`btn w-6 h-6 flex items-center justify-center rounded-full text-white bg-gray-700`}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://dailyourbangladesh.com/online_jorip/${jorip?._id}`
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
          ))}
      </div>

      {joripData?.data?.length > 10 && hasMoreData && (
        <div className="flex justify-center">
          {joripLoading ? (
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
              onClick={() => {
                setPage((prevPage) => prevPage + 1);
                setLimit(limit + 10);
              }}
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryJoripSection;
