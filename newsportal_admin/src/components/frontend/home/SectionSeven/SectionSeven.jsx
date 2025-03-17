import { BsArrowRightCircle } from "react-icons/bs";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Keyboard,
  Parallax,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
import { FcNext, FcPrevious } from "react-icons/fc";
import { layer3 } from "../../../../utils/ImageImport";
import { Link } from "react-router-dom";
const SectionSeven = ({ newsData }) => {
  const categorySlug = newsData?.categoryDetails?.category_slug;

  if (!newsData?.news?.length > 0) return null;
  return (
    <div
      className=" py-10 "
      style={{
        background: `linear-gradient(0deg, #151515eb 15%, rgba(6, 6, 6, 0) 100%) , url(${layer3})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1400px] w-[95%] mx-auto">
        <div className="flex items-center justify-between  py-2 border-b-4 border-white  ">
          <Link
            to={`/${categorySlug}`}
            className="text-2xl font-semibold flex items-center gap-2  group"
          >
            <img
              src={newsData?.categoryDetails?.category_logo}
              alt=""
              className="w-10 h-8 rounded-sm group-hover:text-pHoverTextColor duration-100"
            />

            <p className="text-white group-hover:text-pHoverTextColor duration-100">
              {" "}
              {newsData?.categoryDetails?.category_name}
            </p>
          </Link>

          <Link
            to={`/${categorySlug}`}
            className="hover:text-pHoverTextColor text-white duration-100"
          >
            {" "}
            <BsArrowRightCircle size={24} className="font-semibold" />
          </Link>
        </div>
        <div className="mt-4 relative">
          <Swiper
            modules={[
              Navigation,
              Pagination,
              Scrollbar,
              A11y,
              Autoplay,
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
            // navigation={{
            //   nextEl: ".next-rtp",
            //   prevEl: ".prev-rtp",
            // }}
            // pagination={{
            //   type: "progressbar",
            // }}
            navigation={{
              nextEl: ".next-rtp",
              prevEl: ".prev-rtp",
            }}
            loop={true}
            //  autoplay={{
            //    delay: 3000,
            //  }}
            keyboard={{ enabled: true }}
          >
            {newsData?.news?.slice(0, 10)?.map((item, index) => (
              <SwiperSlide
                key={index}
                className="bg-white p-4 border rounded cursor-pointer hover:opacity-90 group"
                style={{
                  width: "100%",
                }}
              >
                <Link to={`/${categorySlug}/${item?._id}`}>
                  <img
                    src={item?.main_image}
                    className="border-x-2 border-primaryMediumLightColor border-t-2 rounded w-full h-[200px] object-cover"
                    alt=""
                  />
                  <div className="mt-2">
                    <p
                      className="font-semibold  text-pTextColor text-[16px] md:text-[14px] group-hover:text-pHoverTextColor"
                      style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item?.heading}
                    </p>
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
          {/* {newsVideos.length > 1 && (
          <div className="flex items-center justify-center pt-4">
            <div className="flex gap-[4px]">
              <button className="prev-rtp w-10 h-10 z-10 bg-white hover:bg-opacity-50 rounded-full border flex items-center justify-center transition-all duration-300">
                <FcPrevious className="text-xl md:text-2xl p-1 font-light" />
              </button>
              <button className="next-rtp w-10 h-10 z-10 bg-white hover:bg-opacity-50 rounded-full border shadow-sm flex items-center justify-center transition-all duration-300">
                <FcNext className="text-xl md:text-2xl p-1 font-light" />
              </button>
            </div>
          </div>
        )} */}
        </div>
      </div>
    </div>
  );
};

export default SectionSeven;
