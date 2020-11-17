// const db = require('../../data/dbConfig');


module.exports={
  getAllDiners,
  getAllOperators
}

async function getAllDiners(){
  // try{
  //   return db('diners');
  // }catch(err){
  //   console.log(err)
  //   return err;
  // }
}

async function getAllOperators(){
  // try{
  //   return db('operators');
  // }catch(err){
  //   console.log(err)
  //   return err;
  // }
  console.log('Test success');
  return 'getAllOperators successful';
  // return Promise.resolve('getAllOperators successful');
}

// ////OLD--------------------------------------------
//----------------------------------------------------
//----------------------------------------------------

// const db = require('../../data/dbConfig');

// module.exports={
//   getAll,
//   findById,
//   addNew,
//   findByName

// };
// async function getAll(role){
//   try {
//     return db(role);
//   }catch(err){
//     console.log(err)
//     return err;
//   }
  
//   // console.log('UsersModel test successful');
//   // return 'UsersModel test successful';
// }

// // ----- findById(id, role)
// // ----- requires user id, user role diner/operator

// async function findById(id, role){
//   try {
//     return db(role).where(id).first();

//   }catch(err){
//     console.log(err)
//     return err;
//   }
// }
// // async function findById(id){
// //   return db('diners')
// //   .where('diners.id', id)
// //   .first()
// //   ;
// // }

// // ----- addNew(user)
// // ----- requires all user fields
// async function addNew(user, role){
//   // const [id] = await db(role)
//   //   .insert(user)
//   //   ;
//   // return db(role)
//   //   .where(id)
//   //   .first()
//   //   ;
//   try {
//     const [id] = await db(role)
//       .insert(user);
//       try{
//         return findById(id);
//       }catch(err){
//         console.log(err)
//         throw 'Error: Users.addNew';
//       }
//   } catch (err) {
//     console.log(err)
//     throw 'Error: Users.addNew';
//   }
// }

// // ----- findByName(username, role)
// // ----- requires username, user role diner/operator
// async function findByName(username, role){

//   try {
//     return db(role)
//     .where(username)
//     .first()
//     ;

//   }catch(err){
//     console.log(err)
//     throw 'Error: Users.addNew';
//   }
// }

