/* Le tre applicazioni sono fatte con tre modelli applicativi diversi: il back-office deve essere realizzato 
con Javascript e JQuery. Le altre applicazioni con due framework diversi tra Angular, React, Vue e Svelte.*/

require("dotenv").config();

var fs = require('fs');
const cors = require("cors");
var path = require('path');
var express = require('express');
//var formidable = require('formidable');
var bodyParser = require('body-parser');
var process = require('process');

var app = express();

app.use(cors());

process.chdir(__dirname);
app.use(express.json());

//middleware per vue
app.use("/js", express.static(path.resolve(__dirname, 'public/js')));
app.use("/css", express.static(path.resolve(__dirname, 'public/css')));
app.use("/html", express.static(path.resolve(__dirname, 'public/html')));
app.use('/img' , express.static(__dirname  +'/public/img'));
app.use("/public", express.static(path.resolve(__dirname, 'public')));

//per react
app.use("/manager", express.static(path.resolve(__dirname, 'build')));
app.use("/static", express.static(path.resolve(__dirname, 'build/static')));
app.post('/loginManager', (req, res) => {
    res.send({
      token: req.body.username
    });
});

//app.use(express.static(`${__dirname}/..`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import the middleware to manage the request of the three different app
require('./backend/api.js')(app);

//QUANDO SI USA ALMAWIFI COMMENTARE QUESTA RIGA
require("./db");

// Versione con React - manager dashboard
app.get("/",function (req, res) {
    res.sendFile(path.join(__dirname + '/public/html/index.html'));
    
});

app.get("/manager",function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
    
});

app.get("/manager/*",function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
    
});

app.get("/worker", (req, res) => {    
    res.sendFile(path.join(__dirname + "/reserved.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname + "/login.html"));
        
});

app.get("/new-rent", (req, res) => {
    res.sendFile(path.join(__dirname + "/reserved.html"));     
});



app.use(function(req, res){
    res.writeHead(404, {'Content-Type': 'text/html'});
    return res.end("<h1>404 Not Found</h1>");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
