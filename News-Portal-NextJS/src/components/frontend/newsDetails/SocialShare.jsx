import { FaPrint, FaRegCopy } from "react-icons/fa";
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

const SocialShare = ({
  newsItem,
  category_slug,
  minFontSize,
  fontSize,
  maxFontSize,
  handleZoomIn,
  handleZoomOut,
  index,
  handlePrint,
}) => {
  return (
    <div>
      <div className="flex gap-2 sm:gap-2 md:gap-3  mr-2 items-center justify-end flex-nowrap print:hidden">
        {/* Social Share Buttons */}
        <FacebookShareButton
          url={`https://dailyourbangladesh.com/${category_slug}/${newsItem?.news?._id}`}
          title={newsItem?.news?.heading}
        >
          <FacebookIcon className="w-6 h-6 sm:w-10 sm:h-10" round />
        </FacebookShareButton>
        <FacebookMessengerShareButton
          url={`https://dailyourbangladesh.com/${category_slug}/${newsItem?.news?._id}`}
          appId="291494419107518"
          title={newsItem?.news?.heading}
        >
          <FacebookMessengerIcon className="w-6 h-6 sm:w-10 sm:h-10" round />
        </FacebookMessengerShareButton>
        <TwitterShareButton
          url={`https://dailyourbangladesh.com/${category_slug}/${newsItem?.news?._id}`}
          title={newsItem?.news?.heading}
        >
          <TwitterIcon className="w-6 h-6 sm:w-10 sm:h-10" round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={`https://dailyourbangladesh.com/${category_slug}/${newsItem?.news?._id}`}
          title={newsItem?.news?.heading}
        >
          <WhatsappIcon className="w-6 h-6 sm:w-10 sm:h-10" round />
        </WhatsappShareButton>
        <LinkedinShareButton
          url={`https://dailyourbangladesh.com/${category_slug}/${newsItem?.news?._id}`}
          title={newsItem?.news?.heading}
          summary={newsItem?.news?.description?.substring(0, 150)}
          source="https://dailyourbangladesh.com/"
        >
          <LinkedinIcon className="w-6 h-6 sm:w-10 sm:h-10" round />
        </LinkedinShareButton>

        {/* Copy Button */}
        <button
          className="btn w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white bg-gray-700 flex-shrink-0"
          onClick={() => {
            navigator.clipboard
              .writeText(
                `https://dailyourbangladesh.com/${category_slug}/${newsItem?.news?._id}`
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
          onClick={() => handlePrint(index)}
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
  );
};

export default SocialShare;
