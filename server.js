const express = require('express')
const cors = require('cors');
const server = express();

server.use(express.json());

server.use(cors())

server.get('/', (req,res)=> {
    res.send({message: 'Working'});
});

server.use("/api", require("./api/index"));

module.exports = server;