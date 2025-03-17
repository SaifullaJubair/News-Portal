"use client";
import { useQuery } from "@tanstack/react-query";
import { PiHouseBold } from "react-icons/pi";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/context";
import { getCookie } from "@/utils/cookie-storage";
import { authKey } from "@/utils/storageKey";
import BigSpinner from "@/shared/loader/BigSpinner";
import Link from "next/link";
import AddRole from "@/components/admin/role/AddRole";
import RoleTable from "@/components/admin/role/RoleTable";
import AccessDenied from "@/components/frontend/Shared/accessDenied/AccessDenied";
import { BASE_URL } from "@/utils/baseURL";

const StaffPermission = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  // get token
  const token = getCookie(authKey);
  const {
    data: roleData,
    isLoading,
    refetch,
  } = useQuery({
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
  // console.log(roleData);
  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <div>
      {user?.role_id?.staff_permission_show ? (
        <div>
          <div className="flex items-center justify-between bg-white p-4 rounded-xl">
            <h3 className="text-[20px] font-semibold">Role List </h3>
            <div className="flex items-center gap-2">
              <Link href="/admin">
                <p>
                  <PiHouseBold size={25} color="#3EA2FA" />
                </p>
              </Link>
              <p className="font-semibold text-xl">/</p>
              <Link href="/admin/staff-permission">
                <p className="font-semibold">Staff Permission</p>
              </Link>
            </div>
          </div>
          {user?.role_id?.staff_permission_create && (
            <div className="my-10 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center justify-end p-4 gap-2">
                <button
                  className="bg-[#22CD5A] text-white px-4 py-2 rounded flex items-center gap-2"
                  onClick={() => {
                    handleOpenModal();
                  }}
                >
                  Add New Role
                </button>
              </div>
            </div>
          )}

          {/* Add Sub Category Type And Show In Table */}
          {isAddModalOpen && (
            <AddRole
              refetch={refetch}
              setIsAddModalOpen={setIsAddModalOpen}
              token={token}
            />
          )}

          {/* update delete and show deails in table */}
          <RoleTable
            roleData={roleData}
            refetch={refetch}
            user={user}
            token={token}
          />
        </div>
      ) : (
        <AccessDenied />
      )}
    </div>
  );
};

export default StaffPermission;
