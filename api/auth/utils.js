
const jwt = require("jsonwebtoken");

function verifyUser(req, res, next) {
  if (!req.user || !req.user.id) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
}
// function verifyUser(req, res, next) {
//   const auth = req.header("Authorization");

//   if (!auth) {
//     return res.status(400).send("You must provide a token");
//   }
//   try {
//     const { id } = jwt.verify(auth, process.env.JWT || "super secret super safe");
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("Token could not be verified");
//   }
// }


function checkUserComment(){

}

function checkUserReview(){
  
}
module.exports = { verifyUser };