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
  "username":"", string, unique, required
  "password":"", string, required
  "email":"", string, unique, required
  "role":"", diner or operator, required
  "location":1 integer, optional
}
*/


// //---------
// //TESTING: GET ALL USERS
// //---------

// //GET /api/auth/operators
//---------------------------------
router.get('/operators', (req, res, next)=>{
  Users.getAllOperators()
    .then(users => {
      res.status(200).json(users);
      next();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({message:'Server error retrieving operators list'});
    })
});


// //GET /api/auth/diners
//---------------------------------
router.get('/diners', (req, res, next)=>{

  // *** COPY OPERATORS HERE WHEN DONE ****

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

  Users.addNewUser(newUser)
    .then(user => {
      console.log(user)
      // res.status(201).json(user);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({message:'Server error retrieving creating new user'});
    });

  next();
});



//POST /api/auth/register/diners
//---------------------------------
router.post('/register/diners', (req, res, next)=>{

  // *** COPY OPERATORS HERE WHEN DONE ****
  
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

  // *** COPY OPERATORS HERE WHEN DONE ****

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