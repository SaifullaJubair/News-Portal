import { BsArrowRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const SectionThree = ({ newsData, adsData }) => {
  const categorySlug = newsData?.categoryDetails?.category_slug;
  if (!newsData?.news?.length > 0) return;
  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div className="flex items-center justify-between  py-2 border-b-4 border-gray-800 ">
        <Link
          to={`/${categorySlug}`}
          className="text-2xl font-semibold flex items-center gap-2 hover:text-pHoverTextColor duration-100"
        >
          <img
            src={newsData?.categoryDetails?.category_logo}
            alt=""
            className="w-6 h-6 sm:w-10 sm:h-8 rounded-sm"
          />
          <p>{newsData?.categoryDetails?.category_name}</p>
        </Link>

        <Link
          to={`/${categorySlug}`}
          className="hover:text-pHoverTextColor duration-100"
        >
          {" "}
          <BsArrowRightCircle size={24} className="font-semibold" />
        </Link>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5 py-6 ">
        <div className="cursor-pointer hover:opacity-90 px-2 border-r-0 md:border-r col-span-2">
          <div className="flex flex-col gap-3 sm:gap-5">
            {newsData?.news?.slice(0, 3)?.map((item, index) => (
              <Link
                to={`/${categorySlug}/${item?._id}`}
                key={index}
                className="grid grid-cols-5 gap-3 group cursor-pointer   border-b pb-3   sm:pb-2 "
              >
                <img
                  src={item?.main_image}
                  alt=""
                  className="rounded w-full col-span-2 h-28 sm:h-40 md:h-36 xl:h-40"
                />
                <div className=" col-span-3 space-y-1.5">
                  <p className="font-bold  text-gray-900 text-[16px]   line-clamp-2 group-hover:text-pHoverTextColor hover:text-pHoverTextColor">
                    {" "}
                    {item?.heading}
                  </p>
                  <p
                    className="text-sm text-pTextDetailsColor line-clamp-2 sm:line-clamp-4"
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/*  2nd */}

        <div className=" px-2 mt-1  ">
          {newsData?.news?.slice(3, 7)?.map((item, index) => (
            <Link
              to={`/${categorySlug}/${item?._id}`}
              className="  hover:opacity-80 cursor-pointer group"
              key={index}
            >
              <p className="font-semibold mb-1.5  text-pTextColor text-base  group-hover:text-pHoverTextColor line-clamp-2 hover:text-pHoverTextColor">
                {item?.heading}
              </p>
              <div className="grid grid-cols-5   gap-1.5 ">
                <div className="col-span-3">
                  <p
                    className="text-sm md:text-xs line-clamp-4 sm:line-clamp-6 md:line-clamp-3 text-pTextDetailsColor  "
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  />
                </div>
                <div className="col-span-2">
                  <img
                    src={item?.main_image}
                    className=" rounded-lg w-full h-24 sm:h-32 md:h-auto "
                    alt=""
                  />
                </div>
              </div>
              <div className="pt-2 ">
                <hr className="m-1" />
              </div>
            </Link>
          ))}
        </div>
        {/* 3rd */}

        {adsData && (
          <div className="hidden lg:block h-full">
            <a target="_blank" rel="noreferrer" href={`${adsData?.ads_link}`}>
            <img src={adsData?.ads_image} className="w-full h-full" alt="" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionThree;
