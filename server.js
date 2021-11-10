/* Le tre applicazioni sono fatte con tre modelli applicativi diversi: il back-office deve essere realizzato 
con Javascript e JQuery. Le altre applicazioni con due framework diversi tra Angular, React, Vue e Svelte.*/

var fs = require('fs');
var path = require('path');
var express = require('express');
var formidable = require('formidable');
var process = require('process');
var app = express();

var port = 8680;

/*const express = require('express');
    const path = require('path');
    const bodyParser = require('body-parser');
    //const mongoDB = require('mongodb');
    //var http = require('http');

//require("./db");

const app = express(); */
//const server = http.createServer(app);

process.chdir(__dirname);
app.use(express.json());

//che senso ha usare middleware così?
const middleware = express.static(__dirname);
app.use(middleware);

//app.use(express.static(`${__dirname}/..`));
//app.use(bodyParser.urlencoded({ extended: true }));

//import the middleware to manage the request of the three different app
/*var worker = */require('./backend/worker-module.js')(app);
/*var client = */require('./backend/client-module.js')(app);
/*var manager = */require('./backend/manager-module.js')(app);



//QUANDO SI USA ALMAWIFI COMMENTARE QUESTA RIGA
require("./db");


/*app.use('/Worker', worker);
app.use('/Client', client);
app.use('/Manager', manager);
////////////////////////////////
app.use('/catalog', catalogRouter);*/
///////////////////////////////

//Home page
app.get("/",function (req, res) {
    fs.readFile("index.html", function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("<h1>404 Not Found</h1>");
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    }); 
    
});

//Ambiente client
app.get('/client-module', function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

//Ambiente worker
app.get('/worker-module', function (req, res) {
    res.sendFile(path.join(__dirname + "/back_office/reserved.html"));
    //res.sendFile(path.join(__dirname + "/author.html"));
});

//Ambiente manager
app.get('/manager-module', function (req, res) {
    res.sendFile(path.join(__dirname + "/back_office/manager.html"));
    //res.sendFile(path.join(__dirname + "/author.html"));
});
/*

var router = express.Router();
/*router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});*/

/*router.get('/', function(req, res, next) {
    res.redirect('/catalog');
});*/

/*app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, "/index.html"));
});*/

app.use(function(req, res){
    res.writeHead(404, {'Content-Type': 'text/html'});
    return res.end("<h1>404 Not Found</h1>");
});

app.listen(port, function() {});
console.log("Server Started");

/*server.on('error', (err) => {
    console.error(err);
});*

const port = 8680;
server.listen(port, () => {
    console.log(`server is listening on ${port}`);
});*/




///////////////////////////////////////////////////////////////7
/* DARIO 
var fs = require('fs');
var path = require('path');
var express = require('express');
var formidable = require('formidable');
var process = require('process');
var app = express();
var port = 8000;

//Cambia la working directory alla directory che contiene questo file
process.chdir(__dirname);

//Parsing di body json nelle richieste che specificano application/json come content type
app.use(express.json());

//Rende disponibili tutti i file nella directory public e nelle sue subdirectory
app.use("/public", express.static(path.resolve(__dirname, 'public')));

//Stories API
require('./server/stories.js')(app);

//Players API
require('./server/players.js')(app);

//Upload di file
require('./server/upload.js')(app);

//Home page
app.get("/",function (req, res) {
    fs.readFile("home.html", function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("<h1>404 Not Found</h1>");
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    }); 
    
});

//Ambiente player
app.get('/player', function (req, res) {
    res.sendFile(path.join(__dirname + "/player.html"));
});

//Ambiente author
app.get('/author', function (req, res) {
    res.sendFile(path.join(__dirname + "/author.html"));
});

//Ambiente evaluator
app.get('/evaluator', function (req, res) {
    res.sendFile(path.join(__dirname + "/evaluator.html")); 
});

//Handler in caso di richieste inesistenti
app.use(function(req, res){
    res.writeHead(404, {'Content-Type': 'text/html'});
    return res.end("<h1>404 Not Found</h1>");
});

app.listen(port, function() {});
console.log("Server Started"); */