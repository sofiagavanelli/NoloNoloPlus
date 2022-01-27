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

        let data = req.body;
        //var newClientInfo = JSON.parse(data);

        var image = data[0].a;
        var name = data[0].b;
        var surname = data[0].c; 
        var user = data[0].d;
        var city = data[0].e;
        var address = data[0].f;
        var pssw = data[0].g;
        var tel = data[0].h;
        var email = data[0].i;

        console.log(image + name + surname + user + city + address + pssw);

        //_img, _name, _surname, _username, _pass, _place, _address
        db.saveClient(image, name, surname, user, pssw, city, address, tel, email).then(result => {

            console.log(result);

            res.end();
        })
        
        //console.log(data);

    });

    app.post('/new-rent',(req, res)=>{

      const client = req.body.client;
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
        const stato = req.body.status;

     
      db.saveProd(cat, nome, marca, vel, len, ospiti, anno, desc, price_low, price_high, idprod, stato).then(() => {}

    )
    });

    /*S
    //NON FUNZIONA :(
    app.post('/update-prod',(req, res)=>{

        console.log(req.body);
        //const image
        const n = req.body.name;
        const b = req.body.brand;
        const s = req.body.speed;
        const l = req.body.length;
        const g = req.body.guests;
        const y = req.body.year;
        const sum = req.body.summary;
        const ls= req.body.lowseason;
        const hs = req.body.highseason;
        const pid = req.body.product;
        const cat = req.body.category;
        //available
        //discount

        db.updateProd(n, b, s, l, g, y, sum, ls, hs, pid, cat).then(() => {
            console.log("sono nella post");
            res.end();
        });

    }); */
    
};
