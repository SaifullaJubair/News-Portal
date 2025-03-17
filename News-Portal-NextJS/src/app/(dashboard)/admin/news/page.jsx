"use client";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/shared/pagination/Pagination";
import { getCookie } from "@/utils/cookie-storage";
import { authKey } from "@/utils/storageKey";
import { BASE_URL } from "@/utils/baseURL";
import BigSpinner from "@/shared/loader/BigSpinner";
import AccessDenied from "@/components/frontend/Shared/accessDenied/AccessDenied";
import Link from "next/link";
import AddNews from "@/components/admin/news/AddNews";
import NewsTable from "@/components/admin/news/NewsTable";
import { AuthContext } from "@/context/context";
import { PiHouseBold } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";

const News = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const token = getCookie(authKey);
  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * rows;
    setSerialNumber(newSerialNumber);
  }, [page, rows]);
  //***Get All Data Start***
  // Category data
  const { data: categoryData = [], isLoading: isLoadingCategory } = useQuery({
    queryKey: [`/api/v1/category/dashboard?role_type=category_show`],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/category/dashboard?role_type=category_show`,
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
  // Sub category data
  const { data: subCategoryData = [], isLoading: isLoadingSubCategory } =
    useQuery({
      queryKey: [`/api/v1/sub_category/dashboard?role_type=sub_category_show`],
      queryFn: async () => {
        const res = await fetch(
          `${BASE_URL}/sub_category/dashboard?role_type=sub_category_show`,
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
  // Today News Category
  const { data: todayNewsData = [], isLoading: isLoadingTodayNews } = useQuery({
    queryKey: [
      `/api/v1/today_news_category/dashboard?role_type=today_news_category_show`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/today_news_category/dashboard?role_type=today_news_category_show`,
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

  // News Data
  const {
    data: newsData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/news/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}&role_type=news_show`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/news/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}&role_type=news_show`,
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

  // ***Get All Data End***

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
    <>
      {user?.role_id?.news_show ? (
        <>
          {/* News Page Navbar */}
          <div className="flex items-center justify-between bg-white p-4 rounded-xl">
            <h3 className="text-[20px] font-semibold">News</h3>
            <div className="flex items-center gap-2">
              <Link href="/admin">
                <p>
                  <PiHouseBold size={25} color="#3EA2FA" />
                </p>
              </Link>
              <p className="font-semibold text-xl">/</p>
              <Link href="/admin/news">
                <p className="font-semibold">News</p>
              </Link>
            </div>
          </div>

          {/* Search and create */}

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
              {user?.role_id?.news_create && (
                <button
                  className="bg-[#22CD5A] text-white px-4 py-2 rounded flex items-center gap-2"
                  onClick={() => {
                    handleOpenModal();
                  }}
                >
                  Add News
                </button>
              )}
            </div>
          </div>
          {/* Add Category Type*/}
          {isAddModalOpen && (
            <AddNews
              categoryData={categoryData}
              isLoadingCategory={isLoadingCategory}
              subCategoryData={subCategoryData}
              isLoadingSubCategory={isLoadingSubCategory}
              todayNewsData={todayNewsData}
              isLoadingTodayNews={isLoadingTodayNews}
              newsData={newsData}
              refetch={refetch}
              setIsAddModalOpen={setIsAddModalOpen}
              token={token}
            />
          )}

          {/* delete and update And Show In Table  */}
          <NewsTable
            categoryData={categoryData}
            subCategoryData={subCategoryData}
            todayNewsData={todayNewsData}
            isLoadingCategory={isLoadingCategory}
            isLoadingSubCategory={isLoadingSubCategory}
            isLoadingTodayNews={isLoadingTodayNews}
            newsData={newsData}
            refetch={refetch}
            user={user}
            token={token}
            serialNumber={serialNumber}
          />

          {/* Pagination */}
          {newsData?.totalData > 10 && (
            <Pagination
              page={page}
              setPage={setPage}
              rows={rows}
              setRows={setRows}
              totalData={newsData?.totalData}
            />
          )}
        </>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default News;
