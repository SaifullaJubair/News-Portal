"use client";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
// import dynamic from "next/dynamic";
// const FiEdit = dynamic(() => import("react-icons/pi").then((mod) => mod.FiEdit), {
//   ssr: false, // Disable server-side rendering for this component
// });
// const MdDeleteForever = dynamic(() => import("react-icons/md").then((mod) => mod.MdDeleteForever), {
//   ssr: false, // Disable server-side rendering for this component
// });
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import UpdateNews from "./UpdateNews";
import { getYouTubeVideoId } from "@/helper/youtubeVideo";
import { generateSlug } from "@/helper/slug";
import Link from "next/link";
import Image from "next/image";
import { BASE_URL } from "@/utils/baseURL";
import NoDataFound from "@/shared/noDataFound/NoDataFound";
import { BanglaDate } from "@/helper/banglaDate";

const NewsTable = ({
  refetch,
  newsData,
  categoryData,
  subCategoryData,
  todayNewsData,
  user,
  token,
  serialNumber,
}) => {
  // (subCategoryData);
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
          // (result);
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
  console.log(newsData.data);
  return (
    <>
      {newsData?.data?.length > 0 ? (
        <div>
          <div className="mt-5 overflow-x-auto rounded border border-gray-200">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead>
                <tr className="divide-x divide-gray-200 text-center">
                  <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-800 ">
                    #
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-800 ">
                    Image
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-800 ">
                    Heading
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-800 ">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-800 ">
                    Total Click
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-800 ">
                    Category
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-800 ">
                    SubCategory
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-800 ">
                    Division
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-800 ">
                    District
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-800 ">
                    Writer
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-800 ">
                    Created By
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-800 ">
                    Updated By
                  </th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {newsData?.data?.map((item, i) => (
                  <tr
                    key={item?._id}
                    className={`${
                      i % 2 === 0 ? "bg-gray-50" : ""
                    } divide-x divide-gray-200 text-center`}
                  >
                    {" "}
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {serialNumber + i + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {/* {item?.image_key?.startsWith("news_image/") ? (
                        <Image
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
                          className="border-x-2 border-4rimarysemiboldLightColor 800-t-2 rounded"
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
                      ) : item?.audio_link ? (
                        <audio
                          src={item?.audio_link}
                          controls
                          className="z-[-10] w-40"
                        />
                      ) : (
                        <div className="relative h-12 w-20">
                          <Image
                            src={item?.main_image}
                            alt={item?.heading}
                            fill
                          />
                        </div>
                      )}
                    </td>
                    <td>
                      <Link
                        href={`/${generateSlug(
                          item?.category_id?.category_name
                        )}/${item?._id}`}
                        className="whitespace-nowrap px-4 py-2 text-pTextColor font-semibold text-base line-clamp-1 hover:text-pHoverTextColor"
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
                      {item?.sub_category_id?.sub_category_name
                        ? item?.sub_category_id?.sub_category_name
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                      {item?.division ? item?.division : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                      {item?.district ? item?.district : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                      {item?.writer_name ? item?.writer_name : "Anonymous"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                      {item?.publisher_user_id
                        ? item?.publisher_user_id?.user_name
                        : "Anonymous"}{" "}
                      <br />
                      {BanglaDate(item?.createdAt)}
                    </td>
                    <td className="whitespace-nowrap mx-auto px-4 py-2 font-semibold capitalize">
                      {item?.updated_user_id
                        ? item?.updated_user_id?.user_name
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4  space-x-2.5 flex items-center justify-center ">
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
                        <>
                          {" "}
                          <small>Access Denied</small>
                        </>
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
