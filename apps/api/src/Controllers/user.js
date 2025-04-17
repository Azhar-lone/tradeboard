import { createToken } from '../middlewares/auth.js';

import { prisma } from '../libs/connectdb.js';

export async function login(req, res) {
  try {
    const token = createToken(req.user._id.toString());

    return res
      .cookie('login', token, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({
        userName: req.user.userName,
      });
  } catch (error) {
    console.error('Login Error:', error);

    return res.status(500).json({
      msg: 'Internal server error occurred during login',
    });
  }
}
