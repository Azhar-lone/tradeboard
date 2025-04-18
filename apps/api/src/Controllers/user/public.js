import { createToken } from '../../middlewares/auth.js';

export async function login(req, res) {
  try {
    const token = createToken(req.user.id.toString());
    return res
      .cookie('login', token, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({
        msg: 'user logged in successfully',
      });
  } catch (error) {
    console.error('Login Error:', error);

    return res.status(500).json({
      msg: 'Internal server error occurred during login',
    });
  }
}

