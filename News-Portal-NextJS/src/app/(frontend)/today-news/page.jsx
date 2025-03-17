"use client";
import TodayNews from "@/components/frontend/TodayNews/TodayNews";
import TodayNewsPageSkeleton from "@/shared/loader/FrontendLoader/TodayNewsPageSkeleton";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const TodayNewsPage = () => {
  const { data: filterData = [], isLoading } = useQuery({
    queryKey: ["/api/v1/today_news_category"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/today_news_category`);
      const data = await res.json();
      const filterData = data?.data?.news?.filter(
        (item) => item?.news?.length > 0
      );
      return filterData;
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <TodayNewsPageSkeleton />;
  return <TodayNews filterData={filterData} />;
};

export default TodayNewsPage;
