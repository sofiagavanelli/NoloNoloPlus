var fs = require('fs');
var formidable = require('formidable');
var db = require('../db');
/// definizione della chiamata get

module.exports = function (app) {

    app.get('/allClients', function (req, res) {

        res.writeHead(200);

        db.getClients().then(clientsinfo => {
            res.write(JSON.stringify(clientsinfo));
            res.end();
        });
    });

    app.get('/contacts', function (req, res) {

        res.writeHead(200);
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

        db.searchWorker(id).then(workerinfo => {

            res.write(JSON.stringify(workerinfo));

            res.end();
        });

        console.log("error");

    });

    //app.get

};
