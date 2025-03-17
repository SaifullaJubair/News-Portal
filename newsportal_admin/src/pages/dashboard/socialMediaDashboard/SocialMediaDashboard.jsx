import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { BASE_URL } from "../../../utils/baseURL";
import { useContext, useState } from "react";
import AddSocialMedia from "../../../components/admin/socialMedia/AddSocialMedia";
import SocialMediaTable from "../../../components/admin/socialMedia/SocialMediaTable";
import { AuthContext } from "../../../context/AuthProvider";
import AccessDenied from "../../../components/frontend/Shared/accessDenied/AccessDenied";
import { authKey } from "../../../utils/storageKey";
import { getCookie } from "../../../utils/cookie-storage";

const SocialMediaDashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const token = getCookie(authKey);
  const {
    data: SocialMediaData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/social_media`],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/social_media`
        // {
        //   headers: {
        //     authorization: `Bearer ${token}`,
        //   },
        // }
      );
      const data = await res.json();
      return data?.data;
    },
  });
  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <>
      {user?.role_id?.social_media_show ? (
        <>
          <div className="flex items-center justify-between bg-white p-4 rounded-xl">
            <h3 className="text-[20px] font-semibold">Social Media</h3>
            <div className="flex items-center gap-2">
              <Link to="/admin">
                <p>
                  <PiHouseBold size={25} color="#3EA2FA" />
                </p>
              </Link>
              <p className="font-semibold text-xl">/</p>
              <Link to="/admin/social-media">
                <p className="font-semibold">Social Media</p>
              </Link>
            </div>
          </div>
          {user?.role_id?.social_media_create && (
            <div className="my-10 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center justify-end p-4 gap-2">
                <button
                  className="bg-[#22CD5A] text-white px-4 py-2 rounded flex items-center gap-2"
                  onClick={() => {
                    handleOpenModal();
                  }}
                >
                  Add Social Media
                </button>
              </div>
            </div>
          )}

          {/* update delete and show deails in table */}
          {isAddModalOpen && (
            <AddSocialMedia
              refetch={refetch}
              setIsAddModalOpen={setIsAddModalOpen}
              token={token}
            />
          )}
          <SocialMediaTable
            SocialMediaData={SocialMediaData}
            refetch={refetch}
            user={user}
          />
        </>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default SocialMediaDashboard;
