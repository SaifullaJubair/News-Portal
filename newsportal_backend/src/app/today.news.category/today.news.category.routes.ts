import express from "express";
import { deleteATodayNewsCategory, findAllDashboardTodayNewsCategory, findAllTodayNewsCategory, findCategoryAllNews, findCategoryLoadMoreAllNews, postTodayNewsCategory, updateTodayNewsCategory } from "./today.news.category.controllers";
import { verifyToken } from "../../middlewares/verify.token";
const router = express.Router();

// Create, Get TodayNewscategory
router
  .route("/")
  .get(findAllTodayNewsCategory)
  .post(verifyToken,
    postTodayNewsCategory
  )
  .patch(verifyToken,
    updateTodayNewsCategory
  )
  .delete(verifyToken, deleteATodayNewsCategory);

// Find All TodayNews Category news
router.route("/category/:today_news_category_id").get(findCategoryAllNews);

// Find All TodayNews Category news
router.route("/category/load_more/:today_news_category_id").get(findCategoryLoadMoreAllNews);

// Find All dashboard TodayNewsCategory
router.route("/dashboard").get(verifyToken, findAllDashboardTodayNewsCategory);

export const TodayNewsCategoryRoutes = router;
