/* Le tre applicazioni sono fatte con tre modelli applicativi diversi: il back-office deve essere realizzato 
con Javascript e JQuery. Le altre applicazioni con due framework diversi tra Angular, React, Vue e Svelte.*/

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//const mongoDB = require('mongodb');
var http = require('http');

//require("./db");

const app = express();
const server = http.createServer(app);

//import the middleware to manage the request of the three different app
var worker = require('./worker-module'); 
var client = require('./client-module');
var manager = require('./manager-module');
var newreg = require('./newreg-module'); 

const middleware = express.static(__dirname);
app.use(middleware);
//app.use(express.static(`${__dirname}/..`));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/Worker',worker); 
app.use('/Client',client); 
app.use('/Manager',manager); 
app.use('/NewReg',newreg);


app.get('/',(req,res) =>{
	res.status(200);
	res.sendFile(path.join(__dirname,"/index.html"));
});

server.on('error', (err) => {
  console.error(err);
});

const port = 8000;
server.listen(port, () => {
  console.log(`server is listening on ${port}`);
});