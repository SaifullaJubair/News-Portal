import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import Swal from "sweetalert2";
import NoDataFound from "../../../shared/noDataFound/NoDataFound";
import { BASE_URL } from "../../../utils/baseURL";
import { toast } from "react-toastify";
import UpdateNews from "./UpdateNews";
import { Link } from "react-router-dom";
import { generateSlug } from "../../../helper/slug";
import { getYouTubeVideoId } from "../../../helper/youtubeVideo";

const NewsTable = ({
  refetch,
  newsData,
  categoryData,
  subCategoryData,
  todayNewsData,
  user,
  token,
}) => {
  // console.log(subCategoryData);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateModalValue, setUpdateModalValue] = useState(false);
  const handleUpdateModal = (item) => {
    setUpdateModal(true);
    setUpdateModalValue(item);
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${item?.heading} news!`,
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
            `${BASE_URL}/news?role_type=news_delete`,
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
              text: `${item?.heading} news has been deleted!`,
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
    <>
      {newsData?.data?.length > 0 ? (
        <div>
          <div className="mt-5 overflow-x-auto rounded">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Image
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Heading
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Total Click
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Category
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    SubCategory
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Division
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    District
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Writer
                  </th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {newsData?.data?.map((item) => (
                  <tr key={item?._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {/* {item?.image_key?.startsWith("news_image/") ? (
                        <img
                          src={item?.main_image}
                          alt={item?.heading}
                          className="w-20 rounded h-12 object-cover"
                        />
                      ) : item?.image_key?.startsWith("news_audio/") ? (
                        <audio
                          src={item?.main_image}
                          controls
                          className="z-[-10] w-40"
                        />
                      ) : (
                        <iframe
                          width="80"
                          height="50"
                          src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                            item?.video_link
                          )}`}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="border-x-2 border-primaryMediumLightColor border-t-2 rounded"
                        ></iframe>
                      )} */}

                      {item?.video_link ? (
                        <iframe
                        width="80"
                        height="50"
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                          item?.video_link
                        )}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="border-x-2 border-primaryMediumLightColor border-t-2 rounded"
                      ></iframe>
                      ) : (
                        item?.audio_link ? (
                          <audio
                          src={item?.audio_link}
                          controls
                          className="z-[-10] w-40"
                        />
                        )
                        :
                        <img
                          src={item?.main_image}
                          alt={item?.heading}
                          className="w-20 rounded h-12 object-cover"
                        />
                      )
                      }

                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold line-clamp-1 hover:text-pHoverTextColor">
                      <Link
                        to={`/${generateSlug(
                          item?.category_id?.category_name
                        )}/${item?._id}`}
                      >
                        {item?.heading?.length > 50
                          ? item?.heading?.slice(0, 50) + "..."
                          : item?.heading}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap capitalize px-4 py-2 font-semibold">
                      {item?.news_status}
                    </td>
                    <td className="whitespace-nowrap pl-6 py-2  font-semibold ">
                      {item?.news_click ? item?.news_click : 0}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {item?.category_id?.category_name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                      {item?.sub_category_id?.sub_category_name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                      {item?.division}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                      {item?.district}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                      {item?.writer_name ? item?.writer_name : "Anonymous"}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4 mt-4">
                      {user?.role_id?.news_delete ||
                        user?.role_id?.news_update ? (
                        <>
                          {user?.role_id?.news_delete && (
                            <MdDeleteForever
                              onClick={() => handleDelete(item)}
                              className="cursor-pointer text-red-500 hover:text-red-300"
                              size={25}
                            />
                          )}
                          {user?.role_id?.news_update && (
                            <FiEdit
                              onClick={() => handleUpdateModal(item)}
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

          {/* Update Category */}
          {updateModal && (
            <UpdateNews
              setUpdateModal={setUpdateModal}
              updateModalValue={updateModalValue}
              refetch={refetch}
              categoryData={categoryData}
              subCategoryData={subCategoryData}
              todayNewsData={todayNewsData}
              token={token}
            />
          )}
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default NewsTable;
