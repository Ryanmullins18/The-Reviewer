const express = require('express');
const { verifyUser } = require("./auth/utils");

const router = express.Router()

//routes
//path /api/auth
router.use("/auth", require("./auth/auth"));

router.use("/item", require("./items"));

router.use("/update", verifyUser, require("./items"))

router.use("/delete", verifyUser, require("./items"))


router.use("/profile", require("./users"));
module.exports = router;