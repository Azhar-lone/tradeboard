//importing dependencies
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import rateLimit from 'express-rate-limit';
//importing Routers
import userRouter from './Server/routes/userRoutes.js';

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


// Rate limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);

//Routers
const baseUrl = process.env.BaseUrl;
app.use(baseUrl + '/users', userRouter);
app.use(baseUrl + '/products', productRouter);
app.use(baseUrl + '/general', generalRouter);
app.use(baseUrl + '/blogs', blogRouter);
app.use(baseUrl + '/reviews', reviewRouter);

// Catch-all handler to serve index.html for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(uiPath, 'index.html'));
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
