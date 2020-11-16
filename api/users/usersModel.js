const db = require('../../data/dbConfig');

module.exports={
  getAll,
  // findById,
  addNew,
  findByName

};
async function getAll(role){

  return db(role);
  // console.log('UsersModel test successful');
  // return 'UsersModel test successful';
}

// ----- findById(id, role)
// ----- requires user id, user role diner/operator

// async function findById(id){
//   return db('diners')
//   .where('diners.id', id)
//   .first()
//   ;
// }

// ----- addNew(user)
// ----- requires all user fields
async function addNew(user, role){
  const [id] = await db(role)
    .insert(user)
    ;

  return db(role)
    .where(id)
    .first()
    ;
}

// ----- findByName(username, role)
// ----- requires username, user role diner/operator
async function findByName(username, role){
  return db(role)
  .where(username)
  .first()
  ;
}

