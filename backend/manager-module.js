/*const manager = require('express').Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs-extra');


//una volta apre il manager e un'altra gli operai
manager.get('/',(req,res) =>{
	res.status(200).sendFile(path.join(__dirname,"/back_office/manager.html"));
})



module.exports = manager;*/


var fs = require('fs');
var formidable = require('formidable');
var db = require('../db');

module.exports = function (app) {
	app.get('/allClients', function (req, res) {

        res.writeHead(200);

        db.getClients().then(clientsinfo => {
            res.write(JSON.stringify(clientsinfo));
            res.end();
        });
    });

	app.get('/allRents', function (req, res) {

        res.writeHead(200);

        db.getRentals().then(rentsinfo => {
            
            res.write(JSON.stringify(rentsinfo));
            res.end();
        });
    });

	app.get('/worker/:id', function (req, res) {

        res.writeHead(200);

        let id = req.params.id;

        console.log(id);

        db.searchWorker(id).then(rentsinfo => {

            res.write(JSON.stringify(rentsinfo));

            res.end();
        });

        console.log("error");

    });
};
