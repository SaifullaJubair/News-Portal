"use client";

import { LoaderOverlay } from "@/shared/loader/MiddleLoader";
import { BASE_URL } from "@/utils/baseURL";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";

const SocialMedia = () => {
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocialMediaData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/social_media`);
        if (!response.ok) {
          console.log("Failed to fetch social media data");
        }
        const data = await response.json();
        setSocialMediaData(data.data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialMediaData();
  }, []);

  if (loading) {
    return <LoaderOverlay />;
  }

  return (
    <div className="max-w-[1400px] mx-auto w-[95%]">
      <div className="flex items-center my-4 gap-2 text-sm">
        <Link href="/">
          <FaHome size={20} />
        </Link>{" "}
        <span>/</span>
        <Link href="/social-media" className="font-semibold text-lg">
          সোশ্যাল মিডিয়া
        </Link>
      </div>

      <div className="my-10">
        <h2 className="text-xl font-bold mb-4">সোশ্যাল মিডিয়া</h2>
        {socialMediaData.map((media) => (
          <div key={media._id} className="media-section mb-8">
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-semibold">{media.media_name}</h3>
            </div>
            <div className="media-links flex flex-wrap gap-10">
              {media.media_page_link.map((link) => (
                <div
                  className="flex gap-2 items-center group mb-2"
                  key={link._id}
                >
                  <img
                    src={media.media_image}
                    alt={media.media_name}
                    className="w-8 h-8  group-hover:text-blue-600 "
                  />
                  <a
                    href={link.link_url}
                    className="media-link inline-block    rounded group-hover:text-blue-600 text-gray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.link_title}
                  </a>
                </div>
              ))}
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
