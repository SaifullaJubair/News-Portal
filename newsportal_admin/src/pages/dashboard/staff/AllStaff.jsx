import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { PiHouseBold } from "react-icons/pi";
import { BASE_URL } from "../../../utils/baseURL";
import { useContext, useState } from "react";
import { BiSearch } from "react-icons/bi";
import BigSpinner from "../../../shared/loader/BigSpinner";
import Pagination from "../../../shared/pagination/Pagination";
import AddStaff from "../../../components/admin/staff/AddStaff";
import AllStaffTable from "../../../components/admin/staff/AllStaffTable";
import { getCookie } from "../../../utils/cookie-storage";
import { authKey } from "../../../utils/storageKey";
import { AuthContext } from "../../../context/AuthProvider";
import AccessDenied from "../../../components/frontend/Shared/accessDenied/AccessDenied";

const AllStaff = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  // get token
  const token = getCookie(authKey);

  const {
    data: staffData,
    isLoading: isLoadingStaff,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/userReg?page=${page}&limit=${rows}&searchTerm=${searchTerm}&role_type=staff_show`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/userReg?page=${page}&limit=${rows}&searchTerm=${searchTerm}&role_type=staff_show`,
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
  // console.log(staffData);
  // Role data fetch
  const { data: roleData, isLoading } = useQuery({
    queryKey: [`/api/v1/role?role_type=staff_permission_show`],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/role?role_type=staff_permission_show`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data?.data;
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
  if (isLoadingStaff) {
    return <BigSpinner />;
  }

  return (
    <div>
      {user?.role_id?.staff_show ? (
        <div>
          <div className="flex items-center justify-between bg-white p-4 rounded-xl">
            <h3 className="text-[20px] font-semibold">All Staff List </h3>
            <div className="flex items-center gap-2">
              <Link to="/admin">
                <p>
                  <PiHouseBold size={25} color="#3EA2FA" />
                </p>
              </Link>
              <p className="font-semibold text-xl">/</p>
              <Link to="/admin/all-staff">
                <p className="font-semibold">All Staff</p>
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
              {user?.role_id?.staff_create && (
                <button
                  className="bg-[#22CD5A] text-white px-4 py-2 rounded flex items-center gap-2"
                  onClick={() => {
                    handleOpenModal();
                  }}
                >
                  Add New Staff
                </button>
              )}
            </div>
          </div>

          {/* Add Sub Category Type And Show In Table */}
          {isAddModalOpen && (
            <AddStaff
              refetch={refetch}
              setIsAddModalOpen={setIsAddModalOpen}
              roleData={roleData}
              isLoading={isLoading}
            />
          )}

          <AllStaffTable
            staffData={staffData?.data}
            refetch={refetch}
            rows={rows}
            page={page}
            setPage={setPage}
            setRows={setRows}
            roleData={roleData}
            isLoading={isLoading}
            user={user}
          />
          {/* Pagination */}
          {staffData?.totalData > 10 && (
            <Pagination
              rows={rows}
              page={page}
              setPage={setPage}
              setRows={setRows}
              totalData={staffData?.totalData}
            />
          )}
        </div>
      ) : (
        <AccessDenied />
      )}
    </div>
  );
};

export default AllStaff;
