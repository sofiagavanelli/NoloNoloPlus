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

    app.get('/user-rentals/:id', function (req, res) {

        res.writeHead(200);

        let id = req.params.id;

        db.searchRentByClient(id).then(clientinfo => {

            res.write(JSON.stringify(clientinfo));

            res.end();
        });

        console.log("error");

    });

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

    })


};


