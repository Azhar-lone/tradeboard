import express from 'express';

import { login } from '../Controllers/user.js';
import { verifyPassword } from '../middlewares/auth.js';
import { validationError } from '../middlewares/validator.js';
import { loginValidation } from '../validators/user.js';

const userRouter = express.Router({ strict: true });

// Public routes=For All
userRouter.post(
  '/login',
  loginValidation,
  validationError,
  verifyPassword,
  login,
); //done

export default userRouter;
