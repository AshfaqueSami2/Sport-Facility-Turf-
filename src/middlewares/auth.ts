import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../app/modules/User/user.interface";
import catchAsync from "../app/utils/catchAsync";
import AppError from "../app/errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../app/config";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
  
      //if the toke is sent from the client
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      //checck if the token is valid
      jwt.verify(
        token,
        config.jwt_access_secret as string,
        function (err, decoded) {
          // err
          if (err) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
          }
          const role = (decoded as JwtPayload).role;
          if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
          }
  
          req.user = decoded as JwtPayload;
          next();
        },
      );
    });
  };
  
  export default auth;
  