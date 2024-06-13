import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';


const loginUser = async (payload: TLoginUser) => {

  const user = await User.isUserExistsByEmail(payload?.email );
  console.log(user);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }
};

export const AuthServices = {
    loginUser
  };
  