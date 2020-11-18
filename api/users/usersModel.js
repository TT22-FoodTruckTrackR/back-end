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
