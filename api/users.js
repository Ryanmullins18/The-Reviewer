const express = require('express');
const router = express.Router();
const {verifyUser} = require('./auth/utils');
const client = require('../db/index');
const { getAllUsers, findUserByid } = require('../db/users');

//works
router.get('/', async(req,res)=>{
  try {
      const users = await getAllUsers();
      res.send({users});
  } catch (error) {
    console.log(error)
   res.status(500).send({error, message: "Unable to get users"})
  }
});

//works
router.get("/:id", verifyUser, async (req, res) => {
  try {
    const user = await findUserByid(req.params.id);
    res.send({ user });
  } catch (error) {
    console.log(error)
      res.status(500).send({error, message: "Unable to get user"})
     }
});
module.exports = router;