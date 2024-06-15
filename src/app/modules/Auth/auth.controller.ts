import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { Request, Response } from 'express';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const {user,accessToken} = await AuthServices.loginUser(req.body);
  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    address: user.address,
  };
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully',
    token: accessToken,
    data: userData,
  });
});

export const AuthControllers = {
  loginUser,
};
