import useCategoriesQuery from "../../../../api/getCategoriesForntend";
import { getDate } from "bangla-calendar";
import SecondNavbar from "./SecondNavbar";
import TopBar from "./TopBar";

const Navbar = () => {
  // console.log(settingData);
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

  const { data: categories = [], isLoading } = useCategoriesQuery();
  return (
    <div className="sticky top-0 z-40  bg-white">
      {/* TopBar */}
      <TopBar
        categories={categories}
        isLoading={isLoading}
        banglaDateMonth={banglaDateMonth}
        bdDate={bdDate}
      />

      {/* Buttom bar */}
      <SecondNavbar
        categories={categories}
        isLoading={isLoading}
        banglaDateMonth={banglaDateMonth}
        bdDate={bdDate}
      />
    </div>
  );
};

export default Navbar;
