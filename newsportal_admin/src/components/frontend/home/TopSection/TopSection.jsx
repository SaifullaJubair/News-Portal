import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BASE_URL } from "../../../../utils/baseURL";
import FeatureNewsSection from "./FeatureNewsSection";
import LatestNewsSection from "./LatestNewsSection";
import TopNewsSection from "./TopNewsSection";

const TopSection = ({ topNewsAds, latestNewsAds }) => {
  const { data: latestNews = [], isLoading: latestNewsLoading } = useQuery({
    queryKey: ["/api/v1/news/latest"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/news/latest`);
      const data = await res.json();
      return data;
    },
  });

  const { data: featureNews = [], isLoading: featureNewsLoading } = useQuery({
    queryKey: ["/api/v1/news/feature"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/news/feature`);
      const data = await res.json();
      return data;
    },
    refetchInterval: 60000, // 1 minute in milliseconds
    refetchIntervalInBackground: true, // Continue polling in the background
  });

  const { data: topNews = [], isLoading: topNewsLoading } = useQuery({
    queryKey: ["/api/v1/news/top"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/news/top`);
      const data = await res.json();
      return data;
    },
    refetchInterval: 60000, // 1 minute in milliseconds
    refetchIntervalInBackground: true, // Continue polling in the background
  });

  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div className="grid lg:grid-cols-4 gap-4 md:gird-cols-3 sm:grid-cols-2 grid-cols-1 my-4">
        {/* Feature news */}
        <div className="sm:col-span-2 col-span-1">
          {featureNewsLoading ? (
            <>
              <Skeleton height={30} width={`70%`} />
              <Skeleton height={310} />
              <div className="grid grid-cols-2 gap-2 my-2">
                <Skeleton height={190} />
                <Skeleton height={190} />
              </div>
              <div className="grid grid-cols-2 gap-2 my-2">
                <Skeleton height={70} />
                <Skeleton height={70} />
              </div>
            </>
          ) : (
            <FeatureNewsSection featureNews={featureNews} />
          )}
        </div>

        {/* Top news */}
        <div className="grid grid-cols-1 gap-4">
          {topNewsLoading ? (
            <>
              <Skeleton height={160} />
              <Skeleton height={160} />
              <Skeleton height={70} />
              <Skeleton height={100} />
            </>
          ) : (
            <TopNewsSection topNews={topNews} adsData={topNewsAds} />
          )}
        </div>
        {/* Latest news */}
        <div className="grid grid-cols-1 gap-4 ">
      
          {latestNewsLoading ? (
            <Skeleton count={10} height={50} />
          ) : (
            <LatestNewsSection
              latestNews={latestNews}
              adsData={latestNewsAds}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopSection;
