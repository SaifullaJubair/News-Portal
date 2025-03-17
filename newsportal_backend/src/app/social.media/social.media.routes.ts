import express from "express";
import { FileUploadHelper } from "../../helpers/image.upload";
import { deleteASocialMedia, findAllSocialMedia, postSocialMedia, updateSocialMedia } from "./social.media.controllers";
import { verifyToken } from "../../middlewares/verify.token";
const router = express.Router();

// Create, Get SocialMedia
router
  .route("/")
  .get(findAllSocialMedia)
  .post(verifyToken,
    FileUploadHelper.ImageUpload.fields([
      { name: "media_image", maxCount: 1 },
    ]),
    postSocialMedia
  )
  .patch(verifyToken,
    FileUploadHelper.ImageUpload.fields([
      { name: "media_image", maxCount: 1 },
    ]),
    updateSocialMedia
  )
  .delete(verifyToken, deleteASocialMedia);

export const SocialMediaRoutes = router;
