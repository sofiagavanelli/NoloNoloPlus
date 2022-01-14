var fs = require('fs');
var formidable = require('formidable');
var db = require('../db');

module.exports = function (app) {

    app.get('/prods', function (req, res) {
        //lettura dei clients dal db

        res.writeHead(200);

        db.getProds().then(prodsinfo => {

            res.write(JSON.stringify(prodsinfo));
            res.end();
        });

    });

    app.get('/client/:id', function (req, res) {

        res.writeHead(200);

        let id = req.params.id;

        db.searchClientID(id).then(clientinfo => {

            //console.log("sono in module " + clientinfo);

            res.write(JSON.stringify(clientinfo));

            res.end();
        });

        console.log("error");

    });


};


