import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Select from "react-select";
import { RxCross1 } from "react-icons/rx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "../../../context/AuthProvider";
import { districts } from "../../../data/districts";
import { BASE_URL } from "../../../utils/baseURL";
import { divisions } from "../../../data/divisions";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import ImageUploader from "./ImageUploader";
import AudioUploader from "./AudioUploader";
const AddNews = ({
  categoryData,
  subCategoryData: subCategories,
  todayNewsData,
  isLoadingTodayNews,
  refetch,
  setIsAddModalOpen,
  token,
}) => {
  const { user } = useContext(AuthContext);
  const {
    register,
    // reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [breakingNews, setBreakingNews] = useState(false);
  const [featureNews, setFeatureNews] = useState(false);
  const [latestNews, setLatestNews] = useState(false);
  const [topNews, setTopNews] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [writerImagePreview, setWriterImagePreview] = useState(null);
  const [districtsData, setDistrictsData] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [description, setDescription] = useState("");
  const [todayNews, setTodayNews] = useState(false);
  const [subCategory, setSubCategory] = useState();
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [todayNewsCategoryValue, setTodayNewsCategoryValue] = useState("");
  const [categoryIdForSubCategory, setCategoryIdForSubCategory] = useState("");
  const [isOpenSubCategory, setIsOpenSubCategory] = useState(true);
  const [isOpenDistrict, setIsOpenDistrict] = useState(true);
  const [keywords, setKeywords] = useState([]);
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
    setImagePreview(null); // Clear image preview
    // Clear input value (optional)
    const inputElement = document.getElementById("main_image");
    if (inputElement) {
      inputElement.value = null;
    }
  };
  const handleCancelWriterImage = () => {
    setWriterImagePreview(null); // Clear image preview
    // Clear input value (optional)
    const inputElement = document.getElementById("writer_image");
    if (inputElement) {
      inputElement.value = null;
    }
  };
  const handleCancelAudio = () => {
    setAudioPreview(null); // Clear Audio preview
    // Clear input value (optional)
    const inputElement = document.getElementById("audio_link");
    if (inputElement) {
      inputElement.value = null;
    }
  };
  // Handle Add Category
  const handleDataPost = async (data) => {
    setLoading(true);
    let main_image;
    let image_key;
    let audio_link;
    let audio_key;
    let writer_image;
    let writer_image_key;

    // Check if image is provided before attempting to upload
    if (
      data?.main_image?.length > 0
    ) {
      const imageUpload = await ImageUploader(data?.main_image[0]);
      if (imageUpload[2] == true) {
        main_image = imageUpload[0];
        image_key = imageUpload[1];
      } else {
        toast.error("Image upload failed", {
          autoClose: 1000,
        });
        setLoading(false);
        return;
      }
    }
    
    if (
      data?.writer_image?.length > 0
    ) {
      const imageUpload = await ImageUploader(data?.writer_image[0]);
      if (imageUpload[2] == true) {
        writer_image = imageUpload[0];
        writer_image_key = imageUpload[1];
      } else {
        toast.error("Image upload failed", {
          autoClose: 1000,
        });
        setLoading(false);
        return;
      }
    }

    // Check if image is provided before attempting to upload
    if (
      data?.audio_link?.length > 0
    ) {
      const audioUpload = await AudioUploader(data?.audio_link[0]);
      if (audioUpload[2] == true) {
        audio_link = audioUpload[0];
        audio_key = audioUpload[1];
      } else {
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
      data?.special_news === true ? data?.special_news_serial : undefined;
    const breakingNewsSerial =
      data?.breaking_news === true ? data?.breaking_serial : undefined;
    const featureNewsSerial =
      data?.feature_news === true ? data?.feature_serial : undefined;
    const latestNewsSerial =
      data?.latest_news === true ? data?.latest_serial : undefined;
    const topNewsSerial =
      data?.top_news === true ? data?.top_serial : undefined;

    const sendData = {
      publisher_user_id: user?._id,
      main_image,
      image_key,
      audio_link,
      audio_key,
      writer_image,
      writer_image_key,
      heading: data?.heading,
      category_id: categoryIdForSubCategory,
      sub_category_id: subCategory,
      today_news: data?.today_news,
      today_news_category_id: todayNewsCategory,
      home_position: data?.home_position,
      description: description,
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
      meta_description: data?.meta_description,
      main_image_source: data?.main_image_source
    };

    if (!sendData?.sub_category_id) {
      delete sendData?.sub_category_id;
    }

    // Ensure at least one of main_image or video_link is present
    if (!sendData?.main_image && !sendData?.video_link && !sendData?.audio_link) {
      toast.error("Please upload an image or provide a video link or audio file", {
        autoClose: 1000,
      });
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
      toast.error("Dont upload both audio and video", {
        autoClose: 1000,
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/news?role_type=news_create`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();
      if (result?.statusCode == 200 && result?.success == true) {
        toast.success(
          result?.message ? result?.message : "News created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setIsAddModalOpen(false);
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Network error or server is down", {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
        <form
          onSubmit={handleSubmit(handleDataPost)}
          className="bg-white rounded-lg-lg p-4 space-y-4  xl:w-[1000px] lg:w-[950px] md:w-[760px] sm:w-[600px]  w-[550px]  max-h-[100vh] overflow-y-auto scrollbar-thin"
        >
          <div className="flex items-center justify-between">
            <h3
              className="text-[26px] py-4 font-bold text-gray-800 capitalize"
              id="modal-title"
            >
              Add News Information
            </h3>

            <button
              type="button"
              className="btn bg-white hover:bg-white border p-1"
              onClick={() => setIsAddModalOpen(false)}
              size={25}
            >
              <RxCross1 />
            </button>
          </div>

          {/* News Main image */}
          <div className="relative">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Main Image
            </p>
            {imagePreview &&
              <>
                <img src={imagePreview} alt="Preview" />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 px-2 hover:bg-red-600"
                  onClick={handleCancelImage}
                >
                  X
                </button>
              </>
            }

            <input
              {...register("main_image", {
                validate: {
                  isImage: (value) =>
                    !value.length || // Pass validation if no file is selected
                    (value[0] && value[0].type.startsWith("image/")) ||
                    "Only image or audio files are allowed",
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
              <p className="text-red-600">{errors.main_image_source?.message}</p>
            )}
          </div>

          {/* News Audion Link */}
          {/* <div className="relative">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Main Image
            </p>
            {imagePreview &&
              (fileType.startsWith("audio/") ? (
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
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 px-2 hover:bg-red-600"
                    onClick={handleCancelImage}
                  >
                    X
                  </button>
                </>
              ))}

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
          {/* News Audion Link */}
          <div className="relative">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Audio
            </p>
            {audioPreview &&
              <>
                <audio src={audioPreview} controls />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 px-2 hover:bg-red-600"
                  onClick={handleCancelAudio}
                >
                  X
                </button>
              </>}

            <input
              {...register("audio_link", {
                validate: {
                  isImage: (value) =>
                    !value.length || // Pass validation if no file is selected
                    (value[0] && value[0].type.startsWith("image/")) ||
                    (value[0] && value[0].type.startsWith("audio/")) ||
                    "Only image or audio files are allowed",
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
          <div>
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Video link
            </p>

            <input
              placeholder="Video link"
              {...register("video_link")}
              id="video_link"
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
              type="text"
              className="block w-full  p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
            />
            {errors.heading && (
              <p className="text-red-600">{errors.heading?.message}</p>
            )}
          </div>

          {/* Select category, subcategory,  */}
          <div className="grid sm:grid-cols-2  grid:cols-1  gap-4">
            {" "}
            {/* Select Category */}
            <div>
              <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                Select Category
              </p>
              <Select
                id="category_id"
                name="category_id"
                aria-label="Category Type"
                required
                options={categoryData?.data}
                getOptionLabel={(x) => x?.category_name}
                getOptionValue={(x) => x?._id}
                onChange={(selectedOption) =>
                  handleCategoryToSubCategory(selectedOption)
                }
              ></Select>
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
                  options={subCategoryData}
                  getOptionLabel={(x) => x?.sub_category_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) =>
                    setSubCategory(selectedOption?._id)
                  }
                ></Select>
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
              value={description}
              onChange={setDescription}
            />
          </div>
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
                      return "Spacial News serial must be greater than 0";
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
                className="block w-full p-2.5   text-gray-700 bg-white border border-gray-200 rounded-xl"
              >
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
                options={divisions}
                getOptionLabel={(x) => x?.name}
                getOptionValue={(x) => x?.id}
                onChange={(selectedOption) => {
                  setIsOpenDistrict(false);
                  setDistrict();
                  setDistrictId(selectedOption?.id);
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
            <div>
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
                    {isLoadingTodayNews ? (
                      <MiniSpinner />
                    ) : (
                      <Select
                        id="today_news_category_id"
                        name="today_news_category_id"
                        className=" "
                        required
                        aria-label="Category Type"
                        options={todayNewsData.data}
                        getOptionLabel={(x) => x?.category_name}
                        getOptionValue={(x) => x?._id}
                        onChange={(selectedOption) =>
                          setTodayNewsCategoryValue(selectedOption?._id)
                        }
                      ></Select>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/*Special News  */}
            <div className="">
              {" "}
              <div className="form-control ">
                <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
                  Special News
                </p>
                <label
                  className={`flex items-center cursor-pointer w-full p-2 rounded-lg border ${checked ? "bg-green-500 text-white" : "bg-gray-100"
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
                  // <div>
                  //   <select
                  //     placeholder="Spacial News Value"
                  //     {...register("special_news_serial", {
                  //       required: "Spacial News Value is required",
                  //     })}
                  //     id="special_news_serial"
                  //     type="number"
                  //     className="block w-1/2 p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
                  //   >
                  //     <option value="1">1</option>
                  //     <option value="2">2</option>
                  //     <option value="3">3</option>
                  //   </select>
                  //   {errors.special_news_serial && (
                  //     <p className="text-red-600">
                  //       {errors.special_news_serial?.message}
                  //     </p>
                  //   )}
                  // </div>
                  <div>
                    <input
                      placeholder="Spacial News Serial"
                      {...register("special_news_serial", {
                        required: "Spacial News serial required",
                        validate: (value) => {
                          if (value < 1) {
                            return "Home serial must be greater than 0";
                          }
                        },
                        max: {
                          value: 10,
                          message:
                            "Home serial must be less than or equal to 10",
                        },
                      })}
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
                  className={`flex items-center cursor-pointer w-full p-2 rounded-lg border ${breakingNews ? "bg-green-500 text-white" : "bg-gray-100"
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
                    className={` ${breakingNews ? "text-white" : "text-gray-700"
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
                  className={`flex items-center cursor-pointer w-full p-2 rounded-lg border ${featureNews ? "bg-green-500 text-white" : "bg-gray-100"
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
                    className={` ${featureNews ? "text-white" : "text-gray-700"
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
                  className={`flex items-center cursor-pointer w-full p-2 rounded-lg border ${latestNews ? "bg-green-500 text-white" : "bg-gray-100"
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
                    className={` ${latestNews ? "text-white" : "text-gray-700"
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
                  className={`flex items-center cursor-pointer w-full p-2 rounded-lg border ${topNews ? "bg-green-500 text-white" : "bg-gray-100"
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
              className="block w-full  p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
            />
            {errors.writer_name && (
              <p className="text-red-600">{errors.writer_name?.message}</p>
            )}
          </div>

          {/* writer image */}
          <div className="relative">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Writer Image
            </p>
            {writerImagePreview &&
              <>
                <img src={writerImagePreview} alt="Preview" />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 px-2 hover:bg-red-600"
                  onClick={handleCancelWriterImage}
                >
                  X
                </button>
              </>
            }

            <input
              {...register("writer_image", {
                validate: {
                  isImage: (value) =>
                    !value.length || // Pass validation if no file is selected
                    (value[0] && value[0].type.startsWith("image/")) ||
                    "Only image or audio files are allowed",
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
              className="block w-full  p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
            />
            {errors.meta_title && (
              <p className="text-red-600">{errors.meta_title?.message}</p>
            )}
          </div>


          {/* Meta Description*/}

          <div className="mt-2">
            <p className="ml-1 text-sm font-semibold py-1 text-gray-700">
              Meta Description
            </p>
            <textarea
              rows={5}
              placeholder="Meta Description"
              {...register("meta_description")}
              id="meta_description"
              type="text"
              className="block w-full  p-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg"
            />
            {errors.meta_description && (
              <p className="text-red-600">{errors.meta_description?.message}</p>
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
              Create
            </button>
          )}

          <button
            className="bg-gray-300 ms-2 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg mr-2"
            onClick={() => setIsAddModalOpen(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNews;
