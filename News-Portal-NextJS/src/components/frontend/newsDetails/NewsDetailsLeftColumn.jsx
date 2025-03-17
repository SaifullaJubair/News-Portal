import { getYouTubeVideoId } from "@/helper/youtubeVideo";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import ReactPlayer from "react-player";

const NewsDetailsLeftColumn = ({
  index,
  newsItem,
  categoryName,
  category_slug,
  subCategroyInfo,
  ad19,
  ad20,
  adsLoading,
}) => {
  return (
    <div className="space-y-3 hidden  lg:block col-span-2">
      {index === 0 && (
        <>
          <div className="flex gap-2 items-center ">
            <Link href="/" className="hover:text-PDeepColor text-pTextColor">
              <FaHome size={18} />
            </Link>
            <Link
              href={`/${category_slug}`}
              className="hover:text-PDeepColor font-semibold text-pTextColor"
            >
              / {categoryName}
            </Link>
            {subCategroyInfo && (
              <Link
                href={`/${subCategroyInfo?.sub_category_slug}`}
                className="hover:text-PDeepColor font-semibold text-[#00954c]"
              >
                / {subCategroyInfo?.sub_category_name}
              </Link>
            )}
          </div>

          <hr />
        </>
      )}
      <div className="border rounded">
        <div>
          {newsItem?.sideNews?.map((item) => (
            <Link
              href={`/${category_slug}/${item?._id}`}
              className="grid grid-cols-5 my-4 mx-1.5 gap-1 cursor-pointer hover:opacity-90 p-2 rounded shadow group"
              key={item?._id}
            >
              {item?.video_link ? (
                <div className=" col-span-2">
                  <iframe
                    className="w-full h-20 rounded"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      item?.video_link
                    )}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
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
                  height="50px col-span-2"
                />
              )}

              <div className="col-span-3">
                <p className="font-semibold text-pTextColor ml-2 text-base line-clamp-3 group-hover:text-pHoverTextColor col-span-3">
                  {item?.heading}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {!adsLoading && ad19 && index === 0 && (
        <div className="my-6 no-print">
          <a target="_blank" rel="noreferrer" href={`${ad19?.ads_link}`}>
            <img src={ad19?.ads_image} alt="" />
          </a>
        </div>
      )}
      {!adsLoading && ad20 && index === 0 && (
        <div className="my-6 no-print">
          <a target="_blank" rel="noreferrer" href={`${ad20?.ads_link}`}>
            <img src={ad20?.ads_image} alt="" />
          </a>
        </div>
      )}
    </div>
  );
};

export default NewsDetailsLeftColumn;
