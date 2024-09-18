
const jwt = require("jsonwebtoken");

function verifyUser(req, res, next) {
  if (!req.user || !req.user.id) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
}



function checkUserComment(){

}

function checkUserReview(){
  
}
module.exports = { verifyUser };