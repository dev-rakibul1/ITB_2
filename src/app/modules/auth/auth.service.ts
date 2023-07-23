import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config/config';
import ApiError from '../../../errors/ApiError';
import { jwtTokenProvider } from '../../../helpers/jwtHelper';
import User from '../user/user.model';
import {
  IAuthLoginTypes,
  IRefreshToken,
  IUserLoginResponse,
} from './auth.interface';

const loginUserService = async (
  payload: IAuthLoginTypes
): Promise<IUserLoginResponse> => {
  const { email, password } = payload;

  const user = new User();
  const isUserExist = await user.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  if (
    isUserExist?.password &&
    !user.isPasswordMatch(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  // ACCESS REFRESH TOKEN AND ASSESS TOKEN
  // access token
  const accessToken = jwtTokenProvider.createToken(
    {
      email: isUserExist?.email,
      role: isUserExist?.role,
      password: isUserExist?.password,
    },
    config.jwtAccessKey as Secret,
    config.jwtAccessExpireDate as string
  );

  // refresh token
  const refreshToken = jwtTokenProvider.createToken(
    {
      email: isUserExist?.email,
      role: isUserExist?.role,
      password: isUserExist?.password,
    },
    config.jwtRefreshKey as Secret,
    config.jwtRefreshExpireDate as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshTokenService = async (token: string): Promise<IRefreshToken> => {
  // verify token
  let verifyToken = null;
  try {
    verifyToken = jwtTokenProvider.verifyJwtToken(
      token,
      config.jwtRefreshKey as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token.');
  }

  const { email } = verifyToken;

  const user = new User();
  const isUserExist = await user.isUserExist(email);

  if (!isUserExist?.email) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // generate a new token
  const newAccessToken = jwtTokenProvider.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwtAccessKey as Secret,
    config.jwtAccessExpireDate as string
  );
  return {
    accessToken: newAccessToken,
  };
};

export const authService = {
  loginUserService,
  refreshTokenService,
};
