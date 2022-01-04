var fs = require('fs');
var formidable = require('formidable');
var db = require('../db');

/// definizione della chiamata get

module.exports = function (app) {

    ///FUNZIONE CHE RITORNA TUTTI I CLIENTI
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

    ///FUNZIONE CHE RITORNA TUTTI I NOLEGGI 
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

        //console.log(id);

        db.searchWorker(id).then(rentsinfo => {

            res.write(JSON.stringify(rentsinfo));

            res.end();
        });

        //console.log("error");

    });
    

    ///RICERCA NOLEGGIO PER ID
    app.get('/allRents/:id', function (req, res) {

        res.writeHead(200);

        let id = req.params.id;

        //console.log(id);

        db.searchRent(id).then(workerinfo => {

            res.write(JSON.stringify(workerinfo));

            res.end();
        });

        //console.log("error");

    });

    ///RICERCA CLIENTE PER ID
    app.get('/allClients/:id', function (req, res) {

        res.writeHead(200);

        let id = req.params.id;

        //console.log(id);

        db.searchClientID(id).then(clientsinfo => {

            res.write(JSON.stringify(clientsinfo));

            res.end();
        });

        //console.log("error");

    });


    ///ELIMINAZIONE CLIENTE PER ID
    app.delete('/allClients/:id', function(req, res){

        const id = req.params.id;
         db.deleteClient(id).then(() => {
          res.status(200);
          res.end();
          }
        )

        });

    ////ELIMINAZIONE NOLEGGIO PER ID
    app.delete('/allRents/:id', function(req, res){

        const idR = req.params.id;
         db.deleteRental(idR).then(() => {
             //console.log(idR);
          res.status(200);
          res.end();
          }
        )

        });

};
