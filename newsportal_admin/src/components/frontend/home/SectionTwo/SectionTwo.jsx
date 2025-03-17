import { BsArrowRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import LatestNews from "../../latestNews/LatestNews";

const SectionTwo = ({ categoryData, newsData }) => {
  console.log(categoryData);
  const categorySlug = categoryData?.categoryDetails?.category_slug;
  if (!newsData?.length > 0) return;
  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div className="flex items-center justify-between  py-2 border-b-4 border-gray-800 ">
        <Link
          to={`/${categorySlug}`}
          className="text-2xl font-semibold flex items-center gap-2 hover:text-pHoverTextColor duration-100"
        >
          <img
            src={categoryData?.categoryDetails?.category_logo}
            alt=""
            className="w-6 h-6 sm:w-10 sm:h-8 rounded-sm"
          />

          <p> {categoryData?.categoryDetails?.category_name}</p>
        </Link>

        <Link
          to={`/${categorySlug}`}
          className="hover:text-pHoverTextColor duration-100"
        >
          {" "}
          <BsArrowRightCircle size={24} className="font-semibold" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-10 gap-6 ">
        <div className="md:col-span-3 mt-6">
          {newsData?.slice(0, 2).map((item, index) => (
            <Link
              to={`/${categorySlug}/${item?._id}`}
              key={index}
              className="cursor-pointer hover:opacity-90 px- group"
            >
              <img
                src={item?.main_image}
                alt=""
                className="rounded-lg  w-full"
              />
              <div className="p-2">
                <p className="font-semibold pb-3 text-pTextColor text-[16px]  group-hover:text-pHoverTextColor hover:text-pHoverTextColor line-clamp-2">
                  {item?.heading}
                </p>
                <p
                  className="text-sm line-clamp-2 text-pTextDetailsColor"
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
              </div>
            </Link>
          ))}
        </div>

        <div className="md:col-span-2">
          {newsData?.slice(2, 5)?.map((item, index) => (
            <Link
              to={`${categorySlug}/${item?._id}`}
              className=" cursor-pointer group px-2"
              key={index}
            >
              <div className="relative">
                <img
                  src={item?.main_image}
                  className="rounded-lg w-full"
                  alt=""
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg duration-300"></div>
              </div>
              <div className="py-1">
                <p
                  className="font-semibold text-pTextColor pt-2 text-[14px] group-hover:text-pHoverTextColor hover:text-pHoverTextColor"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item?.heading}
                </p>
                <hr className="m-1" />
              </div>
            </Link>
          ))}
        </div>
        <div className="md:col-span-2">
          {newsData?.slice(5, 8).map((item, index) => (
            <Link
              to={`${categorySlug}/${item?._id}`}
              className=" cursor-pointer group px-2"
              key={index}
            >
              <div className="relative">
                <img
                  src={item?.main_image}
                  className="rounded-lg w-full"
                  alt=""
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg duration-300"></div>
              </div>
              <div className="py-1">
                <p
                  className="font-semibold text-pTextColor pt-2 text-[14px] group-hover:text-pHoverTextColor hover:text-pHoverTextColor"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item?.heading}
                </p>
                <hr className="m-1" />
              </div>
            </Link>
          ))}
        </div>
        {/* Right Side */}

        <div className="md:col-span-3 hidden md:block">
          <LatestNews />
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
