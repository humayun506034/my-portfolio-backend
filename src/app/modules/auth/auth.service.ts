import config from '../../config';
import { TLoginUser, TRegisterUser } from './auth.interface';
import { User } from './auth.model';
import { createToken } from './auth.utils';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  // console.log({payload});

  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  if (!user) {
    throw new Error('This user is not found !');
  }

  const jwtPayload = {
    name: user.name,
    email: user.email,
  };

   const isCorrectPassword: boolean = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isCorrectPassword) {
    throw new Error('Your Password is incorrect..');
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const registerUser = async (payload: TRegisterUser) => {
  const result = await User.create(payload);
  return result;
};

export const AuthServices = {
  //   loginUser,
  registerUser,
  loginUser,
};
