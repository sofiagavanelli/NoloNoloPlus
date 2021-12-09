const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(process.cwd() + '/my-app/dist'));

const db = require("./db");

// simple route
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + '/my-app/dist/index.html');
});

app.get('/prods', function (req, res) {
    //lettura dei clients dal db

    res.writeHead(200);

    db.getProds().then(prodsinfo => {

        res.write(JSON.stringify(prodsinfo));
        res.end();
    });

});


// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
