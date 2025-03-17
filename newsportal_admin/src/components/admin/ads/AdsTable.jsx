import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../utils/baseURL";
import NoDataFound from "../../../shared/noDataFound/NoDataFound";
import UpdateAds from "./UpdateAds";

const AdsTable = ({ refetch, adsData, user, token }) => {
  const [adsUpdateModal, setAdsUpdateModal] = useState(false);
  const [adsUpdateModalValue, setAdsUpdateModalValue] = useState(false);

  //   const [deleteSubCategoryType] = useDeleteSub_CategoryMutation(); //delete Sub Category type
  // console.log(adsFakeData);
  const updateAdsModal = (ads) => {
    setAdsUpdateModal(true);
    setAdsUpdateModalValue(ads);
  };

  // delete a Sub Category
  const handleDeleteAds = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${item?.ads_title} news!`,
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
          const response = await fetch(`${BASE_URL}/ads?role_type=ads_delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(sendData),
          });
          const result = await response.json();
          // console.log(result);
          if (result?.statusCode === 200 && result?.success === true) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${item?.ads_title} news has been deleted!`,
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
      {adsData?.length > 0 ? (
        <div>
          <div className="mt-5 overflow-x-auto rounded">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Ads Image
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Ads Link
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Serial
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Status
                  </th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {adsData?.map((item) => (
                  <tr key={item?._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      <img
                        src={item?.ads_image}
                        className="w-16 h-16 "
                        alt=""
                      />
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {item?.ads_link}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {item?.ads_serial}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                      {item?.ads_status}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                      {user?.role_id?.ads_delete ||
                      user?.role_id?.ads_update ? (
                        <>
                          {user?.role_id?.ads_delete && (
                            <MdDeleteForever
                              onClick={() => handleDeleteAds(item)}
                              className="cursor-pointer text-red-500 hover:text-red-300"
                              size={25}
                            />
                          )}
                          {user?.role_id?.ads_update && (
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
        </div>
      ) : (
        <NoDataFound />
      )}
      {/* Update Sub Category */}
      {adsUpdateModal && (
        <UpdateAds
          setAdsUpdateModal={setAdsUpdateModal}
          adsUpdateModalValue={adsUpdateModalValue}
          refetch={refetch}
          token={token}
        />
      )}
    </div>
  );
};

export default AdsTable;
