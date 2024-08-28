const express = require('express');
const { verifyUser } = require("./auth/utils");

const router = express.Router()

//routes
//path /api/auth
router.use("/auth", require("./auth/auth"));

router.use("/items", require("./items"));

router.use("/reviews", verifyUser, require("./reviews"));

router.use("/comments", verifyUser, require("./comments"));

router.use("/profile", require("./users"));
module.exports = router;