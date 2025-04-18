import express from 'express';

import { verifyPassword, UserAuth, isAdmin } from '../middlewares/auth.js';
import { validationError } from '../middlewares/validator.js';
import { loginValidation, signUpValidation } from '../validators/user.js';
import { AddUser, logout } from '../Controllers/user/autherized.js';

import { login } from '../Controllers/user/public.js';
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

userRouter.use(isAdmin);
//admin routes
userRouter.post('/admin/add', signUpValidation, validationError, AddUser);
export default userRouter;
