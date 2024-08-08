const express = require('express');
const { requireUser } = require("./auth/utils");

const router = express.Router()

//routes
//path /api/auth
router.use("/auth", require("./auth/auth"));

router.use("/items", require("./items"));

router.use("/update", requireUser, require("./items"))

router.use("/delete", requireUser, require("./items"))
module.exports = router;