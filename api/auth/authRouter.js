const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/usersModel');
const {jwtSecret} = require('./secrets.js');

const router = express.Router();

// ENDPOINTS
//-------------------------------------------

/*  
user
{
  username: string, unique, required
  password: string, required
  email: string, unique, required
  role: diner or operator, required
  location: integer, optional
}
*/


// //---------
// //TESTING: GET ALL USERS
// //---------

// //GET /api/auth/operators
//---------------------------------
router.get('/operators', (req, res, next)=>{

  Users.getAllOperators
    .then(data =>{
      res.status(200).json(data)
      next();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({message:'Server error getting operators', error:err})
    })

  // try{ 
  //   Users.getAllOperators
  // }catch(err){
  //   console.log(err);
  //   res.json(500).json({message:'Server error returning operators list', error:err})
  // }
  // next();
});


// //GET /api/auth/diners
//---------------------------------
router.get('/diners', (req, res, next)=>{
  next();
});



//---------
//REGISTER
//---------

//POST /api/auth/register/operators
//---------------------------------
router.post('/register/operators', (req, res, next)=>{
  const newUser = req.body;

  //theoretical env
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(newUser.password, rounds);
  newUser.password = hash;


  next();
});



//POST /api/auth/register/diners
//---------------------------------
router.post('/register/diners', (req, res, next)=>{
  const newUser = req.body;
  makeJwt(newUser);
  next();
});




//---------
//LOGIN
//---------

//POST /api/auth/login/operators
//---------------------------------
router.post('/login/operators', (req, res, next)=>{
  const pendingUser = req.body;
  makeJwt(pendingUser);
  next();
});





//POST /api/auth/login/diners
//---------------------------------
router.post('/login/diners', (req, res, next)=>{
  const pendingUser = req.body;
  makeJwt(pendingUser);
  next();
});


function makeJwt(user){

  const payload = {
    subject:user.id,
    username:user.username,
    role:user.role
  };

  const options = {
    expiresIn: '25 seconds'
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;