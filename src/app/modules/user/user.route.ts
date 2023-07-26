import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { authProvider } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { userZodValidation } from './user.validation';

const router = express.Router();

router.get(
  '/:id',
  authProvider.auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.USER
  ),
  userController.getSingleUser
);
router.patch(
  '/:id',
  validateRequest(userZodValidation.updateUserValidation),
  authProvider.auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  userController.updateUser
);
router.delete(
  '/:id',
  authProvider.auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  userController.deleteUser
);
router.post(
  '/create-user',
  validateRequest(userZodValidation.createUserValidation),
  authProvider.auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.USER
  ),
  userController.createNewUser
);
router.get(
  '/',
  authProvider.auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.USER
  ),
  userController.getAllUser
);

export const userRoutes = router;
