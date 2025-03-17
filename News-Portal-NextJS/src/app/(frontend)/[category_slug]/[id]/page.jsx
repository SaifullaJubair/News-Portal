import NewsDetails from "@/components/frontend/newsDetails/NewsDetails";
import { BASE_URL } from "@/utils/baseURL";

export async function generateMetadata({ params }) {
  const { id, category_slug } = params;

  const newsDataResponse = await fetch(`${BASE_URL}/news/${id}`, {
    next: { revalidate: 30 },
  });

  // Check if the response is okay (status code 200-299 )
  if (!newsDataResponse.ok) {
    console.log("Failed to fetch news data");
  }

  // Convert the response to JSON
  const newsData = await newsDataResponse.json();
  return {
    title: newsData?.data?.news?.heading || "News Name",
    description: newsData?.data?.news?.meta_description || "News Description",
    openGraph: {
      type: "article",
      title: newsData?.data?.news?.heading,
      description: newsData?.data?.news?.meta_description,
      url: `https://dailyourbangladesh.com/${category_slug}/${id}`,
      images: [
        {
          url: newsData?.data?.news?.social_image
            ? newsData?.data?.news?.social_image
            : newsData?.data?.news?.main_image,
          alt: newsData?.data?.news?.heading,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: newsData?.data?.news?.heading,
      description: newsData?.data?.news?.meta_description,
      images: [
        newsData?.data?.news?.social_image
          ? newsData?.data?.news?.social_image
          : newsData?.data?.news?.main_image,
      ],
    },
    metadataBase: new URL("https://dailyourbangladesh.com/"),
    author: {
      name: "Daily Our Bangladesh",
    },
  };
}

const NewsDetailsPage = async ({ params }) => {
  const { category_slug, id } = params;

  const newsDataResponse = await fetch(`${BASE_URL}/news/${id}`, {
    next: { revalidate: 30 },
  });

  // Check if the response is okay (status code 200-299)
  if (!newsDataResponse.ok) {
    console.log("Failed to fetch news data");
  }

  // Convert the response to JSON
  const newsData = await newsDataResponse.json();

  const categoryName = newsData?.data?.news?.category_id?.category_name;
  const subCategroyInfo = newsData?.data?.news?.sub_category_id;

  return (
    <>
      <NewsDetails
        id={id}
        category_slug={category_slug}
        initialNewsData={newsData}
        categoryName={categoryName}
        subCategroyInfo={subCategroyInfo}
      />
    </>
  );
};

export default NewsDetailsPage;
