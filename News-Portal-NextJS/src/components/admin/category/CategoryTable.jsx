"use client";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/baseURL";
import UpdateCategory from "./UpdateCategory";
import NoDataFound from "@/shared/noDataFound/NoDataFound";
import Image from "next/image";
const CategoryTable = ({ refetch, categoryTypes, user, token }) => {
  const [categoryUpdateModal, setCategoryUpdateModal] = useState(false);
  const [categoryUpdateModalValue, setCategoryUpdateModalValue] =
    useState(false);
  const updateCategoryModal = (category) => {
    setCategoryUpdateModal(true);
    setCategoryUpdateModalValue(category);
  };

  const handleDeleteCategory = (category) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${category?.category_name} news!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: category?._id,
          image_key: category?.image_key,
        };
        try {
          const response = await fetch(
            `${BASE_URL}/category?role_type=category_delete`,
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
              text: `${category?.category_name} news has been deleted!`,
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

  const updateCategoryStatusForMainPageFalse = async (_id, show_card) => {
    const sendData = {
      _id,
      show_card,
    };

    const response = await fetch(`${BASE_URL}/category?role_type=category_update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sendData),
    });
    const result = await response.json();
    if (result?.statusCode === 200 && result?.success === true) {
      refetch();
      toast.success(result?.message || "Category update successfully!", {
        autoClose: 1000,
      });
    } else {
      toast.error(result?.message, {
        autoClose: 1000,
      });
    }
  };

  const updateCategoryStatusForMainPageTrues = async (_id, show_card) => {
    const sendData = {
      _id,
      show_card,
    };
    const response = await fetch(`${BASE_URL}/category?role_type=category_update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sendData),
    });
    const result = await response.json();
    if (result?.statusCode === 200 && result?.success === true) {
      refetch();
      toast.success(result?.message || "Category update successfully!", {
        autoClose: 1000,
      });
    } else {
      toast.error(result?.message, {
        autoClose: 1000,
      });
    }
  };

  const updateCategoryStatusForMainTitleFalse = async (_id, show_title) => {
    const sendData = {
      _id,
      show_title,
    };
    const response = await fetch(`${BASE_URL}/category?role_type=category_update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sendData),
    });
    const result = await response.json();
    if (result?.statusCode === 200 && result?.success === true) {
      refetch();
      toast.success(result?.message || "Category update successfully!", {
        autoClose: 1000,
      });
    } else {
      toast.error(result?.message, {
        autoClose: 1000,
      });
    }
  };

  const updateCategoryStatusForMainTitleTrues = async (_id, show_title) => {
    const sendData = {
      _id,
      show_title,
    };
    const response = await fetch(`${BASE_URL}/category?role_type=category_update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sendData),
    });
    const result = await response.json();
    if (result?.statusCode === 200 && result?.success === true) {
      refetch();
      toast.success(result?.message || "Category update successfully!", {
        autoClose: 1000,
      });
    } else {
      toast.error(result?.message, {
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      {categoryTypes?.data?.length > 0 ? (
        <div>
          <div className="mt-5 overflow-x-auto rounded">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Image
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Serial
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Special Category
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Special Category Serial
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Show Card
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Show Title
                  </th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {categoryTypes?.data?.map((category) => (
                  <tr key={category?._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {category?.category_name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      <Image
                      width={200}
                      height={200}
                        src={category?.category_logo}
                        alt={category.category_name}
                        className="w-16 rounded-full h-16 object-cover"
                      />
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {category?.category_serial}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                      {category?.category_status}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {category?.special_category == true ? "Yes" : "No"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                      {category?.special_category_serial
                        ? category?.special_category_serial
                        : "N/A"}
                    </td>
                    {category?.show_card == "active" ? (
                      <td className="whitespace-nowrap px-4 py-2">
                        <button
                          onClick={() =>
                            updateCategoryStatusForMainPageFalse(
                              category?._id,
                              "in-active"
                            )
                          }
                          className="btn bg-green-500 text-white border rounded-md px-2 py-1"
                        >
                          Select
                        </button>
                      </td>
                    ) : (
                      <td className="whitespace-nowrap px-4 py-2">
                        <button
                          onClick={() =>
                            updateCategoryStatusForMainPageTrues(
                              category?._id,
                              "active"
                            )
                          }
                          className="btn bg-red-500 text-white border rounded-md px-2 py-1"
                        >
                          Selected ?
                        </button>
                      </td>
                    )}
                    {category?.show_title == "active" ? (
                      <td className="whitespace-nowrap px-4 py-2">
                        <button
                          onClick={() =>
                            updateCategoryStatusForMainTitleFalse(
                              category?._id,
                              "in-active"
                            )
                          }
                          className="btn bg-green-500 text-white border rounded-md px-2 py-1"
                        >
                          Select
                        </button>
                      </td>
                    ) : (
                      <td className="whitespace-nowrap px-4 py-2">
                        <button
                          onClick={() =>
                            updateCategoryStatusForMainTitleTrues(
                              category?._id,
                              "active"
                            )
                          }
                          className="btn bg-red-500 text-white border rounded-md px-2 py-1"
                        >
                          Selected ?
                        </button>
                      </td>
                    )}
                    <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4 mt-4">
                      {user?.role_id?.category_delete ||
                      user?.role_id?.category_update ? (
                        <>
                          {user?.role_id?.category_delete && (
                            <MdDeleteForever
                              onClick={() => handleDeleteCategory(category)}
                              className="cursor-pointer text-red-500 hover:text-red-300"
                              size={25}
                            />
                          )}
                          {user?.role_id?.category_update && (
                            <FiEdit
                              onClick={() => updateCategoryModal(category)}
                              className="cursor-pointer text-gray-500 hover:text-gray-300"
                              size={25}
                            />
                          )}
                        </>
                      ) : (
                        <>
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
          {categoryUpdateModal && (
            <UpdateCategory
              setCategoryUpdateModal={setCategoryUpdateModal}
              categoryUpdateModalValue={categoryUpdateModalValue}
              refetch={refetch}
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

export default CategoryTable;
