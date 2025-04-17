// AdminsOnly
export async function AddUser(req, res) {
  try {
throw Error("something went wrong")

  res.send("nothing")
  } catch (error) {
    return res.status(500).json({
      msg: 'Internal server error occurred during login',
    });
  }
}
