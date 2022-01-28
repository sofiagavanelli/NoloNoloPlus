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

    //TROVA RENT TRAMITE L'ID DEL PRODOTTO
    app.get('/rentByProd/:id', function (req, res) {

        res.writeHead(200);

        let _id = req.params.id;

        db.searchRentByProdID(_id).then(prodsinfo => {

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

    ///ELIMINAZIONE CLIENTE PER ID
    app.delete('/prods/:id', function(req, res){

        const id = req.params.id;
         db.deleteProd(id).then(() => {
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

        //var newClientInfo = JSON.parse(data);

        var image = req.body.a;
        var name = req.body.b;
        var surname = req.body.c; 
        var user = req.body.d;
        var city = req.body.e;
        var address = req.body.f;
        var pssw = req.body.g;
        var tel = req.body.h;
        var email = req.body.i;

        console.log(image + name + surname + user + city + address + pssw);

        //_img, _name, _surname, _username, _pass, _place, _address
        db.saveClient(image, name, surname, user, pssw, city, address, tel, email).then(result => {

            console.log(result);

            res.end();
        })
        
        //console.log(data);

    });

    app.post('/new-rent',(req, res)=>{

        console.log("sono nella post");
        console.log(req.body);

      const client = req.body.client;
      console.log(client);
      const prod = req.body.product; 
      const startdate = req.body.start;
      const enddate = req.body.end; 
      const price = req.body.price;
      const paymethod = req.body.pay;

      //non dobbiamo mettere che approved parte da false?

      /*_prod, _client, _start, _end, _worker, _price, _payment, _ok
                                                worker: null              approved: false*/
      db.saveRental(prod, client, startdate, enddate, null, price, paymethod, false).then((result) => {
        console.log(result);
      }

    )
    });

    /* //JOIN TRA CLIENTS E RENTAL PER GRAFICI MANAGER
    app.get('/clientsRental', function (req, res) {
        db.joinClientsRentals().then(prodsinfo => {*/


    app.post('/new-prod',(req, res)=>{

        const imm = req.body.filename;
        const cat = req.body.category;
        const nome = req.body.name;
        const marca = req.body.brand;
        const vel = req.body.speed;
        const len = req.body.length;
        const ospiti = req.body.guests;
        const anno = req.body.year;
        const desc = req.body.summary;
        const price_low= req.body.lowseason;
        const price_high = req.body.highseason;
        const idprod = req.body.product;
        const state = req.body.status;

      db.saveProd(cat, imm, nome, marca, vel, len, ospiti, anno, desc, price_low, price_high, idprod, state).then(() => {}

    )
    });
    
    app.post('/update-prod',(req, res)=>{
        const newvalues = { $set: {
             cat: req.body.category,
             nome: req.body.name,
             marca: req.body.brand,
             vel: req.body.speed,
             len: req.body.length,
             ospiti: req.body.guests,
             anno: req.body.year,
             desc: req.body.summary,
             price_low: req.body.lowseason,
             price_high: req.body.highseason,
             idprod: req.body.product,
             state: req.body.status } };
        const idprod = req.body.product;
      db.updateProd(idprod, newvalues).then(() => {}
      )
    });

    app.post('/update-client',async (req, res)=>{
        console.log("sono qua");
        
            const idcliente = req.body.clientID;
            var nome = req.body.name;
            var cognome = req.body.surname;
            //var user = req.body.clientID;
            var city = req.body.place;
            var add = req.body.address; 
            var cell = req.body.telefono;
            var mail = req.body.email;
            var note = req.body.note;

        console.log(idcliente);
       await db.updateClient(idcliente, nome, cognome, city, add, cell, mail, note)
    });

    
};
