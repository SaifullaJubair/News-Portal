import Pagination from "../../../shared/pagination/Pagination";
import CategoryTable from "../../../components/admin/category/CategoryTable";
import AddCategory from "../../../components/admin/category/AddCategory";
import { useContext, useState } from "react";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { Link } from "react-router-dom";
import { PiHouseBold } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";
import { AuthContext } from "../../../context/AuthProvider";
import AccessDenied from "../../../components/frontend/Shared/accessDenied/AccessDenied";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import { getCookie } from "../../../utils/cookie-storage";
import { authKey } from "../../../utils/storageKey";

const Category = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  // get token
  const token = getCookie(authKey);
  const {
    data: categoryTypes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/category/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}&role_type=category_show`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/category/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}&role_type=category_show`,
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
  // get Category type

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
      {user?.role_id?.category_show ? (
        <>
          {/* Category Page Navbar */}
          <div className="flex items-center justify-between bg-white p-4 rounded-xl">
            <h3 className="text-[20px] font-semibold">Category</h3>
            <div className="flex items-center gap-2">
              <Link to="/admin">
                <p>
                  <PiHouseBold size={25} color="#3EA2FA" />
                </p>
              </Link>
              <p className="font-semibold text-xl">/</p>
              <Link to="/admin/category">
                <p className="font-semibold">Category</p>
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
              {user?.role_id?.category_create && (
                <button
                  className="bg-[#22CD5A] text-white px-4 py-2 rounded flex items-center gap-2"
                  onClick={() => {
                    handleOpenModal();
                  }}
                >
                  Add Category
                </button>
              )}
            </div>
          </div>
          {/* Add Category Type*/}
          {isAddModalOpen && (
            <AddCategory
              refetch={refetch}
              setIsAddModalOpen={setIsAddModalOpen}
              token={token}
            />
          )}

          {/* delete and update And Show In Table  */}
          <CategoryTable
            categoryTypes={categoryTypes}
            refetch={refetch}
            user={user}
            token={token}
          />

          {/* Pagination */}
          {categoryTypes?.totalData > 10 && (
            <Pagination
              page={page}
              setPage={setPage}
              rows={rows}
              setRows={setRows}
              totalData={categoryTypes?.totalData}
            />
          )}
        </>
      ) : (
        <AccessDenied />
      )}
    </div>
  );
};

export default Category;
