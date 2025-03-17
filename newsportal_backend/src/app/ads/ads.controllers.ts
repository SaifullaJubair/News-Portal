import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import sendResponse from "../../shared/sendResponse";
import * as fs from "fs";
import { FileUploadHelper } from "../../helpers/image.upload";
import { IAdsInterface } from "./ads.interface";
import {
  deleteAdsServices,
  findAAdsSerialServices,
  findAllAdsServices,
  findAllDashboardAdsServices,
  postAdsServices,
  updateAdsServices,
} from "./ads.services";
import AdsModel from "./ads.model";

// Add A Ads
export const postAds: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IAdsInterface | any> => {
  try {
    if (req.files && "ads_image" in req.files && req.body) {
      const requestData = req.body;
      const totalAds = await AdsModel.countDocuments();
      if(totalAds > 25){
        fs.unlinkSync(req.files.ads_image[0].path);
        throw new ApiError(400, "Ads Limit Exceeded !");
      }
      const findAdsIsExistWithSerial: IAdsInterface | null =
        await findAAdsSerialServices(requestData?.ads_serial);
      if (findAdsIsExistWithSerial) {
        fs.unlinkSync(req.files.ads_image[0].path);
        throw new ApiError(400, "Serial Number Previously Added !");
      }
      // get the Ads image and upload
      let ads_image;
      let image_key;
      if (req.files && "ads_image" in req.files) {
        const AdsImage = req.files["ads_image"][0];

        const ads_image_upload = await FileUploadHelper.uploadToSpaces(
          AdsImage
        );
        ads_image = ads_image_upload?.Location;
        image_key = ads_image_upload?.Key;
      }
      const data = { ...requestData, ads_image, image_key };
      const result: IAdsInterface | {} = await postAdsServices(data);
      if (result) {
        return sendResponse<IAdsInterface>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Ads Added Successfully !",
        });
      } else {
        throw new ApiError(400, "Ads Added Failed !");
      }
    } else {
      throw new ApiError(400, "Image Upload Failed");
    }
  } catch (error: any) {
    next(error);
  }
};

// Find All Ads
export const findAllAds: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IAdsInterface | any> => {
  try {
    const result: IAdsInterface[] | any = await findAllAdsServices();
    return sendResponse<IAdsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Ads Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find All dashboard Ads
export const findAllDashboardAds: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IAdsInterface | any> => {
  try {
    const { page, limit, searchTerm } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const result: IAdsInterface[] | any = await findAllDashboardAdsServices(
      limitNumber,
      skip,
      searchTerm
    );
    const total = await AdsModel.countDocuments();
    return sendResponse<IAdsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Ads Found Successfully !",
      data: result,
      totalData: total,
    });
  } catch (error: any) {
    next(error);
  }
};

// Update A Ads
export const updateAds: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IAdsInterface | any> => {
  try {
    const requestData = req.body;
    const findAdsIsExistWithSerial: IAdsInterface | null =
      await findAAdsSerialServices(requestData?.ads_serial);
    if (
      findAdsIsExistWithSerial &&
      requestData?._id !== findAdsIsExistWithSerial?._id.toString()
    ) {
      if (req.files && "ads_image" in req.files && req.body) {
        fs.unlinkSync(req.files.ads_image[0].path);
      }
      throw new ApiError(400, "Serial Number Previously Added !");
    }
    if (req.files && "ads_image" in req.files && req.body) {
      // get the Ads image and upload
      let ads_image;
      let image_key;
      if (req.files && "ads_image" in req.files) {
        await FileUploadHelper.deleteFromSpaces(requestData?.image_key);
        const AdsImage = req.files["ads_image"][0];
        const ads_image_upload = await FileUploadHelper.uploadToSpaces(
          AdsImage
        );
        ads_image = ads_image_upload?.Location;
        image_key = ads_image_upload?.Key;
      }
      const data = { ...requestData, ads_image, image_key };
      const result: IAdsInterface | any = await updateAdsServices(
        data,
        requestData?._id
      );
      if (result?.modifiedCount > 0) {
        return sendResponse<IAdsInterface>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Ads Update Successfully !",
        });
      } else {
        throw new ApiError(400, "Ads Update Failed !");
      }
    } else {
      const result: IAdsInterface | any = await updateAdsServices(
        requestData,
        requestData?._id
      );
      if (result?.modifiedCount > 0) {
        return sendResponse<IAdsInterface>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Ads Update Successfully !",
        });
      } else {
        throw new ApiError(400, "Ads Update Failed !");
      }
    }
  } catch (error: any) {
    next(error);
  }
};

// Delete a Ads;
export const deleteAAds: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IAdsInterface | any> => {
  try {
    const data = req.body;
    const _id = data?._id;
    const result: IAdsInterface[] | any = await deleteAdsServices(_id);

    if (result?.deletedCount > 0) {
      await FileUploadHelper.deleteFromSpaces(data?.image_key);
      return sendResponse<IAdsInterface>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Ads Delete Successfully !",
      });
    } else {
      throw new ApiError(400, "Ads Delete Failed !");
    }
  } catch (error: any) {
    next(error);
  }
};
