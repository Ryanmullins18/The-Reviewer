// const {findUserByUsername} = require('../../db/users')

// function requireUser(req, res, next) {
//     if (!req.user || !req.user.id) {
//       return res.status(401).send("You must be logged in to do that.");
//     }
//     next();
//   }

// const checkUserData = (req, res, next) => {
//     const {username, password} = req.body;

//     if(!username || !password){
//         return res
//         .status(400)
//         .send({message: "Please provide username and password"});
//     }

//     next();
// }

// const checkUser = async (req, res, next) => {
//     const oldUser = await findUserByUsername(username);

//     if(oldUser){
//         return res.status(400).send({message: "That username is already taken"});
//     }
//     next();
// }

// module.exports = {checkUserData, checkUser, requireUser}
const jwt = require("jsonwebtoken");

function verifyUser(req, res, next) {
  const auth = req.header("Authorization");

  if (!auth) {
    return res.status(400).send("You must provide a token");
  }

  try {
    const { id } = jwt.verify(auth, process.env.JWT || "super secret");
    req.user_id = id;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send("Token could not be verified");
  }
}

module.exports = { verifyUser };