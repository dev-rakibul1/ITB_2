import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { isValidObjectId } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { userService } from './user.service';

const createNewUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;

  const result = await userService.createNewUserService(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User create successfully!',
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUserService();

  if (result?.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'User not available',
      data: null,
    });
  } else {
    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User get successfully!',
      data: result,
    });
  }
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Id not found!');
  }

  if (!isValidObjectId(id)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid id');
  }

  const result = await userService.updateUserService(id, updateData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User update successfully!',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Id not found!');
  }

  if (!isValidObjectId(id)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid id');
  }

  const result = await userService.deleteUserService(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User delete successfully!',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Id not found!');
  }

  if (!isValidObjectId(id)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid id');
  }

  const result = await userService.singleGetUserService(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single user get successfully!',
    data: result,
  });
});

export const userController = {
  createNewUser,
  getAllUser,
  updateUser,
  deleteUser,
  getSingleUser,
};
