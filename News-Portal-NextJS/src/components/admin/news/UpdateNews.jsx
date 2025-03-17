"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Select from "react-select";
// import { RxCross1 } from "react-icons/rx";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
const RxCross1 = dynamic(
  () => import("react-icons/rx").then((mod) => mod.RxCross1),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);
import { AuthContext } from "@/context/context";
import { divisions } from "@/data/divisions";
import { districts } from "@/data/districts";
import ImageUploader from "./ImageUploader";
import AudioUploader from "./AudioUploader";
import { BASE_URL } from "@/utils/baseURL";
import { getYouTubeVideoId } from "@/helper/youtubeVideo";
import MiniSpinner from "@/shared/loader/MiniSpinner";
import Image from "next/image";

const UpdateNews = ({
  setUpdateModal,
  updateModalValue,
  refetch,
  categoryData,
  subCategoryData: subCategories,
  todayNewsData,
  token,
}) => {
  const { user } = useContext(AuthContext);
  // (updateModalValue);
  const {
    register,
    // reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(updateModalValue?.special_news);
  const [breakingNews, setBreakingNews] = useState(
    updateModalValue?.breaking_news
  );
  const [featureNews, setFeatureNews] = useState(
    updateModalValue?.feature_news
  );
  const [latestNews, setLatestNews] = useState(updateModalValue?.latest_news);
  const [topNews, setTopNews] = useState(updateModalValue?.top_news);
  const [todayNews, setTodayNews] = useState(updateModalValue?.today_news);
  const [imagePreview, setImagePreview] = useState(
    updateModalValue?.main_image
  );
  const [writerImagePreview, setWriterImagePreview] = useState(
    updateModalValue?.writer_image
  );
  const [metaImagePreview, setMetaImagePreview] = useState(
    updateModalValue?.social_image
  );
  const [audioPreview, setAudioPreview] = useState(
    updateModalValue?.audio_link
  );
  const [districtsData, setDistrictsData] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [division, setDivision] = useState(updateModalValue?.division);
  const [district, setDistrict] = useState(updateModalValue?.district);
  const [description, setDescription] = useState("");
  const [subCategory, setSubCategory] = useState(
    updateModalValue?.sub_category_id?._id || ""
  );
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [todayNewsCategoryValue, setTodayNewsCategoryValue] = useState(
    updateModalValue?.today_news_category_id?._id
  );
  const [categoryIdForSubCategory, setCategoryIdForSubCategory] = useState(
    updateModalValue?.category_id?._id || ""
  );
  const [isOpenSubCategory, setIsOpenSubCategory] = useState(true);
  const [isOpenDistrict, setIsOpenDistrict] = useState(true);

  const defaultDivisionName = updateModalValue?.division;
  const [defaultDistrictName, setDefaultDistrictName] = useState(
    updateModalValue?.district
  );

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }], // Add color and background color options
    ["link"],
    [{ align: [] }], // Add alignment options
    // ["link", "image"],
    ["clean"],
  ],
};

// Quill formats for content validation
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "align",
  "link",
  "image",
];

  //   set keyword
  const [keywords, setKeywords] = useState(
    updateModalValue?.meta_keyword || []
  );

  const [inputKeyword, setInputKeyword] = useState("");
  //   add keyword
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newKeyword = inputKeyword.trim();
      if (newKeyword !== "") {
        setKeywords([...keywords, { keyword: newKeyword }]);
        setInputKeyword(""); // Clear the input field
      }
    }
  };
  // remove keyword
  const removeKeyword = (keywordToRemove) => {
    const updatedKeywords = keywords.filter(
      (keyword) => keyword?.keyword !== keywordToRemove
    );
    setKeywords(updatedKeywords);
  };
  //handle keyword
  const handleKeywordChange = (e) => {
    setInputKeyword(e.target.value);
  };

  const handleCategoryToSubCategory = (category) => {
    setIsOpenSubCategory(false);
    setTimeout(() => {
      setCategoryIdForSubCategory(category?._id);
      setSubCategory("");
      setIsOpenSubCategory(true);
    }, 100);
  };
  useEffect(() => {
    const getSubCategoryData = subCategories?.data?.filter(
      (sub_category) =>
        sub_category?.category_id?._id === categoryIdForSubCategory
    );
    setSubCategoryData(getSubCategoryData);
  }, [subCategories?.data, categoryIdForSubCategory]);

  useEffect(() => {
    const districtData = divisions?.find(
      (divisionData) => divisionData?.name === division
    );
    setDistrictId(districtData?.id);
  }, [division]);

  useEffect(() => {
    if (districtId) {
      const districtData = districts.filter(
        (district) => district?.division_id === districtId
      );
      setDistrictsData(districtData);
    }
  }, [districtId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleWriterImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWriterImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleMetaImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMetaImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAudioPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelImage = () => {
    setImagePreview(updateModalValue?.main_image); // set default image preview
    // Clear input value (optional)
    const inputElement = document.getElementById("main_image");
    if (inputElement) {
      inputElement.value = null;
    }
  };
  const handleCancelWriterImage = () => {
    setWriterImagePreview(updateModalValue?.writer_image); // set default image preview
    // Clear input value (optional)
    const inputElement = document.getElementById("writer_image");
    if (inputElement) {
      inputElement.value = null;
    }
  };
  const handleCancelMetaImage = () => {
    setMetaImagePreview(updateModalValue?.socil_image); // set default image preview
    // Clear input value (optional)
    const inputElement = document.getElementById("social_image");
    if (inputElement) {
      inputElement.value = null;
    }
  };
  const handleCancelAudio = () => {
    setAudioPreview(updateModalValue?.audio_link); // set default image preview
    // Clear input value (optional)
    const inputElement = document.getElementById("audio_link");
    if (inputElement) {
      inputElement.value = null;
    }
  };

  // Handle update News
  const handleDataPost = async (data) => {
    setLoading(true);

    let main_image = updateModalValue?.main_image;
    let image_key = updateModalValue?.image_key;
    let previous_image_key;
    let writer_image = updateModalValue?.writer_image;
    let writer_image_key = updateModalValue?.writer_image_key;
    let previous_writer_image_key;
    let audio_link = updateModalValue?.audio_link;
    let audio_key = updateModalValue?.audio_key;
    let previous_audio_key;
    let social_image = updateModalValue?.social_image;
    let social_image_key = updateModalValue?.social_image_key;
    let previous_social_image_key;

    // Check if image is provided before attempting to upload
    if (data?.main_image?.length > 0) {
      const imageUpload = await ImageUploader(data?.main_image[0]);
      if (imageUpload[2] == true) {
        main_image = imageUpload[0];
        image_key = imageUpload[1];
        previous_image_key = updateModalValue?.image_key;
      } else {
        main_image = updateModalValue?.main_image;
        image_key = updateModalValue?.image_key;
        toast.error("Image upload failed", {
          autoClose: 1000,
        });
        setLoading(false);
        return;
      }
    }

    if (data?.writer_image?.length > 0) {
      const imageUpload = await ImageUploader(data?.writer_image[0]);
      if (imageUpload[2] == true) {
        writer_image = imageUpload[0];
        writer_image_key = imageUpload[1];
        previous_writer_image_key = updateModalValue?.writer_image_key;
      } else {
        writer_image = updateModalValue?.writer_image;
        writer_image_key = updateModalValue?.image_key;
        toast.error("Image upload failed", {
          autoClose: 1000,
        });
        setLoading(false);
        return;
      }
    }
    if (data?.social_image?.length > 0) {
      const imageUpload = await ImageUploader(data?.social_image[0]);
      if (imageUpload[2] == true) {
        social_image = imageUpload[0];
        social_image_key = imageUpload[1];
        previous_social_image_key = updateModalValue?.social_image_key;
      } else {
        social_image = updateModalValue?.social_image;
        social_image_key = updateModalValue?.image_key;
        toast.error("Image upload failed", {
          autoClose: 1000,
        });
        setLoading(false);
        return;
      }
    }

    // Check if image is provided before attempting to upload
    if (data?.audio_link?.length > 0) {
      const audioUpload = await AudioUploader(data?.audio_link[0]);
      if (audioUpload[2] == true) {
        audio_link = audioUpload[0];
        audio_key = audioUpload[1];
        previous_audio_key = updateModalValue?.audio_key;
      } else {
        audio_link = updateModalValue?.audio_link;
        audio_key = updateModalValue?.audio_key;
        toast.error("Audio upload failed", {
          autoClose: 1000,
        });
        setLoading(false);
        return;
      }
    }

    const todayNewsCategory =
      data?.today_news === true ? todayNewsCategoryValue : undefined;
    const specialNewsSerial =
      data?.special_news === true ? data?.special_news_serial : 0;
    const breakingNewsSerial =
      data?.breaking_news === true ? data?.breaking_serial : 0;
    const featureNewsSerial =
      data?.feature_news === true ? data?.feature_serial : 0;
    const latestNewsSerial =
      data?.latest_news === true ? data?.latest_serial : 0;
    const topNewsSerial = data?.top_news === true ? data?.top_serial : 0;

    const sendData = {
      _id: updateModalValue?._id,
      updated_user_id: user?._id,
      main_image,
      image_key,
      writer_image,
      writer_image_key,
      social_image,
      social_image_key,
      audio_link,
      audio_key,
      heading: data?.heading,
      category_id: categoryIdForSubCategory,
      sub_category_id: subCategory,
      today_news: data?.today_news,
      today_news_category_id: todayNewsCategory,
      home_position: data?.home_position,
      description: description ? description : updateModalValue?.description,
      video_link: data?.video_link,
      division: division,
      district: district,
      special_news: data?.special_news,
      special_news_serial: specialNewsSerial,
      breaking_news: data?.breaking_news,
      breaking_serial: breakingNewsSerial,
      feature_news: data?.feature_news,
      feature_serial: featureNewsSerial,
      latest_news: data?.latest_news,
      latest_serial: latestNewsSerial,
      top_news: data?.top_news,
      top_serial: topNewsSerial,
      writer_name: data?.writer_name,
      meta_title: data?.meta_title,
      meta_keyword: keywords,
      news_status: data?.news_status,
      main_image_source: data?.main_image_source,
      sub_heading: data?.sub_heading,
    };

    if (!sendData?.description) {
      toast.error("Please provide description", { autoClose: 1000 });
      setLoading(false);
      return;
    }

    if (!sendData?.sub_category_id) {
      delete sendData?.sub_category_id;
    }
    if (previous_image_key) {
      sendData.previous_image_key = previous_image_key;
    }
    if (previous_writer_image_key) {
      sendData.previous_writer_image_key = previous_writer_image_key;
    }
    if (previous_audio_key) {
      sendData.previous_audio_key = previous_audio_key;
    }
    if (previous_social_image_key) {
      sendData.previous_social_image_key = previous_social_image_key;
    }
    // Ensure at least one of main_image or video_link is present
    if (
      !sendData?.main_image &&
      !sendData?.video_link &&
      !sendData?.audio_link
    ) {
      toast.error(
        "Please upload an image or provide a video link or audio file",
        {
          autoClose: 1000,
        }
      );
      setLoading(false);
      return;
    }

    if (sendData?.main_image && sendData?.video_link && sendData?.audio_link) {
      toast.error("Dont upload both image and video", {
        autoClose: 1000,
      });
      setLoading(false);
      return;
    }
    if (sendData?.main_image && sendData?.video_link) {
      toast.error("Dont upload both image and video", {
        autoClose: 1000,
      });
      setLoading(false);
      return;
    }
    if (sendData?.audio_link && sendData?.video_link) {
      toast.error("Dont upload both image and video", {
        autoClose: 1000,
      });
      setLoading(false);
      return;
    }

    if (
      sendData?.today_news &&
      sendData?.today_news_category_id === undefined
    ) {
      toast.error("Select today news category", {
        autoClose: 1000,
      });
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/news?role_type=news_update`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : "News updated successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setUpdateModal(false);
        setLoading(false);
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error("Network error or server is down", {
        autoClose: 1000,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <form
          onSubmit={handleSubmit(handleDataPost)}
          className="bg-white rounded-lg-lg p-4 space-y-4  xl:w-[1000px] lg:w-[950px] md:w-[760px] sm:w-[600px]  w-[550px]  max-h-[100vh] overflow-y-auto scrollbar-thin"
        >
          <div className="flex items-center justify-between">
            <h3
              className="text-[26px] py-4 font-bold text-gray-800 capitalize"
              id="modal-title"
            >
              Update News Information
            </h3>

            <button
              className=" bg-white hover:bg-white border p-1"
              type="button"
              onClick={() => setUpdateModal(false)}
            >
              <RxCross1 size={25} />
            </button>
          </div>

          {/* News Main image */}
          <div className="relative">
            {imagePreview && (
              <>
                <Image
                  width={1000}
                  height={200}
                  src={imagePreview}
                  alt="Preview"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 px-2 hover:bg-red-600"
                  onClick={handleCancelImage}
                >
                  X
                </button>
              </>
            )}
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Main Image
            </p>
            <input
              {...register("main_image", {
                validate: {
                  isImage: (value) =>
                    !value.length || // Pass validation if no file is selected
                    (value[0] && value[0].type.startsWith("image/")) ||
                    "Only image files are allowed",
                },
              })}
              id="main_image"
              type="file"
              accept="image/*"
              className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
              onChange={handleImageChange}
            />
            {errors.main_image && (
              <p className="text-red-600">{errors.main_image?.message}</p>
            )}
          </div>
          <div>
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Image Source
            </p>

            <input
              placeholder="Image Source"
              {...register("main_image_source")}
              id="main_image_source"
              type="text"
              className="block w-full  p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
            />
            {errors.main_image_source && (
              <p className="text-red-600">
                {errors.main_image_source?.message}
              </p>
            )}
          </div>
          {/* News Main image */}
          {/* <div className="relative">
            {imagePreview && fileType ? (
              fileType.startsWith("audio/") ? (
                <>
                  <audio src={imagePreview} controls />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 px-2 hover:bg-red-600"
                    onClick={handleCancelImage}
                  >
                    X
                  </button>
                </>
              ) : (
                <>
                  <Image src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 px-2 hover:bg-red-600"
                    onClick={handleCancelImage}
                  >
                    X
                  </button>
                </>
              )
            ) : imagePreview ? (
              imagePreview?.startsWith(
                "https://cit-node.blr1.cdn.digitaloceanspaces.com/news_audio/"
              ) ? (
                <>
                  <audio src={imagePreview} controls />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 px-2 hover:bg-red-600"
                    onClick={handleCancelImage}
                  >
                    X
                  </button>
                </>
              ) : (
                <>
                  <Image src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 px-2 hover:bg-red-600"
                    onClick={handleCancelImage}
                  >
                    X
                  </button>
                </>
              )
            ) : null}

            <input
              {...register("main_image", {
                validate: {
                  isImage: (value) =>
                    !value.length || // Pass validation if no file is selected
                    (value[0] && value[0].type.startsWith("image/")) ||
                    (value[0] && value[0].type.startsWith("audio/")) ||
                    "Only image or audio files are allowed",
                },
              })}
              id="main_image"
              type="file"
              accept="audio/*, image/*"
              className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
              onChange={handleImageChange}
            />
            {errors.main_image && (
              <p className="text-red-600">{errors.main_image?.message}</p>
            )}
          </div> */}
          {/* News Audio Link */}
          <div className="relative">
            {audioPreview && (
              <>
                <audio src={audioPreview} controls />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 px-2 hover:bg-red-600"
                  onClick={handleCancelAudio}
                >
                  X
                </button>
              </>
            )}
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Audio
            </p>
            <input
              {...register("audio_link", {
                validate: {
                  isImage: (value) =>
                    !value.length ||
                    (value[0] && value[0].type.startsWith("audio/")) ||
                    "Only audio files are allowed",
                },
              })}
              id="audio_link"
              type="file"
              accept="audio/*"
              className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
              onChange={handleAudioChange}
            />
            {errors.audio_link && (
              <p className="text-red-600">{errors.audio_link?.message}</p>
            )}
          </div>

          {/* Video Link */}
          {updateModalValue?.video_link && (
            <div>
              <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                  updateModalValue?.video_link
                )}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-x-2 border-primaryMediumLightColor border-t-2 rounded"
              ></iframe>
            </div>
          )}
          <div>
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Video link
            </p>

            <input
              placeholder="Video link"
              {...register("video_link")}
              id="video_link"
              defaultValue={updateModalValue?.video_link}
              type="text"
              className="block w-full  p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
            />
            {errors.video_link && (
              <p className="text-red-600">{errors.video_link?.message}</p>
            )}
          </div>

          {/* News heading */}
          <div>
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              News heading
            </p>

            <input
              placeholder="News heading"
              {...register("heading", {
                required: "News heading is required",
              })}
              id="heading"
              defaultValue={updateModalValue?.heading}
              type="text"
              className="block w-full  p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
            />
            {errors.heading && (
              <p className="text-red-600">{errors.heading?.message}</p>
            )}
          </div>

          {/* News Sub heading */}
          <div>
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              News Sub heading
            </p>

            <textarea
              placeholder="News Sub heading"
              {...register("sub_heading")}
              id="sub_heading"
              defaultValue={updateModalValue?.sub_heading}
              type="text"
              rows={3}
              className="block w-full  p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
            />
          </div>

          {/* Select category, subcategory,  */}
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            {/* Select Category */}
            <div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Select Category
              </p>
              <Select
                id="category_id"
                name="category_id"
                required
                aria-label="Category Type"
                defaultValue={{
                  _id: updateModalValue?.category_id?._id,
                  category_name: updateModalValue?.category_id?.category_name,
                }}
                options={categoryData?.data}
                getOptionLabel={(x) => x?.category_name}
                getOptionValue={(x) => x?._id}
                onChange={(selectedOption) =>
                  handleCategoryToSubCategory(selectedOption)
                }
              />
            </div>
            {/* Select SubCategory */}
            {isOpenSubCategory && (
              <div>
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  Select SubCategory
                </p>
                <Select
                  id="sub_category_id"
                  name="sub_category_id"
                  aria-label="Category Type"
                  isClearable
                  value={
                    subCategory
                      ? {
                          _id: subCategory,
                          sub_category_name: subCategoryData.find(
                            (subCat) => subCat._id === subCategory
                          )?.sub_category_name,
                        }
                      : null
                  }
                  options={subCategoryData}
                  getOptionLabel={(x) => x?.sub_category_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) =>
                    setSubCategory(selectedOption?._id)
                  }
                />
              </div>
            )}
          </div>
          {/* News Description */}
          <div className="mt-4">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              News Description
            </p>
            <ReactQuill
              className="mt-4"
              theme="snow"
              // defaultValue={updateModalValue?.description}
              value={description}
              onChange={setDescription}
              modules={modules} // Pass the custom toolbar configuration
            />
          </div>
          <div
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              background: "#f9f9f9",
            }}
            className="ql-editor" // Apply Quill's styles to the preview
            dangerouslySetInnerHTML={{ __html: updateModalValue?.description }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            {/* Home position */}
            <div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Home Position
              </p>

              <input
                placeholder="Home Position"
                {...register("home_position", {
                  required: "Home Position is required",

                  validate: (value) => {
                    if (value < 1) {
                      return "Home Position must be greater than 0";
                    }
                  },
                  max: {
                    value: 10,
                    message:
                      "Special News serial must be less than or equal to 10",
                  },
                })}
                id="home_position"
                type="number"
                defaultValue={updateModalValue?.home_position}
                className=" w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl"
              />
              {errors.home_position && (
                <p className="text-red-600">{errors.home_position?.message}</p>
              )}
            </div>
            {/* News Status */}
            <div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                News Status
              </p>

              <select
                {...register("news_status", {
                  required: "News Status is required",
                })}
                id="news_status"
                className="block w-full p-2.5 capitalize   text-gray-700 bg-white border border-gray-200 rounded-xl"
              >
                <option
                  defaultValue={updateModalValue?.news_status}
                  selected
                  disabled
                >
                  {updateModalValue?.news_status}
                </option>
                <option value="active">Active</option>
                <option value="in-active">In-Active</option>
              </select>
              {errors.news_status && (
                <p className="text-red-600">{errors.news_status?.message}</p>
              )}
            </div>
          </div>

          {/* Division & District */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="form-control w-full">
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Division
              </p>
              <Select
                id="division"
                name="division"
                aria-label="Select a division"
                defaultValue={{
                  _id: updateModalValue?._id,
                  name: defaultDivisionName,
                }}
                options={divisions}
                getOptionLabel={(x) => x?.name}
                getOptionValue={(x) => x?.id}
                onChange={(selectedOption) => {
                  setIsOpenDistrict(false);
                  setDistrict();
                  setDistrictId(selectedOption?.id);
                  setDefaultDistrictName("");
                  setDivision(selectedOption?.name);
                  setTimeout(() => {
                    setIsOpenDistrict(true);
                  }, 100);
                }}
              ></Select>
            </div>
            {isOpenDistrict && (
              <div className="form-control w-full">
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  District
                </p>
                <Select
                  id="district"
                  name="district"
                  aria-label="Select a district"
                  defaultValue={{
                    _id: updateModalValue?._id,
                    name: defaultDistrictName,
                  }}
                  options={districtsData}
                  getOptionLabel={(x) => x?.name}
                  getOptionValue={(x) => x?.id}
                  onChange={(selectedOption) => {
                    setDistrict(selectedOption?.name);
                  }}
                ></Select>
              </div>
            )}
          </div>
          {/* Select news type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Today news  */}
            {/* <div>
              <div className="form-control ">
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  Today News
                </p>
                <label
                  className={`flex items-center cursor-pointer w-full p-2 rounded-lg border ${todayNews ? "bg-green-500 text-white" : "bg-gray-100"
                    }`}
                  htmlFor="today_news"
                >
                  <input
                    type="checkbox"
                    id="today_news"
                    className="checkbox checkbox-primary mr-2"
                    {...register("today_news")}
                    checked={todayNews}
                    onChange={() => setTodayNews(!todayNews)}
                  />
                  <span
                    className={` ${todayNews ? "text-white" : "text-gray-700"}`}
                  >
                    Today News
                  </span>
                </label>
              </div>

              <div className="mt-3">
                {todayNews === true && (
                  <div className="">
                    <Select
                      id="today_news_category_id"
                      name="today_news_category_id"
                      className=" "
                      required
                      aria-label="Category Type"
                      defaultValue={{
                        _id: updateModalValue?.today_news_category_id?._id,
                        category_name:
                          updateModalValue?.today_news_category_id
                            ?.category_name,
                      }}
                      options={todayNewsData.data}
                      getOptionLabel={(x) => x?.category_name}
                      getOptionValue={(x) => x?._id}
                      onChange={(selectedOption) =>
                        setTodayNewsCategoryValue(selectedOption?._id)
                      }
                    ></Select>
                  </div>
                )}
              </div>
            </div> */}

            {/*Special News  */}
            <div className="">
              {" "}
              <div className="form-control ">
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  Special News
                </p>
                <label
                  className={`flex items-center cursor-pointer w-full p-2 rounded-lg border ${
                    checked ? "bg-green-500 text-white" : "bg-gray-100"
                  }`}
                  htmlFor="special_news"
                >
                  <input
                    type="checkbox"
                    id="special_news"
                    className="checkbox checkbox-primary mr-2"
                    {...register("special_news", {})}
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                  <span
                    className={` ${checked ? "text-white" : "text-gray-700"}`}
                  >
                    Special News
                  </span>
                </label>
              </div>
              <div className="mt-2">
                {checked === true && (
                  <div>
                    <input
                      placeholder="Spacial News Serial"
                      {...register("special_news_serial", {
                        required: "Spacial News serial required",
                        validate: (value) => {
                          if (value < 1) {
                            return "Spacial News serial must be greater than 0";
                          }
                        },
                        max: {
                          value: 10,
                          message:
                            "Special News serial must be less than or equal to 10",
                        },
                      })}
                      defaultValue={updateModalValue?.special_news_serial}
                      id="special_news_serial"
                      type="number"
                      className="block w-full p-2 text-gray-700 bg-white border border-gray-200 rounded-lg"
                    />
                    {errors.special_news_serial && (
                      <p className="text-red-600">
                        {errors.special_news_serial?.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Breaking news*/}
            <div className="flex flex-col ">
              <div className="form-control ">
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  Breaking News
                </p>
                <label
                  className={`flex items-center cursor-pointer w-full p-2 rounded-lg border ${
                    breakingNews ? "bg-green-500 text-white" : "bg-gray-100"
                  }`}
                  htmlFor="breaking_news"
                >
                  <input
                    type="checkbox"
                    id="breaking_news"
                    className="checkbox checkbox-primary mr-2"
                    {...register("breaking_news")}
                    checked={breakingNews}
                    onChange={() => setBreakingNews(!breakingNews)}
                  />
                  <span
                    className={` ${
                      breakingNews ? "text-white" : "text-gray-700"
                    }`}
                  >
                    Breaking News
                  </span>
                </label>
              </div>
              <div className="mt-2">
                {breakingNews === true && (
                  <div>
                    <input
                      placeholder="Breaking News Serial"
                      {...register("breaking_serial", {
                        required: "Breaking News serial required",
                        validate: (value) => {
                          if (value < 1) {
                            return "Breaking News serial must be greater than 0";
                          }
                        },
                        max: {
                          value: 10,
                          message:
                            "Special News serial must be less than or equal to 10",
                        },
                      })}
                      id="breaking_serial"
                      defaultValue={updateModalValue?.breaking_serial}
                      type="number"
                      className="block w-full p-2 text-gray-700 bg-white border border-gray-200 rounded-lg"
                    />
                    {errors.breaking_serial && (
                      <p className="text-red-600">
                        {errors.breaking_serial?.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Feature news*/}
            <div className="flex flex-col  ">
              {" "}
              <div className="form-control ">
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  Feature News
                </p>
                <label
                  className={`flex items-center cursor-pointer w-full p-2 rounded-lg border ${
                    featureNews ? "bg-green-500 text-white" : "bg-gray-100"
                  }`}
                  htmlFor="feature_news"
                >
                  <input
                    type="checkbox"
                    id="feature_news"
                    className="checkbox checkbox-primary mr-2"
                    {...register("feature_news")}
                    checked={featureNews}
                    onChange={() => setFeatureNews(!featureNews)}
                  />
                  <span
                    className={` ${
                      featureNews ? "text-white" : "text-gray-700"
                    }`}
                  >
                    Feature News
                  </span>
                </label>
              </div>
              <div className="mt-2">
                {featureNews === true && (
                  <div>
                    <input
                      placeholder="Feature News Serial"
                      {...register("feature_serial", {
                        required: "Feature News serial required",
                        validate: (value) => {
                          if (value < 1) {
                            return "Feature News serial must be greater than 0";
                          }
                        },
                        max: {
                          value: 10,
                          message:
                            "Special News serial must be less than or equal to 10",
                        },
                      })}
                      id="feature_serial"
                      defaultValue={updateModalValue?.feature_serial}
                      type="number"
                      className="block w-full p-2 text-gray-700 bg-white border border-gray-200 rounded-lg"
                    />
                    {errors.feature_serial && (
                      <p className="text-red-600">
                        {errors.feature_serial?.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Latest news*/}
            <div className="flex flex-col  ">
              {" "}
              <div className="form-control ">
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  Latest News
                </p>
                <label
                  className={`flex items-center cursor-pointer w-full p-2 rounded-lg border ${
                    latestNews ? "bg-green-500 text-white" : "bg-gray-100"
                  }`}
                  htmlFor="latest_news"
                >
                  <input
                    type="checkbox"
                    id="latest_news"
                    className="checkbox checkbox-primary mr-2"
                    {...register("latest_news")}
                    checked={latestNews}
                    onChange={() => setLatestNews(!latestNews)}
                  />
                  <span
                    className={` ${
                      latestNews ? "text-white" : "text-gray-700"
                    }`}
                  >
                    Latest News
                  </span>
                </label>
              </div>
              <div className="mt-2">
                {latestNews === true && (
                  <div>
                    <input
                      placeholder="Latest News Serial"
                      {...register("latest_serial", {
                        required: "Latest News serial required",
                        validate: (value) => {
                          if (value < 1) {
                            return "Latest News serial must be greater than 0";
                          }
                        },
                        max: {
                          value: 10,
                          message:
                            "Special News serial must be less than or equal to 10",
                        },
                      })}
                      id="latest_serial"
                      defaultValue={updateModalValue?.latest_serial}
                      type="number"
                      className="block w-full p-2 text-gray-700 bg-white border border-gray-200 rounded-lg"
                    />
                    {errors.latest_serial && (
                      <p className="text-red-600">
                        {errors.latest_serial?.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Top news*/}
            <div className="flex flex-col  ">
              {" "}
              <div className="form-control ">
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  Top News
                </p>
                <label
                  className={`flex items-center cursor-pointer w-full p-2 rounded-lg border ${
                    topNews ? "bg-green-500 text-white" : "bg-gray-100"
                  }`}
                  htmlFor="top_news"
                >
                  <input
                    type="checkbox"
                    id="top_news"
                    className="checkbox checkbox-primary mr-2"
                    {...register("top_news")}
                    checked={topNews}
                    onChange={() => setTopNews(!topNews)}
                  />
                  <span
                    className={` ${topNews ? "text-white" : "text-gray-700"}`}
                  >
                    Top News
                  </span>
                </label>
              </div>
              <div className="mt-2">
                {topNews === true && (
                  <div>
                    <input
                      placeholder="Top News Serial"
                      {...register("top_serial", {
                        required: "Latest News serial required",
                        validate: (value) => {
                          if (value < 1) {
                            return "Latest News serial must be greater than 0";
                          }
                        },
                        max: {
                          value: 10,
                          message:
                            "Special News serial must be less than or equal to 10",
                        },
                      })}
                      id="top_serial"
                      defaultValue={updateModalValue?.top_serial}
                      type="number"
                      className="block w-full p-2 text-gray-700 bg-white border border-gray-200 rounded-lg"
                    />
                    {errors.top_serial && (
                      <p className="text-red-600">
                        {errors.top_serial?.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Writer */}
          <div>
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Writer Name
            </p>

            <input
              placeholder="Writer Name"
              {...register("writer_name")}
              id="writer_name"
              type="text"
              defaultValue={updateModalValue?.writer_name}
              className="block w-full  p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
            />
            {errors.writer_name && (
              <p className="text-red-600">{errors.writer_name?.message}</p>
            )}
          </div>

          {/* writer image */}
          <div className="relative">
            {writerImagePreview && (
              <>
                <Image
                  width={1000}
                  height={200}
                  src={writerImagePreview}
                  alt="Preview"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 px-2 hover:bg-red-600"
                  onClick={handleCancelWriterImage}
                >
                  X
                </button>
              </>
            )}
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Writer Image
            </p>
            <input
              {...register("writer_image", {
                validate: {
                  isImage: (value) =>
                    !value.length || // Pass validation if no file is selected
                    (value[0] && value[0].type.startsWith("image/")) ||
                    "Only image files are allowed",
                },
              })}
              id="writer_image"
              type="file"
              accept="image/*"
              className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
              onChange={handleWriterImageChange}
            />
            {errors.writer_image && (
              <p className="text-red-600">{errors.writer_image?.message}</p>
            )}
          </div>

          {/* meta image */}
          <div className="relative">
            {metaImagePreview && (
              <>
                <Image
                  width={1000}
                  height={200}
                  src={metaImagePreview}
                  alt="Preview"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 px-2 hover:bg-red-600"
                  onClick={handleCancelMetaImage}
                >
                  X
                </button>
              </>
            )}
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Meta Image
            </p>
            <input
              {...register("social_image", {
                validate: {
                  isImage: (value) =>
                    !value.length || // Pass validation if no file is selected
                    (value[0] && value[0].type.startsWith("image/")) ||
                    "Only image files are allowed",
                },
              })}
              id="social_image"
              type="file"
              accept="image/*"
              className="block w-full p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
              onChange={handleMetaImageChange}
            />
            {errors.social_image && (
              <p className="text-red-600">{errors.social_image?.message}</p>
            )}
          </div>

          {/* Meta title*/}

          <div className="mt-2">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Meta title
            </p>
            <input
              placeholder="Meta Title"
              {...register("meta_title")}
              id="meta_title"
              type="text"
              defaultValue={updateModalValue?.meta_title}
              className="block w-full  p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
            />
            {errors.meta_title && (
              <p className="text-red-600">{errors.meta_title?.message}</p>
            )}
          </div>

          {/* Meta Keywords */}

          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="fname" className="text-base font-medium">
              Meta Keyword
            </label>
            {keywords?.length > 0 && (
              <div className="flex flex-wrap gap-1 bg-white mb-3 rounded-lg py-1 min-h-[50px] items-center">
                {keywords?.map((keyword, index) => (
                  <div
                    key={index}
                    className="bg-gray-300 text-black py-1 px-2 mx-1 rounded-full flex item-center justify-center h-auto"
                  >
                    <span>{keyword?.keyword}</span>
                    <div
                      className="ml-2 w-6 h-6 cursor-pointer bg-gray-400 rounded-full px-2 flex item-center justify-center"
                      onClick={() => removeKeyword(keyword?.keyword)}
                    >
                      X
                    </div>
                  </div>
                ))}
              </div>
            )}
            <input
              type="text"
              className="bg-bgray-50 border border-gray-300 p-4 rounded-lg h-14 focus:border focus:border-success-300 focus:ring-0"
              name="fname"
              value={inputKeyword}
              onChange={handleKeywordChange}
              onKeyDown={handleKeyPress}
            />
          </div>

          {loading ? (
            <button
              type="button"
              className="px-6 py-2 text-white transition-colors duration-300 transform bg-[#3EA2FA] rounded-lg hover:bg-[#3EA2FA]"
            >
              <MiniSpinner />
            </button>
          ) : (
            <button
              type="Submit"
              className="px-6 py-2 text-white transition-colors duration-300 transform bg-[#3EA2FA] rounded-lg hover:bg-[#3EA2FA]"
            >
              Update
            </button>
          )}

          <button
            className="bg-gray-300 ms-2 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg mr-2"
            onClick={() => setUpdateModal(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateNews;
