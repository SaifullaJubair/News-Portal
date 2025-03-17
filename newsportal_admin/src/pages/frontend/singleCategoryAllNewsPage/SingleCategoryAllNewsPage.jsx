import { useLocation, useParams } from "react-router-dom";
import SingleCategoryAllNews from "../../../components/frontend/SingleCategoryAllNews/SingleCategoryAllNews";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/baseURL";

const SingleCategoryAllNewsPage = () => {
  const { category_slug } = useParams();
  const data = useLocation();
  // console.log(data);
  const [categoryData, setSubData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetch(`${BASE_URL}/news/all_category/${category_slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setSubData(data);
      })

      .finally(() => {
        setIsLoading(false);
      });
  }, [category_slug]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <SingleCategoryAllNews
        category_slug={category_slug}
        categoryData={categoryData}
      />
    </div>
  );
};

export default SingleCategoryAllNewsPage;
