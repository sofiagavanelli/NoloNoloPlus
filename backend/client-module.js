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

            res.write(JSON.stringify(clientinfo));

            res.end();
        });

        console.log("error");

    });

    app.post('/new-client/:data', function (req, res) {

        res.writeHead(200);

        let data = req.params.data;
        var clientInfo = JSON.parse(data);
        
        console.log(data);

    })


};


