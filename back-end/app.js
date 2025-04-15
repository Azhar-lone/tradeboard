//importing dependencies
import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './src/User/router.js';

import { checkPrismaConnection } from './libs/connectdb.js';

import 'dotenv/config';
//importing Routers

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('', userRouter);
//404 page
app.use((req, res) => {
  try {
    return res.status(404).json({
      msg: 'Page Not found',
    });
  } catch (error) {
    res.status(500).json({
      msg: 'internal server error',
    });
  }
});
const port = process.env.PORT | 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  checkPrismaConnection();
});
