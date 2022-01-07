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

    //PROVA POST 

    app.post('/', function(req, res, next) {

      console.log(req.body.client);
      console.log(req.body.product); 
      console.log(req.body.start);
      console.log(req.body.end); 
    
      const client = req.body.client;
      const prod = req.body.product; 
      const startdate= req.body.start;
      const enddate= req.body.end; 

      console.log(client +" "+ prod  +" "+ startdate  +" "+ enddate);
    
    /*rentDetails.saveRental(function(err,req1){
        if(err) throw err;
        rent_prova.exec(function(err,data){
          if(err) throw err;
          res.render('reserved', { title: 'Rent Records', records:data, success:'Record Inserted Successfully' });
            });
      })*/
      db.saveRental(prod, client, startdate, enddate).then(() => {
        if (err) throw err;
        res.render('reserved', { title: 'Rent Records', records:data, success:'Record Inserted Successfully' });
        console.log("aaaaaaaaaaaaaaaa");
        //res.status(200);
        //res.end();
      }
    )
    });

};
