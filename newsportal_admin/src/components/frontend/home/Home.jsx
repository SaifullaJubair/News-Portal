// import moment from "moment/moment";
import { useQuery } from "@tanstack/react-query";
import PhotoGallery from "./PhotoGellery/PhotoGallery";
import SectionFive from "./SectionFive/SectionFive";
import SectionFour from "./SectionFour/SectionFour";
import SectionOne from "./SectionOne/SectionOne";
import SectionSeven from "./SectionSeven/SectionSeven";
import SectionSix from "./SectionSix/SectionSix";
import SectionThree from "./SectionThree/SectionThree";
import TopSection from "./TopSection/TopSection";
import { useEffect } from "react";
import { BASE_URL } from "../../../utils/baseURL";
import VideoSection from "./VideoSection/VideoSection";
import SectionNine from "./SectionNine/SectionNine";
import SectionTen from "./SectionTen/SectionTen";
import GridCategoryNews2 from "./GridCategoryNews/GridCategoryNews2";
import SectionEleven from "./SectionEleven/SectionEleven";
import GridCategoryNews from "./GridCategoryNews/GridCategoryNews";

const Home = () => {
  const { data: joripData = [], refetch } = useQuery({
    queryKey: ["/api/v1/online_jorip"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/online_jorip`);
      const data = await res.json();
      return data?.data;
    },
  });

  const { data: special_news = [], isLoading: specialNewsLoading } = useQuery({
    queryKey: ["/api/v1/news/special_category_news"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/news/special_category_news`);
      const data = await res.json();

      return data;
    },
    refetchInterval: 60000, // 1 minute in milliseconds
    refetchIntervalInBackground: true, // Continue polling in the background
  });
  const { data: adsData = [], isLoading: adsLoading } = useQuery({
    queryKey: ["/api/v1/ads"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/ads`);
      const data = await res.json();

      return data;
    },
  });

  const { data: news = [], isLoading: newsLoading } = useQuery({
    queryKey: ["/api/v1/news"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/news`);
      const data = await res.json();

      return data;
    },
    refetchInterval: 60000, // 1 minute in milliseconds
    refetchIntervalInBackground: true, // Continue polling in the background
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // ads find by ads serial start
  const ad1 = adsData?.data?.find((item) => item?.ads_serial == "1");
  const ad2 = adsData?.data?.find((item) => item?.ads_serial == "2");
  const ad3 = adsData?.data?.find((item) => item?.ads_serial == "3");
  const ad4 = adsData?.data?.find((item) => item?.ads_serial == "4");
  const ad5 = adsData?.data?.find((item) => item?.ads_serial == "5");
  const ad6 = adsData?.data?.find((item) => item?.ads_serial == "6");
  const ad7 = adsData?.data?.find((item) => item?.ads_serial == "7");
  const ad8 = adsData?.data?.find((item) => item?.ads_serial == "8");
  const ad9 = adsData?.data?.find((item) => item?.ads_serial == "9");
  const ad10 = adsData?.data?.find((item) => item?.ads_serial == "10");
  const ad11 = adsData?.data?.find((item) => item?.ads_serial == "11");
  const ad12 = adsData?.data?.find((item) => item?.ads_serial == "12");
  const ad13 = adsData?.data?.find((item) => item?.ads_serial == "13");
  const ad14 = adsData?.data?.find((item) => item?.ads_serial == "14");
  const ad15 = adsData?.data?.find((item) => item?.ads_serial == "15");
  const ad16 = adsData?.data?.find((item) => item?.ads_serial == "16");
  const ad17 = adsData?.data?.find((item) => item?.ads_serial == "17");
  const ad18 = adsData?.data?.find((item) => item?.ads_serial == "18");
  // ads find by ads serial end

  // news find by category serial end
  return (
    <div className="tracking-wide  ">
      <div className="space-y-4 mb-6 ">
        <TopSection topNewsAds={ad1} latestNewsAds={ad2} />

        <VideoSection
          special_news={special_news?.data?.[1]}
          specialNewsLoading={specialNewsLoading}
        />
        {!newsLoading && !adsLoading && ad3 && (
          <div className="flex item-center justify-center ">
            <a target="_blank" rel="noreferrer" href={`${ad3?.ads_link}`}>
              <img src={ad3?.ads_image} alt="" />
            </a>
          </div>
        )}

        <>
          {/* Online Jorip and Peoplle History */}
          {newsLoading ? null : (
            <GridCategoryNews
              joripData={joripData}
              newsData2ndCol={news?.data?.[0]}
              refetch={refetch}
            />
          )}
          {!newsLoading && !adsLoading && ad4 && (
            <div className="flex item-center justify-center ">
              <a target="_blank" rel="noreferrer" href={`${ad4?.ads_link}`}>
                <img src={ad4?.ads_image} alt="" />
              </a>
            </div>
          )}
          {/* OnlineJorip end*/}
          {/* National */}
          <SectionOne
            newsData={news?.data?.[1]}
            adsData={ad5}
            newsLoading={newsLoading}
          />
          {!newsLoading && !adsLoading && ad6 && (
            <div className="flex item-center justify-center ">
              <a target="_blank" rel="noreferrer" href={`${ad6?.ads_link}`}>
                <img src={ad6?.ads_image} alt="" />
              </a>
            </div>
          )}
          {/* Politics */}
          {newsLoading ? null : <SectionFive newsData={news?.data?.[2]} />}
          {!newsLoading && !adsLoading && ad7 && (
            <div className="flex item-center justify-center ">
              <a target="_blank" rel="noreferrer" href={`${ad7?.ads_link}`}>
                <img src={ad7?.ads_image} alt="" />
              </a>
            </div>
          )}

          {/* Country news */}
          {newsLoading ? null : (
            <SectionNine
              newsData={news?.data?.[3]?.news}
              newsLoading={newsLoading}
              categoryData={news?.data?.[3]}
              ad8={ad8}
              ad9={ad9}
            />
          )}
          {!newsLoading && !adsLoading && ad10 && (
            <div className="flex item-center justify-center ">
              <a target="_blank" rel="noreferrer" href={`${ad10?.ads_link}`}>
                <img src={ad10?.ads_image} alt="" />
              </a>
            </div>
          )}

          {/* World News */}
          {newsLoading ? null : <SectionFour newsData={news?.data?.[4]} />}

          {!newsLoading && !adsLoading && ad11 && (
            <div className="flex item-center justify-center ">
              <a target="_blank" rel="noreferrer" href={`${ad11?.ads_link}`}>
                <img src={ad11?.ads_image} alt="" />
              </a>
            </div>
          )}
          {/* Sports */}
          {newsLoading ? null : (
            <SectionTen newsData={news?.data?.[5]} adsData={ad12} />
          )}

          {!newsLoading && !adsLoading && ad13 && (
            <div className="flex item-center justify-center ">
              <a target="_blank" rel="noreferrer" href={`${ad13?.ads_link}`}>
                <img src={ad13?.ads_image} alt="" />
              </a>
            </div>
          )}
          {/* Entertainment */}
          {newsLoading ? null : (
            <SectionSix newsData={news?.data?.[6]} adsData={ad14} />
          )}
          {!newsLoading && !adsLoading && ad15 && (
            <div className="flex item-center justify-center ">
              <a target="_blank" rel="noreferrer" href={`${ad15?.ads_link}`}>
                <img src={ad15?.ads_image} alt="" />
              </a>
            </div>
          )}
          {/* Education */}

          {newsLoading ? null : <SectionSeven newsData={news?.data?.[7]} />}

          {/* Business */}
          {newsLoading ? null : (
            <SectionThree newsData={news?.data?.[8]} adsData={ad16} />
          )}

          {/* Health */}
          {newsLoading ? null : (
            <SectionEleven
              newsData={news?.data?.[9]?.news}
              newsLoading={newsLoading}
              categoryData={news?.data?.[9]}
              adsData={ad17}
            />
          )}
          {/* optional */}
          {/* {newsLoading ? null : (
            <SectionTwo
              newsData={news?.data?.[0]?.news}
              newsLoading={newsLoading}
              categoryData={news?.data?.[0]}
            />
          )} */}

          {newsLoading ? null : (
            <GridCategoryNews2
              newsData1stCol={news?.data?.[10]}
              newsData2ndCol={news?.data?.[11]}
              newsData3rdCol={news?.data?.[12]}
              newsData4thCol={news?.data?.[13]}
            />
          )}
          {/*   <SectionEight
            newsData={news?.data?.[1]?.news}
            newsLoading={newsLoading}
            categoryData={news?.data?.[1]}
          /> */}
        </>
      </div>

      {specialNewsLoading ? null : (
        <div className="mb-20">
          <PhotoGallery special_news={special_news?.data?.[0]} adsData={ad18} />
        </div>
      )}
    </div>
  );
};

export default Home;
