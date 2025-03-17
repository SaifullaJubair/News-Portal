import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import sendResponse from "../../shared/sendResponse";
import { ITodayNewsCategoryInterface } from "./today.news.category.interface";
import {
  deleteTodayNewsCategoryServices,
  findATodayNewsCategoryExistNewsServices,
  findATodayNewsCategorySerialServices,
  findATodayNewsCategoryServices,
  findAllDashboardTodayNewsCategoryServices,
  findAllTodayNewsCategoryServices,
  findCategoryAllNewsServices,
  findCategoryLoadMoreAllNewsServices,
  postTodayNewsCategoryServices,
  updateTodayNewsCategoryServices,
} from "./today.news.category.services";
import TodayNewsCategoryModel from "./today.news.category.model";
import { INewsInterface } from "../news/news.interface";

// Add A TodayNewsCategory
export const postTodayNewsCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ITodayNewsCategoryInterface | any> => {
  try {
    const requestData = req.body;
    const findTodayNewsCategoryIsExist: ITodayNewsCategoryInterface | null =
      await findATodayNewsCategoryServices(requestData?.category_slug);
    if (findTodayNewsCategoryIsExist) {
      throw new ApiError(400, "Previously Added !");
    }
    const findTodayNewsCategoryIsExistWithSerial: ITodayNewsCategoryInterface | null =
      await findATodayNewsCategorySerialServices(requestData?.category_serial);
    if (findTodayNewsCategoryIsExistWithSerial) {
      throw new ApiError(400, "Serial Number Previously Added !");
    }

    const result: ITodayNewsCategoryInterface | {} =
      await postTodayNewsCategoryServices(requestData);
    if (result) {
      return sendResponse<ITodayNewsCategoryInterface>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Today News Category Added Successfully !",
      });
    } else {
      throw new ApiError(400, "Today News Category Added Failed !");
    }
  } catch (error: any) {
    next(error);
  }
};

// Find All TodayNewsCategory
export const findAllTodayNewsCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ITodayNewsCategoryInterface | any> => {
  try {
    const result: ITodayNewsCategoryInterface[] | any =
      await findAllTodayNewsCategoryServices();
    return sendResponse<ITodayNewsCategoryInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Today News Category Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find All Category News
export const findCategoryAllNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const { today_news_category_id } = req.params;
    const result: INewsInterface[] | any = await findCategoryAllNewsServices(
      today_news_category_id
    );
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "News Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
// Find All Load More Category News
export const findCategoryLoadMoreAllNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const { today_news_category_id } = req.params;
    const { page, limit=10 } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const result: INewsInterface[] | any = await findCategoryLoadMoreAllNewsServices(
      limitNumber,
      skip,
      today_news_category_id
    );
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "News Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find All dashboard TodayNewsCategory
export const findAllDashboardTodayNewsCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ITodayNewsCategoryInterface | any> => {
  try {
    const { page, limit, searchTerm } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const result: ITodayNewsCategoryInterface[] | any =
      await findAllDashboardTodayNewsCategoryServices(
        limitNumber,
        skip,
        searchTerm
      );
    const total = await TodayNewsCategoryModel.countDocuments();
    return sendResponse<ITodayNewsCategoryInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "TodayNewsCategory Found Successfully !",
      data: result,
      totalData: total,
    });
  } catch (error: any) {
    next(error);
  }
};

// Update A TodayNewsCategory
export const updateTodayNewsCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ITodayNewsCategoryInterface | any> => {
  try {
    const requestData = req.body;
    const findTodayNewsCategoryIsExist: ITodayNewsCategoryInterface | null =
      await findATodayNewsCategoryServices(requestData?.category_slug);
    if (
      findTodayNewsCategoryIsExist &&
      requestData?._id !== findTodayNewsCategoryIsExist?._id.toString()
    ) {
      throw new ApiError(400, "Previously Added !");
    }
    const findTodayNewsCategoryIsExistWithSerial: ITodayNewsCategoryInterface | null =
      await findATodayNewsCategorySerialServices(requestData?.category_serial);
    if (
      findTodayNewsCategoryIsExistWithSerial &&
      requestData?._id !==
        findTodayNewsCategoryIsExistWithSerial?._id.toString()
    ) {
      throw new ApiError(400, "Serial Number Previously Added !");
    }
    const result: ITodayNewsCategoryInterface | any =
      await updateTodayNewsCategoryServices(requestData, requestData?._id);
    if (result?.modifiedCount > 0) {
      return sendResponse<ITodayNewsCategoryInterface>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Today News Category Update Successfully !",
      });
    } else {
      throw new ApiError(400, "Today News Category Update Failed !");
    }
  } catch (error: any) {
    next(error);
  }
};

// Delete aTodayNewsCategory
export const deleteATodayNewsCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ITodayNewsCategoryInterface | any> => {
  try {
    const data = req.body;
    const _id = data?._id;
    const categoryExistInNews: INewsInterface | null =
      await findATodayNewsCategoryExistNewsServices(_id);
    if (categoryExistInNews) {
      throw new ApiError(400, "Already exist in news !");
    }
    const result: ITodayNewsCategoryInterface[] | any =
      await deleteTodayNewsCategoryServices(_id);

    if (result?.deletedCount > 0) {
      return sendResponse<ITodayNewsCategoryInterface>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "TodayNewsCategory Delete Successfully !",
      });
    } else {
      throw new ApiError(400, "TodayNewsCategory Delete Failed !");
    }
  } catch (error: any) {
    next(error);
  }
};
