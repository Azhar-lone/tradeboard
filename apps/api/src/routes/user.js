import express from 'express';

import { verifyPassword, UserAuth, isSuperUser } from '../middlewares/auth.js';
import { validationError } from '../middlewares/validator.js';
import {
  loginValidation,
  signUpValidation,
  validateIds,
} from '../validators/user.js';
import {
  login,
  // auth
  logout,
  getUserInfo,
  updateUserInfo,
  // admin
  AddUser,
  getUsers,
  deleteUsers,
  updateUsers,
} from '../Controllers/user/user.js';



const userRouter = express.Router({ strict: true });

// Public routes=For All
userRouter.post(
  '/login',
  loginValidation,
  validationError,
  verifyPassword,
  login,
);

userRouter.use(UserAuth);
userRouter.post('/logout', logout);
userRouter.get('/', getUserInfo);
userRouter.put('/', updateUserInfo);

userRouter.use(isSuperUser);
//admin routes
userRouter.post('/admin', signUpValidation, validationError, AddUser);
userRouter.get('/admin', validateIds(false), validationError, getUsers);
userRouter.delete('/admin', validateIds(true), validationError, deleteUsers);
userRouter.put('/admin', updateUsers);

export default userRouter;
