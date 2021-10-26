const newreg = require('express').Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs-extra');


//una volta apre il manager e un'altra gli operai
newreg.get('/',(req,res) =>{
	res.status(200).sendFile(path.join(__dirname,"/front_office/new_reg.html"));
})



module.exports = newreg;
