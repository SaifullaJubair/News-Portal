import express from "express";
import {
  deleteANews,
  findACategoryAndAllSubCategoryNews,
  findAllArchiveNews,
  findAllBreakingNews,
  findAllCategoryNews,
  findAllDashboardNews,
  findAllFeatureNews,
  findAllLatestCreateNews,
  findAllLatestNews,
  findAllLatestNewsWithIfCategoryAndSubCategory,
  findAllShowCardCategoryNews,
  findAllSpecialCategoryNews,
  findAllSpecialNews,
  findAllSubCategoryNews,
  findAllTopNews,
  findARandomlySingleNews,
  findASingleArchiveNews,
  findASingleNews,
  postNews,
  updateNews,
} from "./news.controllers";
import { verifyToken } from "../../middlewares/verify.token";
const router = express.Router();

// Create, Get News
router.route("/").get(findAllShowCardCategoryNews).post(verifyToken, postNews).patch(verifyToken, updateNews).delete(verifyToken, deleteANews);

// get special_category news
router.route("/special_category_news").get(findAllSpecialCategoryNews);

// get breaking news
router.route("/breaking").get(findAllBreakingNews);

// get feature news
router.route("/feature").get(findAllFeatureNews);

// get latest news
router.route("/latest").get(findAllLatestNews);

// get top news
router.route("/top").get(findAllTopNews);

// get special news
router.route("/special").get(findAllSpecialNews);

// get latest_create news
router.route("/latest_create").get(findAllLatestCreateNews);

// Find A category his sub category and sub category News
router.route("/category_sub_category_news/:category_slug").get(findACategoryAndAllSubCategoryNews);

// get A randomly Single category match news
router.route("/random_category_news/:category_slug").get(findARandomlySingleNews);

// get Category news
router.route("/all_category/:category_id").get(findAllCategoryNews);

// get SubCategory news
router.route("/all_sub_category/:sub_category_id").get(findAllSubCategoryNews);

// get all news news
router.route("/all_news").get(findAllLatestNewsWithIfCategoryAndSubCategory);

// get all archive news
router.route("/archive").post(findAllArchiveNews);

// get A Single archive news
router.route("/archive_details/:_id").get(findASingleArchiveNews);

// get dashboard news
router.route("/dashboard").get(verifyToken, findAllDashboardNews);

// get A Single news
router.route("/:_id").get(findASingleNews);

export const NewsRoutes = router;
