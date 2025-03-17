// import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import UpdateTodayNewsCategory from "./UpdateTodayNewsCategory";
import { BASE_URL } from "../../../utils/baseURL";
import NoDataFound from "../../../shared/noDataFound/NoDataFound";

const TodayNewCategoryTable = ({ refetch, TodayNewsData, user, token }) => {
  const [UpdateModal, setUpdateModal] = useState(false);
  const [updateModalValue, setUpdateModalValue] = useState(false);

  //   const [deleteSubCategoryType] = useDeleteSub_CategoryMutation(); //delete Sub Category type
  // console.log(subCategoryTypes);
  const updateSubCategoryModal = (subCategory) => {
    setUpdateModal(true);
    setUpdateModalValue(subCategory);
  };

  // delete a Sub Category
  const handleDeleteCategory = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${item?.category_name} news!`,
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
            `${BASE_URL}/today_news_category?role_type=today_news_category_delete`,
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
          // console.log(result);
          if (result?.statusCode === 200 && result?.success === true) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${item?.category_name} news has been deleted!`,
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
      {TodayNewsData?.length > 0 ? (
        <div className="mt-5 overflow-x-auto rounded">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Type Name
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
              {TodayNewsData?.map((item) => (
                <tr key={item?._id}>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {item?.category_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {item?.category_serial}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                    {item?.category_status}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                    {user?.role_id?.today_news_category_delete ||
                    user?.role_id?.today_news_category_update ? (
                      <>
                        {user?.role_id?.today_news_category_delete && (
                          <MdDeleteForever
                            onClick={() => handleDeleteCategory(item)}
                            className="cursor-pointer text-red-500 hover:text-red-300"
                            size={25}
                          />
                        )}

                        {user?.role_id?.today_news_category_update && (
                          <FiEdit
                            onClick={() => updateSubCategoryModal(item)}
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
      {UpdateModal && (
        <UpdateTodayNewsCategory
          setUpdateModal={setUpdateModal}
          updateModalValue={updateModalValue}
          refetch={refetch}
          token={token}
        />
      )}
    </div>
  );
};

export default TodayNewCategoryTable;
