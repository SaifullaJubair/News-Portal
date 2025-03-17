import CategoryJoripSection from "@/components/frontend/CategoryNews/CategoryJoripSection";
import { BASE_URL } from "@/utils/baseURL";

export async function generateMetadata({ params }) {
  const { id } = params;

  const newsDataResponse = await fetch(`${BASE_URL}/online_jorip/${id}`, {
    next: { revalidate: 30 },
  });

  // Check if the response is okay (status code 200-299)
  if (!newsDataResponse.ok) {
    console.log("Failed to fetch news data");
  }

  // Convert the response to JSON
  const newsData = await newsDataResponse.json();
  return {
    title: newsData?.data?.online_jorip_title || "News Name",
    openGraph: {
      type: "article",
      title: newsData?.data?.online_jorip_title,
      url: `https://dailyourbangladesh.com/online_jorip/${id}`,
      images: [
        {
          url: newsData?.data?.social_image
            ? newsData?.data?.social_image
            : newsData?.data?.online_jorip_image,
          alt: newsData?.data?.online_jorip_title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: newsData?.data?.online_jorip_title,
      images: [
        newsData?.data?.social_image
          ? newsData?.data?.social_image
          : newsData?.data?.online_jorip_image,
      ],
    },
    metadataBase: new URL("https://dailyourbangladesh.com/"),
    author: {
      name: "Daily Our Bangladesh",
    },
  };
}

const NewsDetailsPage = async () => {
  return (
    <>
      <CategoryJoripSection />
    </>
  );
};

export default NewsDetailsPage;
