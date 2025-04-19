import { prisma } from '../../libs/connectdb.js';
import { suggestRelatedUsername } from './libs.js';
import bcrypt from 'bcrypt';
import { createToken } from '../../middlewares/auth.js';

const userSelect = {
  id: true,
  email: true,
  userName: true,
  role: true,
  companyId: true,
  company: true,
};

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

// Autherized Users
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

export async function getUserInfo(req, res) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.currentUserid,
      },
      select: {
        ...userSelect,
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: 'Failed to fetch user',
      });
    }

    return res.status(200).json({
      msg: 'User info fetched successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Internal server error',
    });
  }
}

export async function updateUserInfo(req, res) {
  try {
  } catch (error) {
    // Log the error and return a generic error response
    console.error(error);
    return res.status(500).json({
      msg: 'Internal server error',
    });
  }
}

// AdminsOnly
export async function AddUser(req, res) {
  try {
    // Destructure the required fields from the request body
    const { email, password, userName, role } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { userName }],
      },
      select: {
        email: true,
        userName: true,
      },
    });

    // If either the email or username is taken, handle the response accordingly
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(403).json({
          msg: 'Email already registered',
        });
      }

      if (existingUser.userName === userName) {
        const suggestedUserName = await suggestRelatedUsername(
          userName,
          (username) =>
            prisma.user.findUnique({ where: { userName: username } }),
        );
        return res.status(403).json({
          msg: 'Username already taken',
          suggestedUserName,
        });
      }
    }

    // Hash the password with a salt factor of 5
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userName,
        ...(role && { role }),
      },
      select: {
        userName: true,
        id: true,
      },
    });

    // If saving the user fails, return an error response
    if (!user) {
      return res.status(500).json({
        msg: 'Error creating user',
      });
    }

    // Create a JWT token for the newly created user
    const token = createToken(user.id.toString());

    // Send the token as a cookie in the response
    return res
      .cookie('login', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .status(200)
      .json({
        msg: 'user created successfully',
        userName: user.userName,
      });
  } catch (error) {
    // Log the error and return a generic error response
    console.error(error);
    return res.status(500).json({
      msg: 'Internal server error',
    });
  }
}

export async function getUsers(req, res) {
  try {
    const { ids } = req.body;

    let users = [];

    if (ids && ids.length > 0) {
      users = await prisma.user.findMany({
        where: {
          id: { in: ids },
        },
        select: {
          ...userSelect,
        },
      });
    } else {
      users = await prisma.user.findMany({
        select: {
          ...userSelect,
        },
      });
    }

    return res.status(200).json({
      msg: 'Users fetched successfully',
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Internal server error',
    });
  }
}

export async function deleteUsers(req, res) {
  try {
    const { ids } = req.body;

    const deletedUsers = await prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Check if any users were deleted
    if (deletedUsers.count === 0) {
      return res.status(404).json({
        msg: 'No users found with the provided IDs',
      });
    }

    return res.status(200).json({
      msg: `${deletedUsers.count} user(s) deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Internal server error',
    });
  }
}

export async function updateUsers(req, res) {
  try {
  } catch (error) {
    // Log the error and return a generic error response
    console.error(error);
    return res.status(500).json({
      msg: 'Internal server error',
    });
  }
}
