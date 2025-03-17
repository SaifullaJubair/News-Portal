
import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { FileUploadHelper } from "../../image.upload";
import sendResponse from "../../../shared/sendResponse";
import ApiError from "../../../errors/ApiError";

// post a Audio
export const postAudioUpload: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) =>  {
  try {
    if (req.files && "audio" in req.files) {
      const audioData = req.files["audio"][0];
      const audio_upload = await FileUploadHelper.AudioUploader(audioData);
      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Audio upload successfully !",
        data: audio_upload,
      });
    } else {
      throw new ApiError(400, "Audio Upload Failed !");
    }
  } catch (error) {
    next(error);
  }
};
