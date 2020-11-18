//require dependencies
const express = require('express');
const logger = require('./middleware/logger');
//require routers
const authRouter = require('./auth/authRouter');


//new server
const server = express();

//use middleware
server.use(express.json());
server.use(logger);

//use routers
server.use('/api/auth', authRouter);


//default response
server.get('/', (req,res)=>{
  res.status(200).json({message:"The server is running, better go catch it"});
});

server.get('/api', (req,res)=>{
  res.status(200).json({message:"Welcome to the api, please choose an endpoint. See backend documentation for server routes."});
});

//export server
module.exports = server;