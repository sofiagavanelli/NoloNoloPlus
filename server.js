/* Le tre applicazioni sono fatte con tre modelli applicativi diversi: il back-office deve essere realizzato 
con Javascript e JQuery. Le altre applicazioni con due framework diversi tra Angular, React, Vue e Svelte.*/

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

//che senso ha usare middleware così?
app.use("/public", express.static(path.resolve(__dirname, 'public')));

//app.use(express.static(`${__dirname}/..`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import the middleware to manage the request of the three different app
/*var worker = */require('./backend/worker-module.js')(app);
/*var client = */require('./backend/client-module.js')(app);
/*var manager = */require('./backend/manager-module.js')(app);

//QUANDO SI USA ALMAWIFI COMMENTARE QUESTA RIGA
require("./db");

//VERSIONE CON VUE
app.get("/",function (req, res) {
    res.sendFile(path.join(__dirname + '/app-vue/dist/index.html'));
    
});

//SI APRE DIRETTAMENTE IL WORKER
app.get("/worker", (req, res) => {
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


//Ambiente manager
app.get('/manager', function (req, res) {
    res.sendFile(path.join(__dirname + "/manager.html"));
});


app.use(function(req, res){
    res.writeHead(404, {'Content-Type': 'text/html'});
    return res.end("<h1>404 Not Found</h1>");
});

const PORT = process.env.PORT || 8680;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});