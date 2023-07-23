import config from '../../../config/config';
import { IUser } from './user.interface';
import User from './user.model';

const createNewUserService = async (payload: IUser): Promise<IUser | null> => {
  if (!payload.role) {
    payload.role = config.user_default_role as string;
  }

  const result = await User.create(payload);
  return result;
};

const getAllUserService = async (): Promise<IUser[] | null> => {
  const result = await User.find({});
  return result;
};

const updateUserService = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteUserService = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const singleGetUserService = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

export const userService = {
  createNewUserService,
  getAllUserService,
  updateUserService,
  deleteUserService,
  singleGetUserService,
};
