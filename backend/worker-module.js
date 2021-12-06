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

    app.delete('/allClients/:id', async(req, res) => {

        const id = req.params.id;
         db.deleteClient(id).then(() => {
          res.status(200);
          }
        )

        });



/* app.delete('/allClients/:id', (req, res, next) => {
    db.deleteClient({_id: req.params.id}).then(
      () => {
        res.status(200);
        console.log("deleted");
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });*/

};
