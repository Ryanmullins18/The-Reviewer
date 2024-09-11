const express = require('express');
const { verifyUser } = require("./auth/utils");
const jwt = require("jsonwebtoken");
const router = express.Router()
const cors= require('cors')
const {findUserByid}= require("../db/users");



router.use(async (req, res, next) => {
    const prefix = "Bearer ";
    const auth = req.header("Authorization");
  
    // if request does not need auth header, move on
    if (!auth) {
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
  
      try {
        const { id } = jwt.verify(
          token,
          process.env.JWT || "super secret super safe"
        );
        //   if id is successfully made, set req.user
        if (id) {
          req.user = await findUserByid(id);
          next();
        } else {
          // 400 status on bad request
          res.status(400).send({
            name: "AuthorizationHeaderError",
            message: "Authorization Token Malformed",
          });
        }
      } catch ( error) {
        console.log(error)
        next();
      }
    } else {
      // 400 status on bad request
      res.status(400).send({
        name: "AuthorizationHeaderError",
        message: `Authorization token must start with ${prefix}`,
      });
    }
  });

//routes
//path /api/auth
router.use("/auth", require("./auth/auth"));

router.use("/items", require("./items"));

router.use("/reviews", verifyUser, require("./reviews"));
router.use("users/reviews", verifyUser, require("./reviews"));

router.use("/comments", verifyUser, require("./comments"));

const usersRouter = require("./users");
router.use("/users", usersRouter);
module.exports = router;