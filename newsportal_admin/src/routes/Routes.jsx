import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Signin from "../pages/signin/Signin";
import NotFound from "../shared/notFound/NotFound";
import Category from "../pages/dashboard/category/Category";
import SubCategory from "../pages/dashboard/subCategory/SubCategory";
import Ads from "../pages/dashboard/ads/Ads";
import TodayNewsCategory from "../pages/dashboard/todayNewsCategory/TodayNewsCategory";
import SocialMediaDashboard from "../pages/dashboard/socialMediaDashboard/SocialMediaDashboard";
import AllStaff from "../pages/dashboard/staff/AllStaff";
import StaffPermission from "../pages/dashboard/staff/StaffPermission";
import News from "../pages/dashboard/news/News";
import PrivateRoute from "./privateRoute/PrivateRoute";
import SiteSetting from "../pages/dashboard/setting/SiteSetting";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/frontend/home/HomePage";
import DashBoardHome from "../pages/dashboard/home/DashBoardHome";
import NewsDetailsPage from "../pages/frontend/newsDetailsPage/NewsDetailsPage";
import AllNewsPage from "../pages/frontend/all-news/AllNewsPage";
import CategoryNewsPage from "../pages/frontend/categoryNewsPage/CategoryNewsPage";
import SubCategoryNewsPage from "../pages/frontend/subCategoryNewsPage/SubCategoryNewsPage";
import ArchivePage from "../pages/frontend/archivePage/ArchivePage";
import SocialMediaPage from "../pages/frontend/socialMediaPage/SocialMediaPage";
import TodayNewsPage from "../pages/frontend/todayNewsPage/TodayNewsPage";
import BanglaConverter from "../pages/frontend/banglaConverter/BanglaConverter";
import TermAndCondition from "../pages/frontend/TermsAndCondition/TermAndConditionPage";
import AboutUSPage from "../pages/frontend/AboutUs/AboutUSPage";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import AddServicePage from "../pages/frontend/AddServicePage/AddServicePage";
import ContactUs from "../pages/frontend/ContactUs/ContactUs";
import OnlineJorip from "../pages/dashboard/OnlineJorip/OnlineJorip";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      // all news page
      {
        path: "/all-news",
        element: <AllNewsPage />,
      },
      {
        path: "/social-media",
        element: <SocialMediaPage />,
      },
      {
        path: "/archive",
        element: <ArchivePage />,
      },
      // news details
      {
        path: "/:category/:id",
        element: <NewsDetailsPage />,
      },

      //  category news page

      {
        path: "/:category_slug",
        element: <CategoryNewsPage />,
      },

      // sub category news page
      {
        path: "/category/:category_slug/:sub_category_slug",
        element: <SubCategoryNewsPage />,
      },
      {
        path: "/today-news",
        element: <TodayNewsPage />,
      },
      {
        path: "/bangla_converter",
        element: <BanglaConverter />,
      },
      {
        path: "/about-us",
        element: <AboutUSPage />,
      },
      {
        path: "/ads-details",
        element: <AddServicePage />,
      },

      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermAndCondition />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <Signin />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayout />
      </PrivateRoute>
      // <DashboardLayout />
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/admin",
        element: <DashBoardHome />,
      },
      {
        path: "/admin/category",
        element: <Category />,
      },
      {
        path: "/admin/sub-category",
        element: <SubCategory />,
      },
      {
        path: "/admin/ads",
        element: <Ads />,
      },
      {
        path: "/admin/jorip",
        element: <OnlineJorip />,
      },
      {
        path: "/admin/today-news-category",
        element: <TodayNewsCategory />,
      },
      {
        path: "/admin/social-media",
        element: <SocialMediaDashboard />,
      },
      {
        path: "/admin/all-staff",
        element: <AllStaff />,
      },
      {
        path: "/admin/staff-permission",
        element: <StaffPermission />,
      },
      {
        path: "/admin/news",
        element: <News />,
      },
      {
        path: "/admin/setting",
        element: <SiteSetting />,
      },
    ],
  },
]);

export default router;
