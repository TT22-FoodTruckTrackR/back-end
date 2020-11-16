const express = require('express');
// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const Users = require('../users/usersModel');

const router = express.Router();

//-------------------------------------------
//endpoints

//POST /api/auth/register
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


//usage: 
//POST /api/auth/operators
//POST /api/auth/diners
router.post('/register/:role',(req,res)=>{
  const role = req.params;
  const newUser = req.body;

  Users.addNew(newUser)
    .then(user=>{
      res.status(201).json({message:'User created successfully',user})
    .catch(err => {
      console.log(err);
      res.status(500).json({message:'Error creating user', error:err.message, name:err.name});
    });
  })

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


// function makeJwt(user){

//   const payload = {
//     subject:user.id,
//     username:user.username,
//     role:user.role
//   };

//   const secret = process.env.JWT_SECRET || 'is it secret, is it safe?';
//   //this is a theoretical env variable, not currently implemented

//   const options = {
//     expiresIn: '1h'
//   }

//   return jwt.sign(payload, secret, options)
// }

module.exports = router;