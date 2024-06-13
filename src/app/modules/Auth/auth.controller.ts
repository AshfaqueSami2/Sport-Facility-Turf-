import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { Request, Response } from 'express';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const {user,accessToken} = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully',
    token: accessToken,
    data: user,
  });
});

export const AuthControllers = {
  loginUser,
};
