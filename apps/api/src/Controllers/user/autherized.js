import { prisma } from '../../libs/connectdb.js';

// AdminsOnly
export async function AddUser(req, res) {
  try {
  } catch (error) {
    return res.status(500).json({
      msg: 'Internal server error occurred during login',
    });
  }
}

export default async function signUp(req, res) {
  try {
    // Destructure the required fields from the request body
    const { email, password, userName } = req.body;

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
