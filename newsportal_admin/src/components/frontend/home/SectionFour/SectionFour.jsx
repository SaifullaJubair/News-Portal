import { BsArrowRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const SectionFour = ({ newsData }) => {
  const categorySlug = newsData?.categoryDetails?.category_slug;
  if (!newsData?.news?.length > 0) return;

  return (
    <div className="max-w-[1400px] w-[95%] mx-auto tracking-wider">
      {/* Header with category logo and name */}
      <div className="flex items-center justify-between py-2 border-b-4 border-gray-800">
        <Link
          to={`/${categorySlug}`}
          className="text-2xl font-semibold flex items-center gap-2 hover:text-pHoverTextColor duration-100"
        >
          <img
            src={newsData?.categoryDetails?.category_logo}
            alt="category logo"
            className="w-6 h-6 sm:w-10 sm:h-8 rounded-sm"
          />
          <p>{newsData?.categoryDetails?.category_name}</p>
        </Link>

        <Link
          to={`/${categorySlug}`}
          className="hover:text-pHoverTextColor duration-100"
        >
          <BsArrowRightCircle size={24} className="font-semibold" />
        </Link>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {/* Left Column: First news item larger */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 group cursor-pointer">
            {newsData?.news?.slice(0, 1).map((item) => (
              <Link
                to={`/${categorySlug}/${item?._id}`}
                className="bg-black rounded-s-md p-2"
                key={item?._id}
              >
                <div className="cursor-pointer ">
                  <p className="font-semibold text-lg md:text-2xl  text-yellow-400 line-clamp-2">
                    {item?.heading}
                  </p>
                  <p
                    className="mt-2 text-sm text-white group-hover:text-pHoverTextColor line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></p>
                </div>
              </Link>
            ))}

            {newsData?.news?.slice(0, 1).map((item) => (
              <Link
                to={`/${categorySlug}/${item?._id}`}
                className="cursor-pointer group"
                key={item?._id}
              >
                <img
                  src={item?.main_image}
                  className="w-full h-40 sm:h-60 rounded-r-md"
                  alt="news image"
                />
              </Link>
            ))}
          </div>

          {/* Smaller news items below the first */}
          <div className="grid grid-cols-2 gap-4">
            {newsData?.news?.slice(1, 3).map((item) => (
              <Link
                to={`/${categorySlug}/${item?._id}`}
                className="cursor-pointer group"
                key={item?._id}
              >
                <img
                  src={item?.main_image}
                  className="w-full h-32 sm:h-44 rounded"
                  alt="news image"
                />
                <p className="font-semibold mt-2 text-sm sm:text-base text-pTextColor line-clamp-2 group-hover:text-pHoverTextColor">
                  {item?.heading}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column: 4 smaller news items */}
        <div className="grid grid-cols-2 gap-4">
          {newsData?.news?.slice(3, 5).map((item) => (
            <Link
              to={`/${categorySlug}/${item?._id}`}
              className="cursor-pointer group"
              key={item?._id}
            >
              <img
                src={item?.main_image}
                className="w-full h-32 sm:h-48 rounded"
                alt="news image"
              />
              <p className="mt-2 font-semibold text-sm sm:text-base text-pTextColor line-clamp-2 group-hover:text-pHoverTextColor">
                {item?.heading}
              </p>
            </Link>
          ))}
          {newsData?.news?.slice(5, 7).map((item) => (
            <Link
              to={`/${categorySlug}/${item?._id}`}
              className="cursor-pointer group mt-4"
              key={item?._id}
            >
              <img
                src={item?.main_image}
                className="w-full h-32 sm:h-44 rounded"
                alt="news image"
              />
              <p className="mt-2 font-semibold text-sm sm:text-base text-pTextColor line-clamp-2 group-hover:text-pHoverTextColor">
                {item?.heading}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <hr className="my-4" />
    </div>
  );
};

export default SectionFour;
