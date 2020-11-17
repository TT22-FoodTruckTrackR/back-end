const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/usersModel');

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

//TESTING: GET ALL USERS
//---------
//usage: 
//GET /api/auth/operators
//GET /api/auth/diners
router.get('/:role', (req, res)=>{
  const role=req.params;

  Users.getAll(role)
    .then(users=>{
      res.status(200).json(users)
    })
    .catch(err=>{
      console.log(err)
      res.status(500).json({message:'Error getting users', error:err.message, name:err.name});
    })
  // res.status(200).json({message:'Test successful'});
});


//TESTING: GET USER BY NAME
//---------
//usage: 
//GET /api/auth/find/operators
//GET /api/auth/find/diners

router.get('/diners/:username', (req,res)=>{
  const username = req.params;


  Users.findByName(username, 'diners')
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({message:'Error getting user', error:err.message, name:err.name});
    });
});


router.get('/operators/:username', (req,res)=>{
  const username = req.params;


  Users.findByName(username, 'operators')
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({message:'Error getting user', error:err.message, name:err.name});
    });
});


//REGISTER
//---------
//usage: 
//POST /api/auth/register/operators
//POST /api/auth/register/diners

router.post('/register/:role',(req,res)=>{
  const role = req.params;
  const newUser = req.body;

  //theoretical env
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(newUser.password, rounds);
  newUser.password = hash;

  Users.addNew(newUser, role)
    .then(user=>{
      res.status(201).json({message:'User created successfully',user})
    .catch(err => {
      console.log(err);
      res.status(500).json({message:'Error creating user', error:err.message, name:err.name});
    });
  })
});


//LOGIN
//---------
//usage: 
//POST /api/auth/login/operators
//POST /api/auth/login/diners

router.post('/login/:role',(req,res)=>{
  const pendingUser = req.body;
  const role = req.params;

  Users.findByName(pendingUser.username, role)
    .then(user =>{
      if (user && bcrypt.compareSync(pendingUser.password, user.password)){
        const token = makeJwt(user);

        res.status(200).json({message:'Login successful, welcome!', token});
      }else{
        res.status(401).json({message:'invalid credentials'});
      }
      // res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message:'Error logging in user', error:err.message, name:err.name});
    });
});


// router.post('/register',(req,res)=>{
//   const credentials = req.body

//   //theoretical env
//   const round = process.env.BCRYPT_ROUNDS || 8;

//   const hash = bcrypt.hashSync(credentials.password, rounds);
//   credentials.password = hash;

//   users.addNew(credentials)
//     .then(user =>{
//       res.status(201).json({data:user});
//     })
//     .catch(err =>{
//       console.log(err);
//       res.status(500).json({message:err.message});
//     });
// });


//POST /api/auth/login


// router.post('/login',(req,res)=>{
//   users.findBy({username: username})
//     .then(user =>{
//       if (user && bcryptjs.compareSync(password, user.password)){
//         const token = makeJwt(user);

//         res.status(200).json({message:'Login successful, welcome!', token});
//       }else{
//         res.status(401).json({message:'invalid credentials'});
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({message:err.message});
//     });
// });

//-------------------------------------------


function makeJwt(user){

  const payload = {
    subject:user.id,
    username:user.username,
    role:user.role
  };

  const secret = process.env.JWT_SECRET || 'is it secret, is it safe?';
  //this is a theoretical env variable, not currently implemented

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secret, options)
}

module.exports = router;