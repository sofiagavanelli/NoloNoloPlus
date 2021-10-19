const auth = require('express').Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs-extra');


//una volta apre il manager e un'altra gli operai
auth.get('/',(req,res) =>{
	res.status(200).sendFile(path.join(__dirname,"/Auth/access.html"));
})



module.exports = auth;
