import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import sendResponse from "../../shared/sendResponse";
import { ICategoryInterface } from "./category.interface";
import * as fs from "fs";
import {
  deleteCategoryServices,
  findACategoryExistNewsServices,
  findACategoryExistSubCategoryServices,
  findACategorySerialServices,
  findACategoryServices,
  findACategorySpecialSerialServices,
  findAllCategoryServices,
  findAllDashboardCategoryServices,
  postCategoryServices,
  updateCategoryServices,
} from "./category.services";
import { FileUploadHelper } from "../../helpers/image.upload";
import CategoryModel from "./category.model";
import { ISub_CategoryInterface } from "../sub_category/sub_category.interface";
import { INewsInterface } from "../news/news.interface";

// Add A Category
export const postCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ICategoryInterface | any> => {
  try {
    if (req.files && "category_logo" in req.files && req.body) {
      const requestData = req.body;
      const findCategoryIsExist: ICategoryInterface | null =
        await findACategoryServices(requestData?.category_slug);
      if (findCategoryIsExist) {
        fs.unlinkSync(req.files.category_logo[0].path);
        throw new ApiError(400, "Previously Added !");
      }
      const findCategoryIsExistWithSerial: ICategoryInterface | null =
        await findACategorySerialServices(requestData?.category_serial);
      if (findCategoryIsExistWithSerial) {
        fs.unlinkSync(req.files.category_logo[0].path);
        throw new ApiError(400, "Serial Number Previously Added !");
      }
      if (
        requestData?.special_category == true &&
        !requestData?.special_category_serial
      ) {
        fs.unlinkSync(req.files.category_logo[0].path);
        throw new ApiError(400, "Special Serial Number Need !");
      }
      if (
        requestData?.special_category == false &&
        requestData?.special_category_serial
      ) {
        fs.unlinkSync(req.files.category_logo[0].path);
        throw new ApiError(400, "Special Category Must be need True !");
      }
      if (requestData?.special_category_serial) {
        const findSpecialCategoryIsExistWithSerial: ICategoryInterface | null =
          await findACategorySpecialSerialServices(
            requestData?.special_category_serial
          );
        if (findSpecialCategoryIsExistWithSerial) {
          fs.unlinkSync(req.files.category_logo[0].path);
          throw new ApiError(400, "Special Serial Number Previously Added !");
        }
      }
      // get the category image and upload
      let category_logo;
      let image_key;
      if (req.files && "category_logo" in req.files) {
        const categoryImage = req.files["category_logo"][0];

        const category_logo_upload = await FileUploadHelper.uploadToSpaces(
          categoryImage
        );
        category_logo = category_logo_upload?.Location;
        image_key = category_logo_upload?.Key;
      }
      const data = { ...requestData, category_logo, image_key };
      const result: ICategoryInterface | {} = await postCategoryServices(data);
      if (result) {
        return sendResponse<ICategoryInterface>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Category Added Successfully !",
        });
      } else {
        throw new ApiError(400, "Category Added Failed !");
      }
    } else {
      throw new ApiError(400, "Image Upload Failed");
    }
  } catch (error: any) {
    next(error);
  }
};

// Find All Category
export const findAllCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ICategoryInterface | any> => {
  try {
    const result: ICategoryInterface[] | any = await findAllCategoryServices();
    return sendResponse<ICategoryInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find All dashboard Category
export const findAllDashboardCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ICategoryInterface | any> => {
  try {
    const { page, limit, searchTerm } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const result: ICategoryInterface[] | any =
      await findAllDashboardCategoryServices(limitNumber, skip, searchTerm);
    const total = await CategoryModel.countDocuments();
    return sendResponse<ICategoryInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category Found Successfully !",
      data: result,
      totalData: total,
    });
  } catch (error: any) {
    next(error);
  }
};

// Update A Category
export const updateCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ICategoryInterface | any> => {
  try {
    const requestData = req.body;
    if(!requestData?.show_card && !requestData?.show_title){
      const findCategoryIsExist: ICategoryInterface | null =
      await findACategoryServices(requestData?.category_slug);
    if (
      findCategoryIsExist &&
      requestData?._id !== findCategoryIsExist?._id.toString()
    ) {
      if (req.files && "category_logo" in req.files && req.body) {
        fs.unlinkSync(req.files.category_logo[0].path);
      }
      throw new ApiError(400, "Previously Added !");
    }
    const findCategoryIsExistWithSerial: ICategoryInterface | null =
      await findACategorySerialServices(requestData?.category_serial);
    if (
      findCategoryIsExistWithSerial &&
      requestData?._id !== findCategoryIsExistWithSerial?._id.toString()
    ) {
      if (req.files && "category_logo" in req.files && req.body) {
        fs.unlinkSync(req.files.category_logo[0].path);
      }
      throw new ApiError(400, "Serial Number Previously Added !");
    }
    if (
      requestData?.special_category == true &&
      !requestData?.special_category_serial
    ) {
      if (req.files && "category_logo" in req.files && req.body) {
        fs.unlinkSync(req.files.category_logo[0].path);
      }
      throw new ApiError(400, "Special Serial Number Need !");
    }
    if (
      requestData?.special_category == false &&
      requestData?.special_category_serial != 0
    ) {
      if (req.files && "category_logo" in req.files && req.body) {
        fs.unlinkSync(req.files.category_logo[0].path);
      }
      throw new ApiError(400, "Special Category Must be need True !");
    }
    if (requestData?.special_category_serial != 0) {
      const findSpecialCategoryIsExistWithSerial: ICategoryInterface | null =
        await findACategorySpecialSerialServices(
          requestData?.special_category_serial
        );
      if (
        findSpecialCategoryIsExistWithSerial &&
        requestData?._id !==
          findSpecialCategoryIsExistWithSerial?._id.toString()
      ) {
        if (req.files && "category_logo" in req.files && req.body) {
          fs.unlinkSync(req.files.category_logo[0].path);
        }
        throw new ApiError(400, "Special Serial Number Previously Added !");
      }
    }
    }
    if (req.files && "category_logo" in req.files && req.body) {
      // get the category image and upload
      let category_logo;
      let image_key;
      if (req.files && "category_logo" in req.files) {
        await FileUploadHelper.deleteFromSpaces(requestData?.image_key);
        const categoryImage = req.files["category_logo"][0];
        const category_logo_upload = await FileUploadHelper.uploadToSpaces(
          categoryImage
        );
        category_logo = category_logo_upload?.Location;
        image_key = category_logo_upload?.Key;
      }
      const data = { ...requestData, category_logo, image_key };
      const result: ICategoryInterface | any = await updateCategoryServices(
        data,
        requestData?._id
      );
      if (result?.modifiedCount > 0) {
        return sendResponse<ICategoryInterface>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Category Update Successfully !",
        });
      } else {
        throw new ApiError(400, "Category Update Failed !");
      }
    } else {
      const result: ICategoryInterface | any = await updateCategoryServices(
        requestData,
        requestData?._id
      );
      if (result?.modifiedCount > 0) {
        return sendResponse<ICategoryInterface>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Category Update Successfully !",
        });
      } else {
        throw new ApiError(400, "Category Update Failed !");
      }
    }
  } catch (error: any) {
    next(error);
  }
};

// Delete aCategory
export const deleteACategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ICategoryInterface | any> => {
  try {
    const data = req.body;
    const _id = data?._id;
    const subCategoryExist: ISub_CategoryInterface | null =
      await findACategoryExistSubCategoryServices(_id);
    if (subCategoryExist) {
      throw new ApiError(400, "Already exist in sub category !");
    }
    const categoryExistInNews: INewsInterface | null =
      await findACategoryExistNewsServices(_id);
    if (categoryExistInNews) {
      throw new ApiError(400, "Already exist in news !");
    }
    const result: ICategoryInterface[] | any = await deleteCategoryServices(
      _id
    );

    if (result?.deletedCount > 0) {
      await FileUploadHelper.deleteFromSpaces(data?.image_key);
      return sendResponse<ICategoryInterface>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category Delete Successfully !",
      });
    } else {
      throw new ApiError(400, "Category Delete Failed !");
    }
  } catch (error: any) {
    next(error);
  }
};
