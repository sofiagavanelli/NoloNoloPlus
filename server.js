/* Le tre applicazioni sono fatte con tre modelli applicativi diversi: il back-office deve essere realizzato 
con Javascript e JQuery. Le altre applicazioni con due framework diversi tra Angular, React, Vue e Svelte.*/

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//const mongoDB = require('mongodb');
var http = require('http');

require("./db");

const app = express();
const server = http.createServer(app);

//import the middleware to manage the request of the three different app
var worker = require('./worker-module'); //editor-module');
var client = require('./client-module'); //player-module');
var manager = require('./manager-module'); //valutatore-module');
var auth = require('./auth-module'); 

app.use(express.static(`${__dirname}/..`));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/Worker',worker); //'/Editor',editor);
app.use('/Client',client); //'/Play',player);
app.use('/Manager',manager); //'/Valutatore',valutatore);
app.use('/Auth',auth);


app.get('/',(req,res) =>{
	res.status(200);
	res.sendFile(path.join(__dirname,"index.html"));
});

server.on('error', (err) => {
  console.error(err);
});

server.listen(8000, () => {
  console.log('server is listening on 8000');
});