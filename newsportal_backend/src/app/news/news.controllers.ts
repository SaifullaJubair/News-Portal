import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import sendResponse from "../../shared/sendResponse";
import { INewsInterface } from "./news.interface";
import {
  deleteNewsServices,
  findACategoryAndAllSubCategoryNewsServices,
  findAllArchiveNewsServices,
  findAllBreakingNewsServices,
  findAllCategoryNewsServices,
  findAllDashboardNewsServices,
  findAllFeatureNewsServices,
  findAllLatestCreateNewsServices,
  findAllLatestNewsServices,
  findAllLatestNewsWithIfCategoryAndSubCategoryServices,
  findAllShowCardCategoryNewsServices,
  findAllSpecialCategoryNewsServices,
  findAllSpecialNewsServices,
  findAllSubCategoryAllNewsServices,
  findAllTopNewsServices,
  findARandomlySingleCategoryMatchNewsServices,
  findASingleArchiveNewsServices,
  findASingleNewsServices,
  postNewsServices,
  updateNewsServices,
} from "./news.services";
import { FileUploadHelper } from "../../helpers/image.upload";
import NewsModel from "./news.model";

// Add A News
export const postNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const requestData = req.body;
    const result: INewsInterface | {} = await postNewsServices(requestData);
    if (result) {
      return sendResponse<INewsInterface>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "News Added Successfully !",
      });
    } else {
      throw new ApiError(400, "News Added Failed !");
    }
  } catch (error: any) {
    next(error);
  }
};

// Find All SpecialCategory News
export const findAllSpecialCategoryNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const result: INewsInterface[] | any =
      await findAllSpecialCategoryNewsServices();
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Special Category News Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find All ShowCardCategory News
export const findAllShowCardCategoryNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const result: INewsInterface[] | any =
      await findAllShowCardCategoryNewsServices();
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Special Category News Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find All Breaking News
export const findAllBreakingNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const result: INewsInterface[] | any = await findAllBreakingNewsServices();
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Breaking News Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find All Feature News
export const findAllFeatureNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const result: INewsInterface[] | any = await findAllFeatureNewsServices();
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Feature News Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find All Latest News
export const findAllLatestNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const result: INewsInterface[] | any = await findAllLatestNewsServices();
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Latest News Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find All Top News
export const findAllTopNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const result: INewsInterface[] | any = await findAllTopNewsServices();
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Top News Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find All Special News
export const findAllSpecialNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const result: INewsInterface[] | any = await findAllSpecialNewsServices();
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Special News Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find All LatestCreate News
export const findAllLatestCreateNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const result: INewsInterface[] | any =
      await findAllLatestCreateNewsServices();
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Latest Create News Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find A Single News
export const findASingleNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const _id = req.params?._id;
    const result: INewsInterface[] | any = await findASingleNewsServices(_id);
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single News Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find A Single News
export const findASingleArchiveNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const _id = req.params?._id;
    const result: INewsInterface[] | any = await findASingleArchiveNewsServices(
      _id
    );
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single News Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find A RandomlySingle News
export const findARandomlySingleNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const category_slug = req.params?.category_slug;
    const news_id = req.query?.news_id;
    const result: INewsInterface[] | any =
      await findARandomlySingleCategoryMatchNewsServices(
        category_slug,
        news_id
      );
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Randomly Single News Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find A category his sub category and sub category News
export const findACategoryAndAllSubCategoryNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const category_slug = req.params?.category_slug;
    const sub_category_slug = req.query?.sub_category_slug;
    const result: INewsInterface[] | any =
      await findACategoryAndAllSubCategoryNewsServices(
        category_slug,
        sub_category_slug
      );
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category And Sub Category News Found Successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find All Category News
export const findAllCategoryNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const { category_id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const result: INewsInterface[] | any = await findAllCategoryNewsServices(
      limitNumber,
      skip,
      category_id
    );
    const total = await NewsModel.countDocuments();
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "News Found Successfully !",
      data: result,
      totalData: total,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find All SubCategory News
export const findAllSubCategoryNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const { sub_category_id } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const result: INewsInterface[] | any =
      await findAllSubCategoryAllNewsServices(
        limitNumber,
        skip,
        sub_category_id
      );
    const total = await NewsModel.countDocuments();
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "News Found Successfully !",
      data: result,
      totalData: total,
    });
  } catch (error: any) {
    next(error);
  }
};

// Find All SubCategory News
export const findAllLatestNewsWithIfCategoryAndSubCategory: RequestHandler =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<INewsInterface | any> => {
    try {
      const {
        sub_category_slug,
        category_slug,
        searchTerm,
        page,
        limit = 20,
      } = req.query;
      const pageNumber = Number(page);
      const limitNumber = Number(limit);
      const skip = (pageNumber - 1) * limitNumber;
      const result: INewsInterface[] | any =
        await findAllLatestNewsWithIfCategoryAndSubCategoryServices(
          category_slug,
          sub_category_slug,
          limitNumber,
          skip,
          searchTerm
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

// Find All Archive News
export const findAllArchiveNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const { date, edition } = req.body;
    const result: INewsInterface[] | any = await findAllArchiveNewsServices(
      date,
      edition
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

// Find All dashboard News
export const findAllDashboardNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const { page, limit, searchTerm } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const result: INewsInterface[] | any = await findAllDashboardNewsServices(
      limitNumber,
      skip,
      searchTerm
    );
    const total = await NewsModel.countDocuments();
    return sendResponse<INewsInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "News Found Successfully !",
      data: result,
      totalData: total,
    });
  } catch (error: any) {
    next(error);
  }
};

// Update A News
export const updateNews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const requestData = req.body;
    let previous_image_key;
    let previous_audio_key;
    let previous_writer_image_key;
    let previous_social_image_key;
    if (requestData?.previous_image_key) {
      previous_image_key = requestData?.previous_image_key;
      delete requestData.previous_image_key;
    }
    if (requestData?.previous_writer_image_key) {
      previous_writer_image_key = requestData?.previous_writer_image_key;
      delete requestData.previous_writer_image_key;
    }
    if (requestData?.previous_social_image_key) {
      previous_social_image_key = requestData?.previous_social_image_key;
      delete requestData.previous_social_image_key;
    }
    if (requestData?.previous_audio_key) {
      previous_audio_key = requestData?.previous_audio_key;
      delete requestData.previous_audio_key;
    }
    const result: INewsInterface | any = await updateNewsServices(
      requestData,
      requestData?._id
    );
    if (result?.modifiedCount > 0) {
      if (previous_image_key) {
        await FileUploadHelper.deleteFromSpaces(previous_image_key);
      }
      if (previous_audio_key) {
        await FileUploadHelper.deleteFromSpaces(previous_audio_key);
      }
      if (previous_writer_image_key) {
        await FileUploadHelper.deleteFromSpaces(previous_writer_image_key);
      }
      if (previous_social_image_key) {
        await FileUploadHelper.deleteFromSpaces(previous_social_image_key);
      }
      return sendResponse<INewsInterface>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "News Update Successfully !",
      });
    } else {
      throw new ApiError(400, "News Update Failed !");
    }
  } catch (error: any) {
    next(error);
  }
};

// Delete aNews
export const deleteANews: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<INewsInterface | any> => {
  try {
    const data = req.body;
    const _id = data?._id;
    const result: INewsInterface[] | any = await deleteNewsServices(_id);

    if (result?.deletedCount > 0) {
      return sendResponse<INewsInterface>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "News Delete Successfully !",
      });
    } else {
      throw new ApiError(400, "News Delete Failed !");
    }
  } catch (error: any) {
    next(error);
  }
};
