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
  "location":1 integer, optional
}
*/


// //---------
// //TESTING: GET ALL USERS
// //---------

// //GET /api/auth/users
//---------------------------------
router.get('/users', (req, res, next)=>{
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
      next();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({message:'Server error retrieving userlist'});
    })
});

router.get('/users/:id', (req, res, next)=>{
  const id = req.params.id;

  Users.getUserById(id)
    .then(user => {
      res.status(200).json(user);
      next();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({message:'Server error retrieving user'});
    })

})

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
  newUser.isOperator = 1;

  //theoretical env
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(newUser.password, rounds);
  newUser.password = hash;

  Users.addNewUser(newUser)
    .then(user => {
      res.status(201).json(user);
      next();
    })
    .catch(err=>{
      console.log(err);

      res.status(500).json({message:'Server error retrieving creating new user'});
    });
});



//POST /api/auth/register
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