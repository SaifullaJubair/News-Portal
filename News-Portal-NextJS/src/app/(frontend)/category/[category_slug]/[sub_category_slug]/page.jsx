"use client";

import SubCategoryNews from "@/components/frontend/SubCategoryNews/SubCategoryNews";
import SubCategoryNewsSkeleton from "@/shared/loader/FrontendLoader/SubCategoryNewsSkeleton";
import { BASE_URL } from "@/utils/baseURL";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SubCategoryNewsPage = () => {
  const { category_slug, sub_category_slug } = useParams();

  const [subData, setSubData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    fetch(
      `${BASE_URL}/news/category_sub_category_news/${category_slug}?sub_category_slug=${sub_category_slug}`
    )
      .then((res) => {
        if (!res.ok) {
          console.log("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setSubData(data?.data);
      })

      .finally(() => {
        setIsLoading(false);
      });
  }, [category_slug, sub_category_slug]);

  if (isLoading || !subData) return <SubCategoryNewsSkeleton />;
  // console.log(subData);
  return (
    <div>
      <SubCategoryNews
        subData={subData}
        category_slug={category_slug}
        sub_category_slug={sub_category_slug}
      />
    </div>
  );
};

export default SubCategoryNewsPage;
