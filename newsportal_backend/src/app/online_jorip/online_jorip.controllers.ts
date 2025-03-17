import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import sendResponse from "../../shared/sendResponse";
import { FileUploadHelper } from "../../helpers/image.upload";
import { IOnlineJoripInterface } from "./online_jorip.interface";
import OnlineJoripModel from "./online_jorip.model";
import {
  deleteOnlineJoripServices,
  findAllDashboardOnlineJoripServices,
  findAllOnlineJoripServices,
  findAOnlineJoripServices,
  findTwoOnlineJoripServices,
  postOnlineJoripServices,
  updateOnlineJoripServices,
} from "./online_jorip.services";

// Add A OnlineJorip
export const postOnlineJorip: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IOnlineJoripInterface | any> => {
  try {
    if (req.files && "online_jorip_image" in req.files && req.body) {
      const requestData = req.body;
      // get the OnlineJorip image and upload
      let online_jorip_image;
      let image_key;
      if (req.files && "online_jorip_image" in req.files) {
        const OnlineJoripImage = req.files["online_jorip_image"][0];

        const online_jorip_image_upload = await FileUploadHelper.uploadToSpaces(
          OnlineJoripImage
        );
        online_jorip_image = online_jorip_image_upload?.Location;
        image_key = online_jorip_image_upload?.Key;
      }
      const data = { ...requestData, online_jorip_image, image_key };
      let social_image;
      let social_image_key;
      if (req.files && "social_image" in req.files) {
        const OnlineJoripImage = req.files["social_image"][0];

        const social_image_upload = await FileUploadHelper.uploadToSpaces(
          OnlineJoripImage
        );
        social_image = social_image_upload?.Location;
        social_image_key = social_image_upload?.Key;
      }
      if (social_image_key) data.social_image_key = social_image_key;
      if (social_image) data.social_image = social_image;
      const result: IOnlineJoripInterface | {} = await postOnlineJoripServices(
        data
      );
      if (result) {
        return sendResponse<IOnlineJoripInterface>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "OnlineJorip Added Successfully !",
        });
      } else {
        throw new ApiError(400, "OnlineJorip Added Failed !");
      }
    } else {
      throw new ApiError(400, "Image Upload Failed");
    }
  } catch (error: any) {
    next(error);
  }
};

// Find Two OnlineJorip
export const findTwoOnlineJorip: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IOnlineJoripInterface | any> => {
  try {
    const result: IOnlineJoripInterface[] | any =
      await findTwoOnlineJoripServices();
    return sendResponse<IOnlineJoripInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OnlineJorip Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find A OnlineJorip
export const findAOnlineJorip: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IOnlineJoripInterface | any> => {
  try {
    const _id = req.params?._id;
    const result: IOnlineJoripInterface[] | any =
      await findAOnlineJoripServices(_id);
    return sendResponse<IOnlineJoripInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Online Jorip Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find All OnlineJorip
export const findAllOnlineJorip: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IOnlineJoripInterface | any> => {
  try {
    const { page, limit } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const result: IOnlineJoripInterface[] | any =
      await findAllOnlineJoripServices(limitNumber, skip);
    const total = await OnlineJoripModel.countDocuments();
    return sendResponse<IOnlineJoripInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OnlineJorip Found Successfully !",
      data: result,
      totalData: total,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find All dashboard OnlineJorip
export const findAllDashboardOnlineJorip: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IOnlineJoripInterface | any> => {
  try {
    const { page, limit, searchTerm } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const result: IOnlineJoripInterface[] | any =
      await findAllDashboardOnlineJoripServices(limitNumber, skip, searchTerm);
    const total = await OnlineJoripModel.countDocuments();
    return sendResponse<IOnlineJoripInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OnlineJorip Found Successfully !",
      data: result,
      totalData: total,
    });
  } catch (error: any) {
    next(error);
  }
};

// Update A OnlineJorip
export const updateOnlineJorip: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IOnlineJoripInterface | any> => {
  try {
    const requestData = req.body;
    if (req.files && "online_jorip_image" in req.files && req.body) {
      // get the OnlineJorip image and upload
      let online_jorip_image;
      let image_key;
      if (req.files && "online_jorip_image" in req.files) {
        await FileUploadHelper.deleteFromSpaces(requestData?.image_key);
        const OnlineJoripImage = req.files["online_jorip_image"][0];
        const online_jorip_image_upload = await FileUploadHelper.uploadToSpaces(
          OnlineJoripImage
        );
        online_jorip_image = online_jorip_image_upload?.Location;
        image_key = online_jorip_image_upload?.Key;
      }
      const data = { ...requestData, online_jorip_image, image_key };
      let social_image;
      let social_image_key;
      if (req.files && "social_image" in req.files) {
        const OnlineJoripImage = req.files["social_image"][0];

        const social_image_upload = await FileUploadHelper.uploadToSpaces(
          OnlineJoripImage
        );
        social_image = social_image_upload?.Location;
        social_image_key = social_image_upload?.Key;
      }
      if (social_image_key) data.social_image_key = social_image_key;
      if (social_image) data.social_image = social_image;
      const result: IOnlineJoripInterface | any =
        await updateOnlineJoripServices(data, requestData?._id);
      if (result?.modifiedCount > 0) {
        return sendResponse<IOnlineJoripInterface>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "OnlineJorip Update Successfully !",
        });
      } else {
        throw new ApiError(400, "OnlineJorip Update Failed !");
      }
    } else {
      const result: IOnlineJoripInterface | any =
        await updateOnlineJoripServices(requestData, requestData?._id);
      if (result?.modifiedCount > 0) {
        return sendResponse<IOnlineJoripInterface>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "OnlineJorip Update Successfully !",
        });
      } else {
        throw new ApiError(400, "OnlineJorip Update Failed !");
      }
    }
  } catch (error: any) {
    next(error);
  }
};

// Delete aOnlineJorip
export const deleteAOnlineJorip: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IOnlineJoripInterface | any> => {
  try {
    const data = req.body;
    const _id = data?._id;
    const result: IOnlineJoripInterface[] | any =
      await deleteOnlineJoripServices(_id);

    if (result?.deletedCount > 0) {
      await FileUploadHelper.deleteFromSpaces(data?.image_key);
      return sendResponse<IOnlineJoripInterface>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "OnlineJorip Delete Successfully !",
      });
    } else {
      throw new ApiError(400, "OnlineJorip Delete Failed !");
    }
  } catch (error: any) {
    next(error);
  }
};
