"use client";
import { FaHome } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import LatestNews from "../../../components/frontend/latestNews/LatestNews";
import { getBanglaTimeInDhaka } from "../../common/GetBanglaTime";

const SingleCategoryAllNews = ({ categoryData, category_slug }) => {
  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div className="flex items-center my-4 gap-2 text-sm">
        <Link to="/">
          <FaHome />
        </Link>{" "}
        <span>/</span>
        <Link to="/all-news" className="font-semibold ">
          সর্বশেষ সব খবর
        </Link>
        <span>/</span>
        <NavLink to={`/all-news/${category_slug}`} className="font-semibold ">
          {category_slug}
        </NavLink>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="cols-span-1 sm:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-4">
            {categoryData?.data?.slice(0, 19).map((item) => (
              <div key={item?._id} className="">
                <Link to={`/${item?._id}`}>
                  <div className="flex  my-4 gap-2.5 tracking-wide">
                    <img
                      src={item?.main_image}
                      alt=""
                      className="w-32 h-20 rounded"
                    />
                    <div>
                      <p className="text-sm font-semibold text-pTextColor line-clamp-2">
                        {item?.heading}
                      </p>
                      {item?.createdAt && (
                        <p className="text-xs text-pTextColor mt-1.5">
                          {getBanglaTimeInDhaka(item?.createdAt)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center my-8">
            {" "}
            <button className="border px-4 py-2 font-semibold text-white bg-primaryMediumLightColor hover:bg-primaryLightColor rounded text-center  ">
              আরও
            </button>
          </div>
        </div>
        {/* Latest news */}
        <LatestNews />
      </div>
    </div>
  );
};

export default SingleCategoryAllNews;
