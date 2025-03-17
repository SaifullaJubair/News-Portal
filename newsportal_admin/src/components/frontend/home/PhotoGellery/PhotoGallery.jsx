import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { useState, useEffect, useRef } from "react";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const PhotoGallery = ({ special_news, adsData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const progressBarRefs = useRef([]);

  const autoplayDelay = 5000; // Autoplay delay in milliseconds

  useEffect(() => {
    if (mainSwiper) {
      mainSwiper.on("slideChange", () => {
        setActiveIndex(mainSwiper.activeIndex);
        if (thumbsSwiper && !thumbsSwiper.destroyed) {
          thumbsSwiper.slideTo(mainSwiper.activeIndex);
        }
        resetAllProgressBars();
        startProgressBar(mainSwiper.activeIndex);
      });
    }

    startProgressBar(activeIndex);

    return () => {
      clearAllProgressBars();
    };
  }, [mainSwiper, thumbsSwiper]);

  const startProgressBar = (index) => {
    if (progressBarRefs.current[index]) {
      progressBarRefs.current[
        index
      ].style.transitionDuration = `${autoplayDelay}ms`;
      progressBarRefs.current[index].style.transform = "scaleX(1)";
    }
  };

  const resetAllProgressBars = () => {
    progressBarRefs.current.forEach((bar) => {
      if (bar) {
        bar.style.transitionDuration = "0ms";
        bar.style.transform = "scaleX(0)";
      }
    });
  };

  const clearAllProgressBars = () => {
    progressBarRefs.current.forEach((bar) => {
      if (bar) {
        bar.style.transitionDuration = "0ms";
        bar.style.transform = "scaleX(0)";
      }
    });
  };

  const categorySlug = special_news?.categoryDetails?.category_slug;

  if (!special_news?.news?.length > 0) return;
  return (
    <div className="bg-gradient-to-tr from-black to-[#2B2B2B]">
      <div className="max-w-[1400px] w-[95%] mx-auto p-6">
        <Link
          to={`/${categorySlug}`}
          className="flex items-center gap-4 py-6 group"
        >
          <MdOutlinePhotoLibrary
            className="text-white group-hover:text-primaryLightColor"
            size={30}
          />
          <p className="text-xl sm:text-2xl font-semibold text-white group-hover:text-primaryLightColor">
            ফটোগ্যালারি
          </p>
          <div className="w-full h-[2px] bg-white group-hover:bg-primaryLightColor"></div>
        </Link>
        <div className="grid grid-cols-5 gap-6">
          <div className="md:col-span-4 col-span-5 relative">
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              loop={false}
              spaceBetween={10}
              navigation={{
                nextEl: ".next",
                prevEl: ".prev",
              }}
              autoplay={{
                delay: autoplayDelay,
                disableOnInteraction: false,
              }}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs, Autoplay]}
              className="mySwiper2 h-[35vh] sm:h-[65vh]"
              onSwiper={setMainSwiper}
            >
              {special_news?.news?.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="group cursor-pointer relative"
                >
                  <Link to={`/${categorySlug}/${item?._id}`}>
                    <div className="relative w-full h-full">
                      {/* Progress Bar at the Top */}
                      <div className="absolute top-0 left-0 w-full h-[4px] bg-gray-500 z-10">
                        <div
                          ref={(el) => (progressBarRefs.current[index] = el)}
                          className="h-full bg-primaryLightColor transform scaleX(0)"
                          style={{ transformOrigin: "left" }}
                        ></div>
                      </div>
                      <img
                        src={item?.main_image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full  duration-200 border-white group-hover:border-pLightColor relative border-2"
                      />
                    </div>
                    <div className="bg-black bg-opacity-50 w-full py-4 absolute bottom-0">
                      <p
                        className="text-center text-white text-lg sm:text-xl font-semibold group-hover:text-pHoverTextColor duration-150"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
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
            {/* Navigation Buttons */}
            <button
              className="prev w-10 h-10 absolute top-[43%] left-0 md:left-[10px] z-10 bg-gray-300 bg-opacity-40 hover:bg-opacity-60 rounded flex items-center justify-center transition-all duration-300"
              onClick={() => mainSwiper.slidePrev()}
            >
              <span>
                <FaAngleLeft className="text-4xl md:text-5xl p-1 text-white" />
              </span>
            </button>
            <button
              className="next w-10 h-10 absolute top-[43%] right-0 md:right-[10px] z-10 bg-gray-300 bg-opacity-40 hover:bg-opacity-60 rounded flex items-center justify-center transition-all duration-300"
              onClick={() => mainSwiper.slideNext()}
            >
              <span>
                <FaAngleRight className="text-4xl md:text-5xl font-light p-1 text-white" />
              </span>
            </button>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={false}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper mt-4 sm:h-[10vh] h-[8vh] sm:w-1/2"
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {special_news?.news?.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center"
                >
                  <img
                    src={item?.main_image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-full h-full  thumbnail-image cursor-pointer border-transparent border hover:border-pLightColor ${
                      activeIndex === index ? "active" : ""
                    }`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {adsData && (
            <div className="hidden md:block col-span-1 cursor-pointer">
              <a target="_blank" rel="noreferrer" href={`${adsData?.ads_link}`}>
                <img
                  src={adsData?.ads_image}
                  className="h-full w-full"
                  alt=""
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
