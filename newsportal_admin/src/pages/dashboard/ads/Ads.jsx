import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { PiHouseBold } from "react-icons/pi";

import { BASE_URL } from "../../../utils/baseURL";
import { useContext, useState } from "react";
import { BiSearch } from "react-icons/bi";
import BigSpinner from "../../../shared/loader/BigSpinner";
import Pagination from "../../../shared/pagination/Pagination";
import AddAds from "../../../components/admin/ads/AddAds";
import AdsTable from "../../../components/admin/ads/AdsTable";
import { AuthContext } from "../../../context/AuthProvider";
import AccessDenied from "../../../components/frontend/Shared/accessDenied/AccessDenied";
import { getCookie } from "../../../utils/cookie-storage";
import { authKey } from "../../../utils/storageKey";

const Ads = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const token = getCookie(authKey);

  const {
    data: adsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/ads/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}&role_type=ads_show`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/ads/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}&role_type=ads_show`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    }
  };
  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <div>
      {user?.role_id?.ads_show ? (
        <div>
          <div className="flex items-center justify-between bg-white p-4 rounded-xl">
            <h3 className="text-[20px] font-semibold">Ads </h3>
            <div className="flex items-center gap-2">
              <Link to="/admin">
                <p>
                  <PiHouseBold size={25} color="#3EA2FA" />
                </p>
              </Link>
              <p className="font-semibold text-xl">/</p>
              <Link to="/admin/ads">
                <p className="font-semibold">Ads</p>
              </Link>
            </div>
          </div>
          <div className="my-10 bg-white border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between p-4 gap-2">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 rounded-xl border border-[#E7E7E7] bg-gray-50 px-[5px] py-2">
                  <BiSearch className="text-[#717171]" size={20} />
                  <input
                    onKeyDown={(e) => handleSearch(e)}
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-50 bg-none w-full outline-none text-[14px] font-semibold placeholder-[#717171]"
                  />
                </div>
                <button
                  type="reset"
                  className="text-sm bg-slate-100 px-2 text-gray-700 rounded "
                  onClick={() => setSearchTerm("")}
                >
                  Reset
                </button>
              </div>
              {user?.role_id?.ads_create && (
                <button
                  className="bg-[#22CD5A] text-white px-4 py-2 rounded flex items-center gap-2"
                  onClick={() => {
                    handleOpenModal();
                  }}
                >
                  Add Ads
                </button>
              )}
            </div>
          </div>

          {/* Add Sub Category Type And Show In Table */}
          {isAddModalOpen && (
            <AddAds
              refetch={refetch}
              setIsAddModalOpen={setIsAddModalOpen}
              token={token}
            />
          )}

          {/* update delete and show deails in table */}
          <AdsTable
            adsData={adsData?.data}
            refetch={refetch}
            user={user}
            token={token}
          />
          {adsData?.totalData > 10 && (
            <Pagination
              rows={rows}
              page={page}
              setPage={setPage}
              setRows={setRows}
              totalData={adsData?.totalData}
            />
          )}
        </div>
      ) : (
        <AccessDenied />
      )}
    </div>
  );
};

export default Ads;
