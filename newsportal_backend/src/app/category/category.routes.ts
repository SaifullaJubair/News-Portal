import express from "express";
import {
  deleteACategory,
  findAllCategory,
  findAllDashboardCategory,
  postCategory,
  updateCategory,
} from "./category.controllers";
import { FileUploadHelper } from "../../helpers/image.upload";
import { verifyToken } from "../../middlewares/verify.token";
const router = express.Router();

// Create, Get category
router
  .route("/")
  .get(findAllCategory)
  .post(verifyToken,
    FileUploadHelper.ImageUpload.fields([
      { name: "category_logo", maxCount: 1 },
    ]),
    postCategory
  )
  .patch(verifyToken,
    FileUploadHelper.ImageUpload.fields([
      { name: "category_logo", maxCount: 1 },
    ]),
    updateCategory
  )
  .delete(verifyToken, deleteACategory);

// Find All dashboard Category
router.route("/dashboard").get(verifyToken, findAllDashboardCategory);

export const CategoryRoutes = router;
