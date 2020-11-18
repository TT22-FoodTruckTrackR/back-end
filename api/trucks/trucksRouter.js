const express = require('express');
//new router
const router = express.Router();


//endpoints
//url: PORT/api/trucks

router.get('/',(req,res)=>{
  res.status(200).json({message:'Trucks router is connected'});
});


//export
module.exports = router;
