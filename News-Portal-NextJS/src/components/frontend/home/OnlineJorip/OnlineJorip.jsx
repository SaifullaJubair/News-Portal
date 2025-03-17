"use client";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../utils/baseURL";
import SectionOneSkeleton from "../../../../shared/loader/FrontendLoader/SectionOneSkeleton";
import { Link } from "react-router-dom";
import onlineJorip from "../../../../assets/image/online_jorip.png";
import { BsArrowRightCircle } from "react-icons/bs";
import { FaRegClock, FaRegCopy } from "react-icons/fa6";
import { getTime } from "../../../common/GetTime";
import { useState } from "react";
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

const OnlineJorip = () => {
  const [index, setIndex] = useState([]);

  const {
    data: joripData = [],
    isLoading: joripLoading,
    refetch,
  } = useQuery({
    queryKey: ["/api/v1/online_jorip"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/online_jorip`);
      const data = await res.json();
      return data?.data;
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
          to={`/online_jorip`}
          className="text-2xl font-semibold flex items-center gap-2 hover:text-pHoverTextColor duration-100"
        >
          <img
            src={onlineJorip}
            alt=""
            className="w-6 h-6 sm:w-10 sm:h-8 rounded-sm"
          />
          <p>অনলাইন জরিপ</p>
        </Link>

        <Link
          to={`/online_jorip`}
          className="hover:text-pHoverTextColor duration-100"
        >
          <BsArrowRightCircle size={24} className="font-semibold" />
        </Link>
      </div>

      <div className="bg-gray-800 h-1 w-full mt-2"></div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6">
        {joripData?.map((jorip, i) => (
          <div key={jorip?._id} className="px-2 group mt-2 border rounded-md">
            <p className="text-xs flex gap-2 items-center text-gray-700 my-1 px-2">
              <FaRegClock />
              {getTime(jorip?.createdAt)}
            </p>
            <Link
              to={`/online_jorip/${jorip?._id}`}
              className="cursor-pointer hover:opacity-90 "
            >
              <img
                src={jorip?.online_jorip_image}
                alt=""
                className="rounded-lg md:h-48 w-full"
              />

              <div className="py-2">
                <p className="font-semibold mb-2 text-pHeadingTextColor text-lg group-hover:text-pHoverTextColor duration-150 line-clamp-2">
                  {jorip?.online_jorip_title}
                </p>
              </div>
            </Link>

            <div className="space-y-4 mb-2">
              {index.includes(i)
                ? jorip?.online_jorip_all_question?.map((question) => {
                    // Calculate total clicks
                    const totalClicks =
                      jorip?.online_jorip_all_question?.reduce(
                        (sum, q) => sum + (q?.online_jorip_question_click || 0),
                        0
                      );

                    // Calculate percentage for each question
                    const percentage = totalClicks
                      ? ((question?.online_jorip_question_click || 0) /
                          totalClicks) *
                        100
                      : 0;

                    return (
                      <div
                        key={question?._id}
                        className="relative w-full h-6 bg-gray-200 rounded-lg"
                      >
                        {/* Progress bar */}
                        <div
                          className="absolute left-0 top-0 h-full bg-blue-500 rounded-lg"
                          style={{ width: `${percentage}%` }}
                        ></div>
                        {/* Text on the progress bar */}
                        <span className="absolute inset-0 flex justify-between px-2 text-white text-sm items-center">
                          {question?.online_jorip_question} -{" "}
                          {question?.online_jorip_question_click || 0}(
                          {percentage.toFixed(2)}%)
                        </span>
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
                      className="block w-full border rounded hover:bg-gray-100 h-6 text-sm rounded-lg"
                    >
                      {/* Display question before voting */}
                      {question?.online_jorip_question}
                    </button>
                  ))}
            </div>

            <div className="flex gap-3 my-2 mr-2 items-center justify-center flex-wrap">
              <FacebookShareButton
                url={`https://dailyourbangladesh.comonline_jorip?jorip_id=${jorip?._id}`}
                title={jorip?.online_jorip_title}
              >
                <FacebookIcon size={24} round />
              </FacebookShareButton>
              <FacebookMessengerShareButton
                url={`https://dailyourbangladesh.comonline_jorip?jorip_id=${jorip?._id}`}
                appId="291494419107518"
                title={jorip?.online_jorip_title}
              >
                <FacebookMessengerIcon size={24} round />
              </FacebookMessengerShareButton>

              <TwitterShareButton
                url={`https://dailyourbangladesh.comonline_jorip?jorip_id=${jorip?._id}`}
                title={jorip?.online_jorip_title}
              >
                <TwitterIcon size={24} round />
              </TwitterShareButton>

              <WhatsappShareButton
                url={`https://dailyourbangladesh.comonline_jorip?jorip_id=${jorip?._id}`}
                title={jorip?.online_jorip_title}
              >
                <WhatsappIcon size={24} round />
              </WhatsappShareButton>

              <LinkedinShareButton
                url={`https://dailyourbangladesh.comonline_jorip?jorip_id=${jorip?._id}`}
                title={jorip?.online_jorip_title}
                source="https://dailyourbangladesh.com"
              >
                <LinkedinIcon size={24} round />
              </LinkedinShareButton>

              <button
                className={`btn w-6 h-6 rounded-full text-white bg-gray-700`}
                onClick={() => {
                  navigator.clipboard
                    .writeText(
                      `https://dailyourbangladesh.comonline_jorip?jorip_id=${jorip?._id}`
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
                <FaRegCopy className="ml-1.5" size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineJorip;
