"use client";
import { FcNext, FcPrevious } from "react-icons/fc";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Keyboard,
  Parallax,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "react-loading-skeleton/dist/skeleton.css";
import { BsArrowRightCircle } from "react-icons/bs";
import VideoSectionSkeleton from "@/shared/loader/FrontendLoader/VideoSectionSkeleton";
import Link from "next/link";
import { getYouTubeVideoId } from "@/helper/youtubeVideo";
import Image from "next/image";
const VideoSection = ({ special_news, specialNewsLoading }) => {
  if (specialNewsLoading) return <VideoSectionSkeleton />;
  if (!special_news?.news?.length > 0) return;

  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div className="border border-rounded pb-6">
        {/* top section */}
        <div className="flex items-center justify-between p-4">
          <Link
            href={`/${special_news?.categoryDetails?.category_slug}`}
            className="flex text-lg font-semibold items-center gap-2 hover:text-pHoverTextColor duration-150"
          >
            <Image
              src={special_news?.categoryDetails?.category_logo}
              width={40}
              height={40}
              alt=" Video Category Logo"
            />

            <h3 className="text-lg sm:text-xl">
              {special_news?.categoryDetails?.category_name}
            </h3>
          </Link>
          <div className="flex font-semibold items-center gap-2 hover:text-pHoverTextColor duration-150">
            <Link href={`/${special_news?.categoryDetails?.category_slug}`}>
              <BsArrowRightCircle size={24} className="font-semibold" />
            </Link>
          </div>
        </div>

        <div className="mx-4 relative">
          <Swiper
            modules={[
              Navigation,
              Pagination,
              Scrollbar,
              A11y,
              Keyboard,
              Parallax,
            ]}
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1440: {
                slidesPerView: 4,
              },
            }}
            speed={600}
            parallax={true}
            navigation={{
              nextEl: ".next-rtp",
              prevEl: ".prev-rtp",
            }}
            loop={true}
            keyboard={{ enabled: true }}
          >
            {special_news?.news?.map((video, index) => (
              <SwiperSlide
                key={index}
                className="bg-white p-2.5 border rounded hover:opacity-90"
                style={{
                  width: "100%",
                }}
              >
                <Link
                  href={`/${special_news?.categoryDetails?.category_slug}/${video?._id}`}
                >
                  <div className="aspect-w-16 aspect-h-10">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                        video?.video_link
                      )}`}
                      title={video?.heading}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="mt-4">
                    <h3 className=" tracking-wide font-semibold hover:text-pHoverTextColor duration-150 line-clamp-1">
                      {video?.heading}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className=" ">
            <button className="prev-rtp w-10 h-10 z-10 text-black bg-white hover:bg-gray-100 rounded-full  flex items-center justify-center transition-all duration-300 absolute top-[40%] -left-2 border-pLightColor border-2 ">
              <FcPrevious className="text-xl md:text-2xl p-1 font-light " />
            </button>

            <button className="next-rtp w-10 h-10 z-10 bg-white hover:bg-gray-100 rounded-full  shadow-sm flex items-center justify-center transition-all duration-300 absolute top-[40%] -right-2 border-pLightColor border-2">
              <FcNext className="text-xl md:text-2xl p-1 font-light" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
