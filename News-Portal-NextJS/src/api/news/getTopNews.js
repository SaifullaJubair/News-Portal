"use client";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../utils/baseURL";

const useTopNewsQuery = () => {
  return useQuery({
    queryKey: [`/api/v1/news/top`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/news/top`);
      const data = await res.json();
      return data;
    },
  });
};

export default useTopNewsQuery;
