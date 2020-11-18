const db = require('../../data/dbConfig');


module.exports={
  getUsers,
  // getUserById,
  addNewUser
}

// GET ALL 
function getUsers(){
  return db('users');
}


//ADD NEW
async function addNewUser(user){
  //validate: name/email are unique
  //validate: all fields present
  //initialize: set role to match endpoint

  //insert user
  const [id] = await db('users').insert(user);

  //return newly created user
  const created = db('users')
    .where('users.id',id)
    .first();

  console.log(created);
  return created;
}
