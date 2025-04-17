import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../libs/connectdb.js';
const { sign, verify } = jwt;

export function createToken(id) {
  let token = sign({ id }, process.env.UserSecretKey, { expiresIn: '30d' });
  return token;
}

export function UserAuth(req, res, next) {
  try {
    if (req.cookies.login) {
      let decoded = verify(req.cookies.login, process.env.UserSecretKey);

      if (decoded) {
        //decode login cookies and extract user's Id and send it to frontEnd
        //as currentUserId which will be used to specify OwnerShip and ...
        req.currentUserId = decoded.id;
        return next();
      } else {
        return res.status(401).json({
          msg: 'Not authorized',
        });
      }
    } else {
      return res.status(401).json({
        msg: 'Operation not Allowed',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Authentication error :',
    });
  }
}

// this function checks provided password is correct or not
export async function verifyPassword(req, res, next) {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // let user = await userModel.findOne({ email }).select("password userName");
    let user = await prisma.user.findUnique({
      where: { email },
      select: {
        password: true,
        userName: true,
      },
    });

    // If user is not found, return a 401 Unauthorized response
    if (!user) {
      return res.status(404).json({
        msg: 'User not found',
      });
    }
    console.log('User :', user);

    // Compare the provided password with the hashed password in the database
    const isMatched = await bcrypt.compare(password, user.password);

    // If passwords don't match, return a 401 Unauthorized response
    if (!isMatched) {
      return res.status(401).json({
        msg: 'Incorrect Password',
      });
    }
    //     only send userName and user id to next route
    user = {
      userName: user.userName,
      id: user.id,
    };

    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'internal server error',
    });
  }
}
