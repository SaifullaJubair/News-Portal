import { NextFunction, Request, Response, RequestHandler } from "express";
import ApiError from "../../errors/ApiError";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { findUser } from "./user..login.services";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// login a user
export const postLogUser: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user_password, user_phone } = req.body;

        if(!user_password || !user_phone){
            throw new ApiError(400, "Must send phone and password !");
        }

        const user = await findUser(user_phone);

        if (user) {
            if (user?.user_status == "in-active") {
                throw new ApiError(400, "No accesss !");
            }
            const isPasswordValid = await bcrypt.compare(
                user_password,
                user?.user_password
            );
            if (isPasswordValid) {
                const user_phone = user?.user_phone;
                const token = jwt.sign(
                    { user_phone },
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hem11bEBnbWFpbC5jb20iLCJpYXQiOjE2OTQ0MzExOTF9.xtLPsJrvJ0Gtr4rsnHh1kok51_pU10_hYLilZyBiRAM"
                );
                const user_info = {
                    user_name: user?.user_name,
                    user_phone: user?.user_phone,
                    user_status: user?.user_status,
                };

                const sendData = {
                    token,
                    user: user_info,
                };
                // const token = jwt.sign({ phone }, process.env.ACCESS_TOKEN);
                return sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: "User log in successfully !",
                    data: sendData,
                });
            } else {
                throw new ApiError(400, "Password not match !");
            }
        } else {
            throw new ApiError(400, "User not found !");
        }
    } catch (error) {
        next(error);
    }
};

