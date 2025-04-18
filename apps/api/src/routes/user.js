import express from 'express';

import { verifyPassword, UserAuth, isAdmin } from '../middlewares/auth.js';
import { validationError } from '../middlewares/validator.js';
import { loginValidation, signUpValidation } from '../validators/user.js';
import {
  login,
  // auth
  logout,
  getUserInfo,
  updateUserInfo,
  // admin
  AddUsers,
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
userRouter.get('/logout', logout);
userRouter.get('/', getUserInfo);
userRouter.put('/', updateUserInfo);

userRouter.use(isAdmin);
//admin routes
userRouter.post('/admin', signUpValidation, validationError, AddUsers);
userRouter.get('/admin', getUsers);
userRouter.delete('/admin', deleteUsers);
userRouter.put('/admin', updateUsers);

export default userRouter;
