const express = require('express');
const router = express.Router();
const {verifyUser} = require('./auth/utils');
const client = require('../db/index')


router.get("/me", verifyUser, async (req, res) => {
    try {
      const profile = await client.users.findUnique({
        where: {
          id: req.user_id,
        },
        include: {
          reviews: true,
          comments: true,
        },
      });
      res.send(profile);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
module.exports = router;