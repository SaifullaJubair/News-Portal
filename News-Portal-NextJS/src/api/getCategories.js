// src/data/useCategoryTypesQuery.js
"use client";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../utils/baseURL";

const useCategoryTypesQuery = (page, rows, searchTerm) => {
  return useQuery({
    queryKey: [
      `/api/v1/category/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/category/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`
        // {
        //   headers: {
        //     authorization: `Bearer ${token}`,
        //   },
        // }
      );
      const data = await res.json();
      return data;
    },
  });
};

export default useCategoryTypesQuery;
