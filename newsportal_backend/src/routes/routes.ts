import express from "express";
import { UserRegRoutes } from "../app/user.reg/user.reg.routes";
import { CategoryRoutes } from "../app/category/category.routes";
import { Sub_CategoryRoutes } from "../app/sub_category/sub_category.routes";
import { AdsRoutes } from "../app/ads/ads.routes";
import { RoleRoutes } from "../app/role/role.routes";
import { UserLogRoutes } from "../app/user.login/user.login.routes";
import { UserGetMeRoutes } from "../app/getMe/get.me.routes";
import { TodayNewsCategoryRoutes } from "../app/today.news.category/today.news.category.routes";
import { SocialMediaRoutes } from "../app/social.media/social.media.routes";
import { ImageUploadRoutes } from "../helpers/frontend/imageUpload/imageUpload.routes";
import { NewsRoutes } from "../app/news/news.routes";
import { SiteSettingRoutes } from "../app/site_setting/site_setting.routes";
import { AudioUploadRoutes } from "../helpers/frontend/audioUpload/audioUpload.routes";
import { OnlineJoripRoutes } from "../app/online_jorip/online_jorip.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/userReg",
    route: UserRegRoutes,
  },
  {
    path: "/userLog",
    route: UserLogRoutes,
  },
  {
    path: "/getMe",
    route: UserGetMeRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/sub_category",
    route: Sub_CategoryRoutes,
  },
  {
    path: "/ads",
    route: AdsRoutes,
  },
  {
    path: "/role",
    route: RoleRoutes,
  },
  {
    path: "/today_news_category",
    route: TodayNewsCategoryRoutes,
  },
  {
    path: "/social_media",
    route: SocialMediaRoutes,
  },
  {
    path: "/image_upload",
    route: ImageUploadRoutes,
  },
  {
    path: "/audio_upload",
    route: AudioUploadRoutes,
  },
  {
    path: "/news",
    route: NewsRoutes,
  },
  {
    path: "/siteSetting",
    route: SiteSettingRoutes,
  },
  {
    path: "/online_jorip",
    route: OnlineJoripRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
