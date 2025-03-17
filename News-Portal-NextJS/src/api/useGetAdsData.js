"use client";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";

export const useGetAdsData = () => {
  return useQuery({
    queryKey: ["/api/v1/ads"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/ads`);
      const data = await res.json();

      return data;
    },
  });
};
