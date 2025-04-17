import express from 'express';

import { verifyPassword } from '../middlewares/auth.js';
import { validationError } from '../middlewares/validator.js';
import { loginValidation } from '../validators/user.js';
import { AddUser } from '../Controllers/user/admins.js';

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

//admin routes
userRouter.post('/admin/add', AddUser);
export default userRouter;
