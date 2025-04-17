import { prisma } from "../../libs/connectdb";

// AdminsOnly
export async function AddUser(req, res) {
  try {
const user=await prisma.user.create({
    data:{
        email,password,role
    }
})
  } catch (error) {
    return res.status(500).json({
      msg: 'Internal server error occurred during login',
    });
  }
}
