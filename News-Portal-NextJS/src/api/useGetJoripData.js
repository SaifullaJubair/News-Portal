"use client";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";

// Create a custom hook
export const useGetJoripData = () => {
  return useQuery({
    queryKey: ["/api/v1/online_jorip"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/online_jorip`);
      if (!res.ok) {
        console.log("Failed to fetch jorip data");
      }
      const data = await res.json();
      return data?.data || [];
    },
  });
};
