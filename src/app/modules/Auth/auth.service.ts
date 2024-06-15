import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import config from '../../config';
import jwt from 'jsonwebtoken';


const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload?.email);

  //chekcing email is exist on databases
  if (!user) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'This user is not found');
  }

  //checking password

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match');
  }

  const jwtPayload = {
    id:user._id,
    userEmail: user.email,
    role: user.role,
  };

  // create toke and sent to the client
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '30d',
  });
 
  

  const result = {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
    },
    accessToken,
  };


  return result
};

export const AuthServices = {
  loginUser,

};
