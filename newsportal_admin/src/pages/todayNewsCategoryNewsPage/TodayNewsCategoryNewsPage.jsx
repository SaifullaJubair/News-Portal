import { useQuery } from "@tanstack/react-query";
import TodayNewsCategoryNews from "../../components/frontend/TodayNewsCategoryNews/TodayNewsCategoryNews";
import { BASE_URL } from "../../utils/baseURL";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const TodayNewsCategoryNewsPage = () => {
  const { category_slug } = useParams();
  const [categoryId, setCategoryId] = useState(null);
  const { data: filterData = [], isLoading } = useQuery({
    queryKey: ["/api/v1/today_news_category"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/today_news_category`);
      const data = await res.json();
      const filterData = data?.data?.news?.filter(
        (item) => item?.news?.length > 0
      );

      setCategoryId();

      return filterData;
    },
  });
  useEffect(() => {
    if (filterData.length > 0 && category_slug) {
      const matchedCategory = filterData.find(
        (item) => item?.categoryDetails?.category_slug === category_slug
      );
      if (matchedCategory) {
        setCategoryId(matchedCategory?.categoryDetails?._id);
      }
    }
  }, [filterData, category_slug]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <TodayNewsCategoryNews
        filterData={filterData}
        categoryId={categoryId}
        category_slug={category_slug}
      />
    </div>
  );
};

export default TodayNewsCategoryNewsPage;
