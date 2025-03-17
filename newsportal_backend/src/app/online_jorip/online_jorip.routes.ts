import express from "express";
import { FileUploadHelper } from "../../helpers/image.upload";
import { verifyToken } from "../../middlewares/verify.token";
import {
  deleteAOnlineJorip,
  findAllDashboardOnlineJorip,
  findAllOnlineJorip,
  findAOnlineJorip,
  findTwoOnlineJorip,
  postOnlineJorip,
  updateOnlineJorip,
} from "./online_jorip.controllers";
const router = express.Router();

// Create, Get OnlineJorip
router
  .route("/")
  .get(findTwoOnlineJorip)
  .post(
    verifyToken,
    FileUploadHelper.ImageUpload.fields([
      { name: "online_jorip_image", maxCount: 1 },
      { name: "social_image", maxCount: 1 },
    ]),
    postOnlineJorip
  )
  .patch(
    FileUploadHelper.ImageUpload.fields([
      { name: "online_jorip_image", maxCount: 1 },
      { name: "social_image", maxCount: 1 },
    ]),
    updateOnlineJorip
  )
  .delete(verifyToken, deleteAOnlineJorip);

// Find Two OnlineJorip
router.route("/all").get(findAllOnlineJorip);

// Find All dashboard OnlineJorip
router.route("/dashboard").get(verifyToken, findAllDashboardOnlineJorip);

// Find A OnlineJorip
router.route("/:_id").get(findAOnlineJorip);

export const OnlineJoripRoutes = router;
