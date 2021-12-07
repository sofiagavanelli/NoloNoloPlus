/* Le tre applicazioni sono fatte con tre modelli applicativi diversi: il back-office deve essere realizzato 
con Javascript e JQuery. Le altre applicazioni con due framework diversi tra Angular, React, Vue e Svelte.*/

var fs = require('fs');
var path = require('path');
var express = require('express');
//var formidable = require('formidable');
var process = require('process');
var app = express();

var port = 8680;


//const app = express(); 
//const server = http.createServer(app);

process.chdir(__dirname);
app.use(express.json());

//che senso ha usare middleware così?
app.use("/public", express.static(path.resolve(__dirname, 'public')));

//app.use(express.static(`${__dirname}/..`));
//app.use(bodyParser.urlencoded({ extended: true }));

//import the middleware to manage the request of the three different app
/*var worker = */require('./backend/worker-module.js')(app);
/*var client = */require('./backend/client-module.js')(app);
/*var manager = *require('./backend/manager-module.js')(app);*/

//QUANDO SI USA ALMAWIFI COMMENTARE QUESTA RIGA
require("./db");


/*Home page VERSIONE VUE *
app.get("/",function (req, res) {

    res.sendFile(path.join(__dirname + "/app-vue/dist/index.html"));

    /*fs.readFile("index.html", function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("<h1>404 Not Found</h1>");
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    }); *
    
});

/********************** versione SENZA vue *
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/indexbase.html"));

    /*fs.readFile("index.html", function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("<h1>404 Not Found</h1>");
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });*
    
});

/* VERSIONE CON VUE
app.get("/",function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
    
});*/

//SI APRE DIRETTAMENTE IL WORKER
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/reserved.html"));
  
      /*fs.readFile("index.html", function (err, data) {
          if (err) {
              res.writeHead(404, { 'Content-Type': 'text/html' });
              return res.end("<h1>404 Not Found</h1>");
          }
  
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(data);
          return res.end();
      });*/
      
  });

//Ambiente worker
app.get('/worker-module', function (req, res) {
    res.sendFile(path.join(__dirname + "/reserved.html"));
});

//Ambiente manager
app.get('/manager-module', function (req, res) {
    res.sendFile(path.join(__dirname + "/manager.html"));
});


app.use(function(req, res){
    res.writeHead(404, {'Content-Type': 'text/html'});
    return res.end("<h1>404 Not Found</h1>");
});

app.listen(port, function() {});
console.log("Server Started");

/*server.on('error', (err) => {
    console.error(err);
});*/