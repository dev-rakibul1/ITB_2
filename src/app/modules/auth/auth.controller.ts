import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config/config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUserLoginResponse } from './auth.interface';
import { authService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  // console.log('client token: ', req.headers.authorization);

  const result = await authService.loginUserService(loginData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  if ('refreshToke' in result) {
    delete result.refreshToke;
  }

  sendResponse<IUserLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully!',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  console.log(refreshToken);

  const result = await authService.refreshTokenService(refreshToken);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IUserLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully!',
    data: result,
  });
});

export const loginController = {
  loginUser,
  refreshToken,
};
