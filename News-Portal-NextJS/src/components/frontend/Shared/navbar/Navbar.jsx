"use client";
import useCategoriesQuery from "../../../../api/getCategoriesForntend";
import { getDate } from "bangla-calendar";
import TopBar from "./TopBar";
import SecondNavbar from "./SecondNavbar";

const Navbar = () => {
  // (settingData);
  const date1 = new Date();
  const bdDate = getDate(date1, {
    format: "D MMMM, YYYY",
    calculationMethod: "BD",
  });

  const banglaDateMonth = new Intl.DateTimeFormat("bn", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  // Hijri (Islamic) date in Arabic format
  const hijriDateInBangla = new Intl.DateTimeFormat("bn-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  // Remove "যুগ" if it appears at the end
  const formattedHijriDate = hijriDateInBangla.replace("যুগ", "").trim();

  const { data: categories = [], isLoading } = useCategoriesQuery();
  return (
    <div className="sticky top-0 z-40  bg-white print:hidden">
      {/* TopBar */}
      <TopBar
        categories={categories}
        isLoading={isLoading}
        banglaDateMonth={banglaDateMonth}
        bdDate={bdDate}
        formattedHijriDate={formattedHijriDate}
      />
      {/* Buttom bar */}
      <SecondNavbar
        categories={categories}
        isLoading={isLoading}
        banglaDateMonth={banglaDateMonth}
        bdDate={bdDate}
        formattedHijriDate={formattedHijriDate}
      />
    </div>
  );
};

export default Navbar;
