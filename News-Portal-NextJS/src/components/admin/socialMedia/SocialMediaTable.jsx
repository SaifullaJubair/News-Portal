"use client";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import UpdateSocialMedia from "./UpdateSocialMedia";
import { RxCross1 } from "react-icons/rx";
import { getCookie } from "@/utils/cookie-storage";
import { authKey } from "@/utils/storageKey";
import { BASE_URL } from "@/utils/baseURL";
import NoDataFound from "@/shared/noDataFound/NoDataFound";
import Image from "next/image";

const SocialMediaTable = ({ refetch, SocialMediaData, user }) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [updateModalValue, setUpdateModalValue] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const [linkModalValue, setLinkModalValue] = useState({});
  const handleLinkModal = (item) => {
    setLinkModalValue(item);
    setLinkModal(true);
  };
  const updateAdsModal = (ads) => {
    setUpdateModal(true);
    setUpdateModalValue(ads);
  };
  const token = getCookie(authKey);
  // delete a social media link
  const handleDeleteAds = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${item?.media_name} news!`,
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
          const response = await fetch(
            `${BASE_URL}/social_media?role_type=social_media_delete`,
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
          if (result?.statusCode === 200 && result?.success === true) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${item?.media_name} news has been deleted!`,
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
      {SocialMediaData?.length > 0 ? (
        <div>
          <div className="mt-5 overflow-x-auto rounded">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Image
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Title
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Link
                  </th>

                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {SocialMediaData?.map((item) => (
                  <tr key={item?._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      <Image
                      width={200}
                      height={200}
                        src={item?.media_image}
                        className="w-16 h-16 "
                        alt=""
                      />
                    </td>

                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {item?.media_name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      <button
                        className="text-white bg-green-500 rounded px-2.5 py-1 "
                        onClick={() => handleLinkModal(item)}
                      >
                        View
                      </button>
                    </td>
                    {linkModal === true && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto">
                          <div className="flex items-center justify-between">
                            <h3
                              className="text-[26px] font-bold text-gray-800 capitalize"
                              id="modal-title"
                            >
                              {" "}
                              Social Media Link
                            </h3>
                            <button
                              className="btn bg-white hover:bg-white border p-1"
                              onClick={() => setLinkModal(false)}
                            >
                              <RxCross1 size={25}></RxCross1>
                            </button>
                          </div>

                          <hr className="mt-2 mb-4" />

                          {linkModalValue?.media_page_link.map((link) => (
                            <div key={link?._id}>
                              <div>
                                <p className="font-semibold mt-5 mb-1">
                                  {link?.link_title}
                                </p>
                                <a
                                  href={link?.link_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  {link?.link_url}
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center  gap-4">
                      {user?.role_id?.social_media_delete ||
                      user?.role_id?.social_media_update ? (
                        <>
                          {user?.role_id?.social_media_delete && (
                            <MdDeleteForever
                              onClick={() => handleDeleteAds(item)}
                              className="cursor-pointer text-red-500 hover:text-red-300"
                              size={25}
                            />
                          )}
                          {user?.role_id?.social_media_update && (
                            <FiEdit
                              onClick={() => updateAdsModal(item)}
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
          <hr />
        </div>
      ) : (
        <NoDataFound />
      )}
      {/* Update Social Media */}
      {updateModal && (
        <UpdateSocialMedia
          setUpdateModal={setUpdateModal}
          updateModalValue={updateModalValue}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default SocialMediaTable;
