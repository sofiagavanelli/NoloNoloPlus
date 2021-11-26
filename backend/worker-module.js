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


    app.get('/allRents', function (req, res) {

        res.writeHead(200);

        db.getRents().then(rentsinfo => {
            
            res.write(JSON.stringify(rentsinfo));
            res.end();
        });
    });

    //app.get

};
