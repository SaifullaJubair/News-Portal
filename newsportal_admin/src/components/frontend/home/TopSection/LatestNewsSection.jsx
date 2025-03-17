import { FaRegClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getBanglaTimeInDhaka } from "../../../common/GetBanglaTime";

const LatestNewsSection = ({ latestNews, adsData }) => {
  return (
    <div className="">
      <div className="mb-4">
        {adsData && (
          <Link to={`/${adsData?.ads_link}`}>
            <img
              src={adsData?.ads_image}
              className="w-full  h-20 rounded"
              alt="ads img"
            />
          </Link>
        )}
      </div>
      {latestNews?.data?.length > 0 && (
        <div className="max-h-[700px] border rounded overflow-y-auto scrollbar-thin pr-1 scrollbar-track-gray-50 scrollbar-thumb-primaryMediumLightColor/50 ">
          <h1 className="text-lg font-bold text-white border-l-[5px] border-primaryMediumLightColor bg-gradient-to-r from-PDeepColor to-primaryMediumLightColor rounded-lg p-2 pl-4 sticky mb-2 top-0 z-20">
            সর্বশেষ
          </h1>

          <div className="mx-4 ">
            {latestNews?.data?.map((news, index) => (
              <Link
                to={`/${news?.category_info?.category_slug}/${news?._id}`}
                className="cursor-pointer group "
                key={index}
              >
                <h1
                  className="font-extrabold mb-2 hover:text-pHoverTextColor duration-150  md:max-w-lg w-full mt-5 text-gray-900 group-hover:text-pHoverTextColor"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {news?.heading}
                </h1>
                {news?.createdAt && (
                  <p className="text-xs flex gap-2 items-center text-gray-700 my-1">
                    <FaRegClock /> {getBanglaTimeInDhaka(news?.createdAt)}
                  </p>
                )}
                <p
                  className="my-2 md:max-w-lg w-full text-sm mt-1 text-gray-600 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: news?.description }}
                ></p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestNewsSection;
