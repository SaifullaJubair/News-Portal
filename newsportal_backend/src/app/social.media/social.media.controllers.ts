import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import sendResponse from "../../shared/sendResponse";
import * as fs from "fs";
import { FileUploadHelper } from "../../helpers/image.upload";
import { ISocialMediaInterface } from "./social.media.interface";
import { deleteSocialMediaServices, findAllSocialMediaServices, postSocialMediaServices, updateSocialMediaServices } from "./social.media.services";

// Add A SocialMedia
export const postSocialMedia: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ISocialMediaInterface | any> => {
  try {
    if (req.files && "media_image" in req.files && req.body) {
      const requestData = req.body;
       // Parse media_page_link if it's a string
      //  if (requestData.media_page_link) {
      //   requestData.media_page_link = JSON.parse(requestData.media_page_link);
      // }
      // get the SocialMedia image and upload
      let media_image;
      let image_key;
      if (req.files && "media_image" in req.files) {
        const SocialMediaImage = req.files["media_image"][0];

        const media_image_upload = await FileUploadHelper.uploadToSpaces(
          SocialMediaImage
        );
        media_image = media_image_upload?.Location;
        image_key = media_image_upload?.Key;
      }
      const data = { ...requestData, media_image, image_key };
      const result: ISocialMediaInterface | {} = await postSocialMediaServices(data);
      if (result) {
        return sendResponse<ISocialMediaInterface>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Social Media Added Successfully !",
        });
      } else {
        throw new ApiError(400, "Social Media Added Failed !");
      }
    } else {
      throw new ApiError(400, "Image Upload Failed");
    }
  } catch (error: any) {
    next(error);
  }
};

// Find All SocialMedia
export const findAllSocialMedia: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ISocialMediaInterface | any> => {
  try {
    const result: ISocialMediaInterface[] | any = await findAllSocialMediaServices();
    return sendResponse<ISocialMediaInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Social Media Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Update A SocialMedia
export const updateSocialMedia: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ISocialMediaInterface | any> => {
  try {
    const requestData = req.body;
    if (req.files && "media_image" in req.files && req.body) {
      // get the SocialMedia image and upload
      let media_image;
      let image_key;
      if (req.files && "media_image" in req.files) {
        await FileUploadHelper.deleteFromSpaces(requestData?.image_key);
        const SocialMediaImage = req.files["media_image"][0];
        const media_image_upload = await FileUploadHelper.uploadToSpaces(
          SocialMediaImage
        );
        media_image = media_image_upload?.Location;
        image_key = media_image_upload?.Key;
      }
      const data = { ...requestData, media_image, image_key };
      const result: ISocialMediaInterface | any = await updateSocialMediaServices(
        data,
        requestData?._id
      );
      if (result?.modifiedCount > 0) {
        return sendResponse<ISocialMediaInterface>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Social Media Update Successfully !",
        });
      } else {
        throw new ApiError(400, "Social Media Update Failed !");
      }
    } else {
      const result: ISocialMediaInterface | any = await updateSocialMediaServices(
        requestData,
        requestData?._id
      );
      if (result?.modifiedCount > 0) {
        return sendResponse<ISocialMediaInterface>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Social Media Update Successfully !",
        });
      } else {
        throw new ApiError(400, "Social Media Update Failed !");
      }
    }
  } catch (error: any) {
    next(error);
  }
};

// Delete aSocialMedia
export const deleteASocialMedia: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ISocialMediaInterface | any> => {
  try {
    const data = req.body;
    const _id = data?._id;
    const result: ISocialMediaInterface[] | any = await deleteSocialMediaServices(
      _id
    );

    if (result?.deletedCount > 0) {
      await FileUploadHelper.deleteFromSpaces(data?.image_key);
      return sendResponse<ISocialMediaInterface>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Social Media Delete Successfully !",
      });
    } else {
      throw new ApiError(400, "Social Media Delete Failed !");
    }
  } catch (error: any) {
    next(error);
  }
};
