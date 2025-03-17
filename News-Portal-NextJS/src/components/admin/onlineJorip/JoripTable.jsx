"use client";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import UpdateJorip from "./UpdateJorip";
import { BASE_URL } from "@/utils/baseURL";
import NoDataFound from "@/shared/noDataFound/NoDataFound";
import Image from "next/image";

const JoripTable = ({ refetch, joripData, user, token }) => {
  const [joripUpdateModal, setJoripUpdateModal] = useState(false);
  const [joripUpdateModalValue, setJoripUpdateModalValue] = useState(false);

  const updateJoripModal = (jorip) => {
    setJoripUpdateModal(true);
    setJoripUpdateModalValue(jorip);
  };

  // delete a Jorip
  const handleDeleteJorip = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${item?.online_jorip_title} news!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: item?._id,
          image_key: item?.image_key,
        };
        try {
          const response = await fetch(`${BASE_URL}/online_jorip?role_type=online_jorip_delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(sendData),
          });
          const result = await response.json();
          // (result);
          if (result?.statusCode === 200 && result?.success === true) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${item?.online_jorip_title} news has been deleted!`,
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
      {joripData?.length > 0 ? (
        <div>
          <div className="mt-5 overflow-x-auto rounded">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Jorip Image
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Jorip Question
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Status
                  </th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {joripData?.map((item) => (
                  <tr key={item?._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      <Image
                      width={200}
                      height={200}
                        src={item?.online_jorip_image}
                        className="w-16 h-16 "
                        alt=""
                      />
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {item?.online_jorip_title}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                      {item?.online_jorip_status}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                      {user?.role_id?.online_jorip_delete ||
                      user?.role_id?.online_jorip_update ? (
                        <>
                          {user?.role_id?.online_jorip_delete && (
                            <MdDeleteForever
                              onClick={() => handleDeleteJorip(item)}
                              className="cursor-pointer text-red-500 hover:text-red-300"
                              size={25}
                            />
                          )}
                          {user?.role_id?.online_jorip_update && (
                            <FiEdit
                              onClick={() => updateJoripModal(item)}
                              className="cursor-pointer text-gray-500 hover:text-gray-300"
                              size={25}
                            />
                          )}
                        </>
                      ) : (
                        <small className="mt-3">Access Denied</small>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <NoDataFound />
      )}
      {/* Update Jorip */}
      {joripUpdateModal && (
        <UpdateJorip
          setJoripUpdateModal={setJoripUpdateModal}
          joripUpdateModalValue={joripUpdateModalValue}
          refetch={refetch}
          token={token}
        />
      )}
    </div>
  );
};

export default JoripTable;
