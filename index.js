//import server
const server = require('./api/server');

//port
const PORT = 9900;

//listen
server.listen(PORT, ()=>{
  console.log(`Server is listening on port ${PORT}`);
});