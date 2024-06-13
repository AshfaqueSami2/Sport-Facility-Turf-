import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import {  UserServices } from "./user.service";

const createUser: RequestHandler = catchAsync(async (req, res) => {
    const userData= req.body;
  
   const result = await UserServices.createUserIntoDB(userData)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  });
  
  export const UserControllers = {
    createUser
  }