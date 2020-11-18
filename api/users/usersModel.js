const db = require('../../data/dbConfig');


module.exports={
  getAllDiners,
  getAllOperators
}

async function getAllDiners(){

}

function getAllOperators(){
  return db('users');
}
