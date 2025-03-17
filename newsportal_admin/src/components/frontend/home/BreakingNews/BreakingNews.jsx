import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";

const BreakingNews = () => {
  const { data: breakingNews = [], isLoading: breakingNewsLoading } = useQuery({
    queryKey: ["/api/v1/news/breaking"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/news/breaking`);
      const data = await res.json();
      return data;
    },
  });

  if (breakingNewsLoading) return null;
  return (
    <>
      {breakingNews?.data?.length > 0 && (
        <div className="max-w-[1400px] w-[95%] mx-auto">
          <div className="flex">
            <div className="bg-primaryDeepColor text-white font-bold px-2 flex gap-1 justify-center items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></div>{" "}
              <h2 className="text-xs sm:text-sm md:text-md">শিরোনাম</h2>
            </div>
            <div className="bg-gradient-to-r from-PDeepColor to-pLightColor text-white font-bold pr-2  overflow-hidden w-full">
              <Marquee speed={45} pauseOnHover gradient={false}>
                {breakingNews?.data?.map((item, index) => (
                  <span key={item?._id} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-red-500 mx-2 "></div>
                    <Link
                      to={`/${item?.category_info?.category_slug}/${item?._id}`}
                      className="text-white font-bold text-xs sm:text-sm md:text-md my-1 py-1"
                    >
                      {item?.heading}
                    </Link>
                    {index < breakingNews?.data?.length - 1 && (
                      <span className="mx-2">|</span>
                    )}
                  </span>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BreakingNews;
