const {findUserByUsername} = require('../../db/users')

function requireUser(req, res, next) {
    if (!req.user || !req.user.id) {
      return res.status(401).send("You must be logged in to do that.");
    }
    next();
  }

const checkUserData = (req, res, next) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res
        .status(400)
        .send({message: "Please provide username and password"});
    }

    next();
}

const checkUser = async (req, res, next) => {
    const oldUser = await findUserByUsername(req.body.username);

    if(oldUser){
        return res.status(400).send({message: "That username is already taken"});
    }
    next();
}

module.exports = {checkUserData, checkUser, requireUser}