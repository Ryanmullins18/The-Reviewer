const express = require('express');
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const {createUser} = require('../../db/users')
const {findUserByUsername} = require('../../db/users')
const {checkUserData, checkUser} = require('./utils')
const client = require('../../db/index')

const authRouter = express.Router();

//path /api/auth

authRouter.post('/register', checkUserData, checkUser, async (req,res)=>{
    try {
        const {username, password} = req.body;


        const hashPass = await bcrypt.hash(password, parseInt(process.env.SALT) || 7)
        const user = await createUser({
            username, password: hashPass
        })
        const token = jwt.sign({id:user.id},
            process.env.JWT || "super secret"
        );
        res.status(201).send({token});
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error, message: "could not register user"});
    }
});

authRouter.post("/login", async (req, res, next) => {
  
    try {
      const { username, password, } = req.body;
      const user = await client.users.findUnique({
        where: {
            username: req.body.username,
            
        },
      });
  
      const validPassword = await bcrypt.compare(req.body.password, 
        user?.password || "")
        console.log(req.body.password)
  
      if (!user || !validPassword) {
        return res.status(401).send("Invalid login credentials.");
      }
  
      
      const token = jwt.sign({ id: user.id }, 
        process.env.JWT || "some random string");
  
      res.send({ token });
    } catch (error) {
      next(error);
    }
  });

module.exports = authRouter;