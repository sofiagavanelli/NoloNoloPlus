const manager = require('express').Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs-extra');


//una volta apre il manager e un'altra gli operai
manager.get('/',(req,res) =>{
	res.status(200).sendFile(path.join(__dirname,"/back_office/manager.html"));
})



module.exports = manager;
