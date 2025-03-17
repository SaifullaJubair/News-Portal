"use client";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";

export const useGetSpecialNewsQuery = () => {
  return useQuery({
    queryKey: ["/api/v1/news/special_category_news"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/news/special_category_news`);
      const data = await res.json();

      return data;
    },
    refetchInterval: 60000, // 1 minute in milliseconds
    refetchIntervalInBackground: true, // Continue polling in the background
  });
};
