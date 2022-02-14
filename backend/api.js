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

    //FUNZIONE CHE RITORNA TUTTI I DIPENDENTI
    app.get('/allWorker', function (req, res) {

        res.writeHead(200);

        db.getWorker().then(workerinfo => {
            
            res.write(JSON.stringify(workerinfo));
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

    app.delete('/worker/:id', function(req, res){
        const id = req.params.id;
         db.deleteWorker(id).then(() => {
          res.status(200);
          res.end();
          })
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
        var bday = req.body.j;

        db.searchClientID(user).then(proof => {

            var prova = JSON.stringify(proof);

            console.log("risultato:" + prova + " lunghezza: " + prova.length + " :era qui");

            if(prova.length > 2) {
                console.log("sono entrato in proof");
                res.write(JSON.stringify(false));

                res.end();
            }
            else {
                //_img, _name, _surname, _username, _pass, _place, _address
                db.saveClient(image, name, surname, user, pssw, city, address, tel, email, bday).then(result => {

                    res.write(JSON.stringify(true));
                    console.log(result);

                    res.end();
                })
            }
        
        })
        //console.log(data);

    });

    app.post('/new-worker', function(req, res){
        res.writeHead(200);
        var name= req.body.name;
        var surname=req.body.surname;
        var password= req.body.password;
        var manager= req.body.manager;
        var user_id= req.body.user_id;
        var year= req.body.year;
        db.searchWorkerID(user_id).then(proof=>{
            var risultato= JSON.stringify(proof);
            if(risultato.length>2){
                res.write(JSON.stringify(false));
                res.end();
            }else{
                db.saveWorker(name, surname, password, year, manager, user_id).then(result => {
                    res.write(JSON.stringify(true));
                    res.end();
                })
            }
        })
    });

    app.post('/new-rent',(req, res)=>{


        
        console.log("sono in new rent");
        console.log(req.body);

      var client = req.body.client;
      console.log(client);
      var prod = req.body.product; 
      var startdate = req.body.start;
      var enddate = req.body.end; 
      var price = req.body.price;
      var paymethod = req.body.pay;
      var work = req.body.worker;

      //non dobbiamo mettere che approved parte da false?

      /*_prod, _client, _start, _end, _worker, _price, _payment, _ok
                                                worker: null              approved: false*/
        db.saveRental(prod, client, startdate, enddate, work, price, paymethod, null).then((result) => {
            console.log(result);
        }

    )
    });


    app.post('/new-prod',(req, res)=>{

        var imm = req.body.filename;
        var cat = req.body.category;
        var nome = req.body.name;
        var marca = req.body.brand;
        var vel = req.body.speed;
        var len = req.body.length;
        var ospiti = req.body.guests;
        var anno = req.body.year;
        var desc = req.body.summary;
        var price_low= req.body.lowseason;
        var price_high = req.body.highseason;
        var idprod = req.body.product;
        var state = req.body.stato;

      db.saveProd(cat, imm, nome, marca, vel, len, ospiti, anno, desc, price_low, price_high, idprod, state).then(() => {}

    )
    });

    app.post('/add-discount',async (req, res)=>{

        console.log(req.body.clientID);

        const idcliente = req.body.clientID;

        await db.addDiscount(idcliente, 15)
    });

    app.post('/remove-discount',async (req, res)=>{

        console.log(req.body.clientID);

        const idcliente = req.body.clientID;

        await db.addDiscount(idcliente, 0)
    });

    app.post('/update-client',async (req, res)=>{
        console.log("sono nell'update dei clienti ");
        
            const idcliente = req.body.clientID;
            var nome = req.body.name;
            var cognome = req.body.surname;
            var pass = req.body.pass;
            var city = req.body.place;
            var add = req.body.address; 
            var cell = req.body.telefono;
            var mail = req.body.email;
            var bday = req.body.birth;
            var note = req.body.note;

        console.log(idcliente);
       await db.updateClient(idcliente, nome, cognome, pass, city, add, cell, mail, bday, note)
    });

    app.post('/update-prod',async (req, res)=>{
        console.log("sono nell'update dei prodotti");

        const idprod = req.body.product;
        var cat= req.body.category;
        var imm= req.body.image;
        var nome = req.body.name;
        var marca = req.body.brand;
        var vel = req.body.speed;
        var len = req.body.length;
        var ospiti = req.body.guests;
        var anno = req.body.year;
        var desc = req.body.summary;
        var price_low = req.body.lowseason;
        var price_high = req.body.highseason;
        var state = req.body.stato;  

        console.log(idprod);
       await db.updateProd(idprod, cat, imm, nome, marca, vel, len, ospiti, anno, desc, price_low, price_high, state)
    });

    //UPDATE RENT PER L'ELIMINAZIONE
    app.post('/delete-rent',async (req, res)=>{

        var rent_id = req.body.id;
        console.log(req.params.id);

        await db.deleteBoolRent(rent_id)
    });

    app.post('/deliver-rent',async (req, res)=>{

        var rent_id = req.body.id;
        console.log(req.params.id);

        await db.deliverBoolRent(rent_id)
    });

    
};
