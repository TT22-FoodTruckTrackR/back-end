// const Users = require('./usersModel');

// module.exports = {
//   userExists,
//   uniqueRegister,
//   validRegister,
//   validLogin
// }

// function uniqueName (){
//   // foundUsername = users.getByUsername

//   if(/*username found */){
//     res.status(400).json({message:"Please enter a unique email and username."});
//   }else{
//     next();
//   }
// }

// function uniqueEmail(){
//   // foundEmail = users.getByEmail

//   if(/* email found */){
//     res.status(400).json({message:"Please enter a unique email and username."});
//   }else{
//     next();
//   }
// }

// function validRegister (req,res,next){
//   if(req.body.username && req.body.password && req.body.email && req.body.role){
//     next();
//   }else{
//     res.status(400).json({message:"Required fields: username (string), password (string), email(string), role: operator or diner. Optional: location(integer)"})
//   }
// }

// function validLogin (req,res,next){
//   next();
// }