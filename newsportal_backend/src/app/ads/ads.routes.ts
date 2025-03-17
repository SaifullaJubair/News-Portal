import express from "express";
import { FileUploadHelper } from "../../helpers/image.upload";
import { deleteAAds, findAllAds, findAllDashboardAds, postAds, updateAds } from "./ads.controllers";
import { verifyToken } from "../../middlewares/verify.token";
const router = express.Router();

// Create, Get Ads
router
  .route("/")
  .get(findAllAds)
  .post(verifyToken,
    FileUploadHelper.ImageUpload.fields([
      { name: "ads_image", maxCount: 1 },
    ]),
    postAds
  )
  .patch(verifyToken,
    FileUploadHelper.ImageUpload.fields([
      { name: "ads_image", maxCount: 1 },
    ]),
    updateAds
  )
  .delete(verifyToken, deleteAAds);

// Find All dashboard Ads
router.route("/dashboard").get(verifyToken, findAllDashboardAds);

export const AdsRoutes = router;
