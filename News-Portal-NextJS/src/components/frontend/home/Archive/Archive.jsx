"use client";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Select from "react-select";
import LatestNews from "../../latestNews/LatestNews";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../utils/baseURL";
import MiniSpinner from "../../../../shared/loader/MiniSpinner";
const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2024; // You can set your starting year here
  const yearOptions = [];

  for (let year = startYear; year <= currentYear; year++) {
    yearOptions.push({ value: year, label: year });
  }

  return yearOptions;
};
const Archive = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedEdition, setSelectedEdition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const dateOptions = Array.from({ length: 31 }, (v, k) => ({
    value: k + 1,
    label: k + 1 < 10 ? `0${k + 1}` : k + 1,
  }));

  const monthOptions = [
    { value: "1", label: "জানুয়ারী" },
    { value: "2", label: "ফেব্রুয়ারী" },
    { value: "3", label: "মার্চ" },
    { value: "4", label: "এপ্রিল" },
    { value: "5", label: "মে" },
    { value: "6", label: "জুন" },
    { value: "7", label: "জুলাই" },
    { value: "8", label: "আগস্ট" },
    { value: "9", label: "সেপ্টেম্বর" },
    { value: "10", label: "অক্টোবর" },
    { value: "11", label: "নভেম্বর" },
    { value: "12", label: "ডিসেম্বর" },
  ];
  const editionOption = [
    { value: "online", label: "অনলাইন সংস্করণ" },
    { value: "print", label: "প্রিন্ট সংস্করণ" },
  ];

  const yearOptions = generateYearOptions();
  const handleSubmit = async () => {
    setLoading(true);
    if (selectedDate && selectedMonth && selectedYear && selectedEdition) {
      const formattedDate = `${selectedDate.value}/${selectedMonth.value}/${selectedYear.value}`;
      const edition = selectedEdition.value;

      const requestBody = {
        date: formattedDate,
        edition: edition,
      };

      try {
        const response = await fetch(`${BASE_URL}/news/archive`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const result = await response.json();
          const data = result?.data;
          const filteredData = data?.filter(
            (item) => item?.news && item?.news?.length > 0
          );
          setNewsList(filteredData);
        }
      } catch (error) {
        toast.error("An error occurred while submitting data.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please select a date, month, year, and edition.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto w-[95%]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="cols-span-1 sm:col-span-2">
          <div className="flex items-center mt-4 mb-2 gap-2 text-sm flex-wrap">
            <Link to="/">
              <FaHome size={20} />
            </Link>{" "}
            <span>/</span>
            <NavLink to="/archive" className="font-semibold text-lg">
              আর্কাইভ
            </NavLink>
          </div>
          <hr />

          <div className="flex sm:flex-row items-center sm:space-x-6 my-6 space-y-4  flex-col">
            <Select
              options={dateOptions}
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder="তারিখ"
              className="w-full mt-4"
            />
            <Select
              options={monthOptions}
              value={selectedMonth}
              onChange={setSelectedMonth}
              placeholder="মাস"
              className="w-full"
            />
            <Select
              options={yearOptions}
              className="w-full"
              value={selectedYear}
              onChange={setSelectedYear}
              placeholder="বছর"
            />
            <Select
              options={editionOption}
              value={selectedEdition}
              onChange={setSelectedEdition}
              placeholder="সংস্করণ"
              className="w-full"
            />
            {loading ? (
              <button
                className="text-white px-4 py-2 rounded bg-primaryMediumLightColor "
                disabled
              >
                <MiniSpinner />
              </button>
            ) : (
              <button
                className={`text-white px-4 py-2 rounded ${
                  !selectedDate ||
                  !selectedMonth ||
                  !selectedYear ||
                  !selectedEdition
                    ? "bg-gray-400" // Disabled state background color
                    : "bg-primaryMediumLightColor hover:bg-primaryLightColor"
                }`}
                onClick={handleSubmit}
                disabled={
                  !selectedDate ||
                  !selectedMonth ||
                  !selectedYear ||
                  !selectedEdition
                }
              >
                সাবমিট
              </button>
            )}
          </div>
          {/* Archived News */}

          {!loading && newsList?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedEdition?.value == "online"
                ? newsList?.map((item, index) => (
                    <div
                      key={index}
                      className="border-gray-400 border bg-[#F9F9F9] max-h-80 overflow-y-auto  scrollbar-thin "
                    >
                      <Link to={`/${item?.categoryDetails?.category_slug}`}>
                        <p className="px-4 py-1.5 bg-black text-sm text-white ">
                          {item?.categoryDetails?.category_name}
                        </p>
                      </Link>
                      <div>
                        {item?.news?.map((newsItem, newsIndex) => (
                          <div key={newsIndex}>
                            <Link
                              to={`/${item?.categoryDetails?.category_slug}/${newsItem._id}`}
                              className="m-3 text-sm font-semibold line-clamp-1 hover:bg-gray-200 "
                            >
                              {newsIndex + 1}. {newsItem?.heading}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                : newsList?.map((item, index) => (
                    <div
                      key={index}
                      className="border-gray-400 border bg-[#F9F9F9] max-h-80 overflow-y-auto  scrollbar-thin "
                    >
                      <Link
                        to={`/today-news/${item?.categoryDetails?.category_slug}`}
                      >
                        <p className="px-4 py-1.5 bg-black text-sm text-white ">
                          {item?.categoryDetails?.category_name}
                        </p>
                      </Link>
                      <div>
                        {item?.news?.map((newsItem, newsIndex) => (
                          <div key={newsIndex}>
                            <Link
                              to={`/${item?.categoryDetails?.category_slug}/${newsItem?._id}`}
                              className="m-3 text-sm font-semibold line-clamp-1 hover:bg-gray-200 "
                            >
                              {newsIndex + 1}. {newsItem?.heading}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
            </div>
          ) : (
            <p>No news found for the selected date</p>
          )}
        </div>
        {/* Latest News */}
        <div className="mt-2">
          <LatestNews />
        </div>
      </div>
    </div>
  );
};

export default Archive;
