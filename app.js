global.config = require("./config.json");
const express = require("express");
const cors = require("cors");
const sitesController= require("./controllers/site-controllers")

const server= express();

server.use(cors());
server.use(express.json());
server.use("/api/sites", sitesController);

server.listen(3003, ()=> console.log('Listing on 3003....'))