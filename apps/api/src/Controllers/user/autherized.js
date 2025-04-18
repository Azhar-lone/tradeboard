import { prisma } from '../../libs/connectdb.js';

// AdminsOnly
export async function AddUser(req, res) {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Internal server error occurred during login',
    });
  }
}

export async function logout(req, res) {
  try {
    res
      .cookie('login', '', {
        httpOnly: true,
        maxAge: 0,
        expires: Date.now(),
      })
      .status(200)
      .json({
        msg: 'user logged out successfully',
      });
  } catch (error) {
    res.status(500).json({
      msg: 'internal server erorr',
    });
  }
}
