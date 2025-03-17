"use client";
// import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import UpdateStaff from "./UpdateStaff";
import { getCookie } from "@/utils/cookie-storage";
import { authKey } from "@/utils/storageKey";
import { BASE_URL } from "@/utils/baseURL";
import NoDataFound from "@/shared/noDataFound/NoDataFound";
import Image from "next/image";

const AllStaffTable = ({ refetch, staffData, roleData, isLoading, user }) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [updateModalValue, setUpdateModalValue] = useState(false);
  //   (staffData);
  const updateStaffModal = (item) => {
    setUpdateModal(true);
    setUpdateModalValue(item);
  };

  // get token
  const token = getCookie(authKey);

  // delete a Staff
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${item?.user_name} user!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: item?._id,
        };
        try {
          const response = await fetch(
            `${BASE_URL}/userReg?role_type=staff_delete`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(sendData),
            }
          );
          const result = await response.json();
          // (result);
          if (result?.statusCode === 200 && result?.success === true) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${item?.user_name} staff has been deleted!`,
              icon: "success",
            });
          } else {
            toast.error(result?.message, {
              autoClose: 1000,
            });
          }
        } catch (error) {
          toast.error("Network error or server is down", {
            autoClose: 1000,
          });
        }
      }
    });
  };

  return (
    <div>
      {/* Table for showing data */}
      {staffData?.length > 0 ? (
        <div className="mt-5 overflow-x-auto rounded">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2  text-gray-900 text-left">
                  User ID
                </th>
                <th className="whitespace-nowrap px-4 py-2  text-gray-900 text-left">
                  User Image
                </th>
                <th className="whitespace-nowrap px-4 py-2  text-gray-900 text-left">
                  User Name
                </th>
                <th className="whitespace-nowrap px-4 py-2  text-gray-900 text-left">
                  User Phone
                </th>
                <th className="whitespace-nowrap px-4 py-2  text-gray-900 text-left">
                  User Email
                </th>
                <th className="whitespace-nowrap px-4 py-2  text-gray-900 text-left">
                  User Designation
                </th>
                <th className="whitespace-nowrap px-4 py-2  text-gray-900 text-left">
                  User Division
                </th>
                <th className="whitespace-nowrap px-4 py-2  text-gray-900 text-left">
                  User District
                </th>
                <th className="whitespace-nowrap px-4 py-2  text-gray-900 text-left">
                  User Role
                </th>
                <th className="whitespace-nowrap px-4 py-2  text-gray-900 text-left">
                  Status
                </th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {staffData?.map((item) => (
                <tr key={item?._id}>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {item?.user_id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    <Image
                      className="w-16 rounded-full h-16 object-cover"
                      width={100}
                      height={100}
                      src={item?.user_image}
                      alt="user image"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {item?.user_name}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                    {item?.user_phone}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {item?.user_email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {item?.user_designation}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                    {item?.division}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                    {item?.district}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                    {item?.role_id?.role_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                    {item?.user_status}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                    {user?.role_id?.staff_delete ||
                    user?.role_id?.staff_update ? (
                      <>
                        {user?.role_id?.staff_delete && (
                          <MdDeleteForever
                            onClick={() => handleDelete(item)}
                            className="cursor-pointer text-red-500 hover:text-red-300"
                            size={25}
                          />
                        )}
                        {user?.role_id?.staff_update && (
                          <FiEdit
                            onClick={() => updateStaffModal(item)}
                            className="cursor-pointer text-gray-500 hover:text-gray-300"
                            size={25}
                          />
                        )}
                      </>
                    ) : (
                      <small>Access Denied</small>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataFound />
      )}
      {/* Update Sub Category */}
      {updateModal && (
        <UpdateStaff
          setUpdateModal={setUpdateModal}
          updateModalValue={updateModalValue}
          refetch={refetch}
          roleData={roleData}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default AllStaffTable;
