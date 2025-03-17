import express from "express";
import { FileUploadHelper } from "../../image.upload";
import { postAudioUpload } from "./audioUpload.controllers";
const router = express.Router();

router
  .route("/")
  .post(
    FileUploadHelper.AudioUpload.fields([{ name: "audio", maxCount: 1 }]),
    postAudioUpload
  );

  export const AudioUploadRoutes = router;
