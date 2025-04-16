import express from 'express';

import {
  // For All
  login,
} from '../Controllers/controller.js';

const userRouter = express.Router({ strict: true });

// Public routes=For All
userRouter.post('/login', verifyPassword, login); //done

export default userRouter;
