import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import sendResponse from "../../shared/sendResponse";
import { IUserInterface } from "./user.interface";
import {
  deleteUserServices,
  findAllDashboardUserServices,
  findAUserEmailServices,
  findAUserIdServices,
  findAUserPhoneServices,
  postUserServices,
  updateUserServices,
} from "./user.reg.services";
import UserModel from "./user.model";
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// Add A User
export const postUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IUserInterface | any> => {
  try {
    const requestData = req.body;
    if (!requestData?.user_password) {
      throw new ApiError(400, "User Password Required !");
    }
    if (!requestData?.user_name) {
      throw new ApiError(400, "User Name Required !");
    }
    if (!requestData?.user_phone) {
      throw new ApiError(400, "User Phone Required !");
    }
    const findUserIsExistWithName: IUserInterface | null =
      await findAUserPhoneServices(requestData?.user_phone);
    if (findUserIsExistWithName) {
      throw new ApiError(400, "User Phone Previously Added !");
    }
    if (requestData?.user_email) {
      const findUserIsExistWithEmail: IUserInterface | null =
        await findAUserEmailServices(requestData?.user_email);
      if (findUserIsExistWithEmail) {
        throw new ApiError(400, "User Email Previously Added !");
      }
    }
    if (requestData?.user_id) {
      const findUserIsExistWithId: IUserInterface | null =
        await findAUserIdServices(requestData?.user_id);
      if (findUserIsExistWithId) {
        throw new ApiError(400, "User Id Previously Added !");
      }
    }
    bcrypt.hash(
      requestData?.user_password,
      saltRounds,
      async function (err: Error, hash: string) {
        delete requestData?.user_password;
        const data = { ...requestData, user_password: hash };
        try {
          const result: IUserInterface | {} = await postUserServices(data);
          if (result) {
            return sendResponse<IUserInterface>(res, {
              statusCode: httpStatus.OK,
              success: true,
              message: "User Added Successfully !",
            });
          } else {
            throw new ApiError(400, "User Added Failed !");
          }
        } catch (error) {
          next(error);
        }
      }
    );
  } catch (error: any) {
    next(error);
  }
};

// Find All dashboard User
export const findAllDashboardUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IUserInterface | any> => {
  try {
    const { page, limit, searchTerm } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const result: IUserInterface[] | any = await findAllDashboardUserServices(
      limitNumber,
      skip,
      searchTerm
    );
    const total = await UserModel.countDocuments();
    return sendResponse<IUserInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Found Successfully !",
      data: result,
      totalData: total,
    });
  } catch (error: any) {
    next(error);
  }
};

// Update A User
export const updateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IUserInterface | any> => {
  try {
    const requestData = req.body;
    if (!requestData?.user_name) {
      throw new ApiError(400, "User Name Required !");
    }
    if (!requestData?.user_phone) {
      throw new ApiError(400, "User Phone Required !");
    }
    const findUserIsExistWithName: IUserInterface | null =
      await findAUserPhoneServices(requestData?.user_phone);
    if (
      findUserIsExistWithName &&
      requestData?._id !== findUserIsExistWithName?._id.toString()
    ) {
      throw new ApiError(400, "User Phone Previously Added !");
    }
    if (requestData?.user_email) {
      const findUserIsExistWithEmail: IUserInterface | null =
        await findAUserEmailServices(requestData?.user_email);
      if (
        findUserIsExistWithEmail &&
        requestData?._id !== findUserIsExistWithEmail?._id.toString()
      ) {
        throw new ApiError(400, "User Email Previously Added !");
      }
    }
    if (requestData?.user_id) {
      const findUserIsExistWithId: IUserInterface | null =
        await findAUserIdServices(requestData?.user_id);
      if (
        findUserIsExistWithId &&
        requestData?._id !== findUserIsExistWithId?._id.toString()
      ) {
        throw new ApiError(400, "User Id Previously Added !");
      }
    }
    if (requestData?.user_password) {
      bcrypt.hash(
        requestData?.user_password,
        saltRounds,
        async function (err: Error, hash: string) {
          delete requestData?.user_password;
          const data = { ...requestData, user_password: hash };
          const result: IUserInterface | any = await updateUserServices(
            data,
            requestData?._id
          );
          if (result?.modifiedCount > 0) {
            return sendResponse<IUserInterface>(res, {
              statusCode: httpStatus.OK,
              success: true,
              message: "User Update Successfully !",
            });
          } else {
            throw new ApiError(400, "User Update Failed !");
          }
        }
      );
    } else {
      const result: IUserInterface | any = await updateUserServices(
        requestData,
        requestData?._id
      );
      if (result?.modifiedCount > 0) {
        return sendResponse<IUserInterface>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "User Update Successfully !",
        });
      } else {
        throw new ApiError(400, "User Update Failed !");
      }
    }
  } catch (error: any) {
    next(error);
  }
};

// Delete aUser
export const deleteAUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IUserInterface | any> => {
  try {
    const data = req.body;
    const _id = data?._id;
    const result: IUserInterface[] | any = await deleteUserServices(_id);

    if (result?.deletedCount > 0) {
      return sendResponse<IUserInterface>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Delete Successfully !",
      });
    } else {
      throw new ApiError(400, "User Delete Failed !");
    }
  } catch (error: any) {
    next(error);
  }
};
