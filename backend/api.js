var fs = require('fs');
var formidable = require('formidable');
var db = require('../db');

/// definizione della chiamata get

module.exports = function (app) {

    app.get('/prods', function (req, res) {
        //lettura dei clients dal db

        res.writeHead(200);

        db.getProds().then(prodsinfo => {

            res.write(JSON.stringify(prodsinfo));
            res.end();
        });

    });

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

    //RICERCA NOLEGGIO TRAMITE UTENTE
    app.get('/user-rentals/:id', function (req, res) {

        res.writeHead(200);

        let id = req.params.id;

        db.searchRentByClient(id).then(clientinfo => {

            res.write(JSON.stringify(clientinfo));

            res.end();
        });

        console.log("error");

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

    ///RICERCA PRODOTTO PER ID
    app.get('/prods/:id', function (req, res) {

        res.writeHead(200);

        let id = req.params.id;

        console.log(id);

        db.searchProd(id).then(prodsinfo => {

            res.write(JSON.stringify(prodsinfo));

            res.end();
        });

        //console.log("error");

    });



    /******************************APP DELETE */

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

    

    /*************************APP POST */

    //PROVA POST 

    app.post('/new-client', function (req, res) {

        res.writeHead(200);

        console.log("sono nella post");

        let data = req.body;
        //var newClientInfo = JSON.parse(data);

        var image = data[0].a;
        var name = data[0].b;
        var surname = data[0].c; 
        var user = data[0].d;
        var city = data[0].e;
        var address = data[0].f;
        var pssw = data[0].g;

        console.log(image + name + surname + user + city + address + pssw);

        //_img, _name, _surname, _username, _pass, _place, _address
        db.saveClient(image, name, surname, user, pssw, city, address).then(result => {

            console.log(result);

            res.end();
        })
        
        //console.log(data);

    });

    app.post('/',(req, res)=>{

      const client = req.body.client;
      const prod = req.body.product; 
      const startdate= req.body.start;
      const enddate= req.body.end; 

      //console.log(client +" "+ prod  +" "+ startdate  +" "+ enddate);
      db.saveRental(prod, client, startdate, enddate, true).then(() => {
        //console.log("aaaaaaaaaaaaaaaa");
        //res.status(200);
        //res.end();
        //res.redirect(reserved.html);
      }
    )
    });

};