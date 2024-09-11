const express = require('express');
const router = express.Router();
const {verifyUser} = require('./auth/utils');
const client = require('../db/index');
const { findUserByid } = require('../db/users');


//works
router.get("/", async (req, res, next) => {
  try {
    delete req.user.password;
    const user = await findUserByid(req.user.id)
    res.send({
      user
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});


module.exports = router;