//require dependencies
const express = require('express');
const logger = require('./middleware/logger');
//require routers


//new server
const server = express();

//use middleware
server.use(express.json());
server.use(logger);
//use routers


//default response
server.get('/', (req,res)=>{
  res.status(200).json({message:"The server is running, better go catch it"});
});

//export server
module.exports = server;