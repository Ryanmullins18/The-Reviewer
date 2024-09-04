const express = require('express');
const router = express.Router();
const {verifyUser} = require('./auth/utils');
const client = require('../db/index');
const { getAllUsers, findUserByid } = require('../db/users');


//works
router.get("/", async (req, res, next) => {
  try {
    delete req.user.password;

    res.send({
      user: req.user,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;