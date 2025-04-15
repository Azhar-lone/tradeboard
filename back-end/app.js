//importing dependencies
import express from 'express';
import cookieParser from 'cookie-parser';

import 'dotenv/config';
//importing Routers

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello, Prisma!');
});

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

async function checkPrismaConnection() {
  try {
    await prisma.$connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}
