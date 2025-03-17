import { useParams } from "react-router-dom";
import NewsDetails from "../../../components/frontend/newsDetails/NewsDetails";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import { LoaderOverlay } from "../../../shared/loader/MiddleLoader";
import { Helmet } from "react-helmet-async";

const NewsDetailsPage = () => {
  const { id, category } = useParams();

  const { data: newsData = [], isLoading: newsLoading } = useQuery({
    queryKey: [`/api/v1/news/${id}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/news/${id}`);
      const data = await res.json();
      return data;
    },
  });
  if (newsLoading) {
    return (
      <div>
        <LoaderOverlay />
      </div>
    );
  }
  const categoryName = newsData?.data?.news?.category_id?.category_name;
  const subCategroyInfo = newsData?.data?.news?.sub_category_id;

  return (
    <>
        <Helmet>
          {/* Open Graph (Facebook, Messenger, LinkedIn, WhatsApp) */}
          <meta
            property="og:url"
            content={`https://newsportal.classicitltd.com/${category}/${newsData?.data?.news?._id}`}
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:title"
            content={newsData?.data?.news?.heading}
          />
          <meta
            property="og:description"
            content={newsData?.data?.news?.description?.substring(
              0,
              150
            )}
          />
          <meta
            property="og:image"
            content={newsData?.data?.news?.main_image}
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="Daily Our Bangladesh" />

          {/* Twitter Cards */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@your_twitter_handle" />
          <meta
            name="twitter:title"
            content={newsData?.data?.news?.heading}
          />
          <meta
            name="twitter:description"
            content={newsData?.data?.news?.description?.substring(
              0,
              150
            )}
          />
          <meta
            name="twitter:image"
            content={newsData?.data?.news?.main_image}
          />
        </Helmet>
      <NewsDetails
        id={id}
        category_slug={category}
        initialNewsData={newsData}
        categoryName={categoryName}
        subCategroyInfo={subCategroyInfo}
      />
    </>
  );
};

export default NewsDetailsPage;
