"use client";
import { PiHouseBold } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import { BiSearch } from "react-icons/bi";
import { useContext, useState } from "react";
import Pagination from "@/shared/pagination/Pagination";
import { AuthContext } from "@/context/context";
import { getCookie } from "@/utils/cookie-storage";
import { authKey } from "@/utils/storageKey";
import { BASE_URL } from "@/utils/baseURL";
import BigSpinner from "@/shared/loader/BigSpinner";
import AccessDenied from "@/components/frontend/Shared/accessDenied/AccessDenied";
import Link from "next/link";
import TodayNewCategoryTable from "@/components/admin/todayNewsCategory/TodayNewCategoryTable";
import AddTodayNewsCategory from "@/components/admin/todayNewsCategory/AddTodayNewsCategory";

const TodayNewsCategory = () => {
  const { user } = useContext(AuthContext);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const token = getCookie(authKey);
  const {
    data: TodayNewsData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/today_news_category/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}&role_type=today_news_category_show`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/today_news_category/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}&role_type=today_news_category_show`,
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
  // console.log(TodayNewsData);

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
      {user?.role_id?.today_news_category_show ? (
        <>
          <>
            {/* Sub Category Page Navbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
              <h3 className="text-[20px] font-semibold">Today News Category</h3>
              <div className="flex items-center gap-2">
                <Link href="/admin">
                  <p>
                    <PiHouseBold size={25} color="#3EA2FA" />
                  </p>
                </Link>
                <p className="font-semibold text-xl">/</p>
                <Link href="/admin/sub_category">
                  <p className="font-semibold">Today News Category</p>
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
                      className="bg-gray-50 bg-none w-full outline-none text-base font-semibold placeholder-[#717171]"
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
                {user?.role_id?.today_news_category_create && (
                  <button
                    className="bg-[#22CD5A] text-white px-4 py-2 rounded flex items-center gap-2"
                    onClick={() => {
                      handleOpenModal();
                    }}
                  >
                    Add TodayNewsCategory
                  </button>
                )}
              </div>
            </div>
            {/* Add Sub Category Type And Show In Table */}

            {/* update delete and show deails in table */}
            {isAddModalOpen && (
              <AddTodayNewsCategory
                refetch={refetch}
                setIsAddModalOpen={setIsAddModalOpen}
                token={token}
              />
            )}

            <TodayNewCategoryTable
              TodayNewsData={TodayNewsData?.data}
              refetch={refetch}
              user={user}
              token={token}
            />
            {TodayNewsData?.totalData > 10 && (
              <Pagination
                rows={rows}
                page={page}
                setPage={setPage}
                setRows={setRows}
                totalData={TodayNewsData?.totalData}
              />
            )}
          </>
        </>
      ) : (
        <AccessDenied />
      )}
    </div>
  );
};

export default TodayNewsCategory;
