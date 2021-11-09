/*const mongoose = require("mongoose");
const connectionString = "mongodb+srv://user1:user1pass@cluster0.hbwrn.mongodb.net/rental_agency?retryWrites=true&w=majority";

const Client = require("./models/client");
const Noleggio = require("./models/noleggi");
const Prodotto = require("./models/prod");
const Worker = require("./models/worker");

if (!connectionString) {
    console.error("MongoDB connection string missing!");
    process.exit(1);
}

mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
    console.error("MongoDB error: " + err.message);
    process.exit;
});
db.once("open", () => console.log("mongoDB connection established"));

module.export = db;

/*Client.find((err, clients) => {
    if (err) return console.error(err);
    if (clients.length) return;

    new Client({
        name: "Maria",
        client_id: "123bbn4",
        password: "blabla",
    }).save();
});

/*Manager.find((err, managers) => {
    if (err) return console.error(err);
    if (managers.length) return;

    new Manager({
        name: "Mario",
        password: "blubla",
    }).save();
});

Worker.find((err, workers) => {
    if (err) return console.error(err);
    if (workers.length) return;

    new Worker({
        name: "Marco",
        password: "tututu",
    }).save();
});

Prodotto.find((err, prods) => {
    if (err) return console.error(err);
    if (prods.length) return;

    new Prodotto({
        name: "Apollo",
        prod_id: "p94035jj",
        summary: "Bella ciao",
        power: "120",
        available: false
    }).save();
});

Noleggio.find((err, rentals) => {
    if (err) return console.error(err);
    if (rentals.length) return;

    new Noleggio({
        prod_id: "p93292377g",
        client_id: "c9384hh",
        start_date: 2021 - 6 - 6,
        end_date: 2021 - 7 - 7
    }).save();
});*/

//*******************************************/
/* FILE DI GITHUB */

/*module.exports = {
  getUsers: async (options = {}) => User.find(options),
  saveUser: async (username, id) => {
    await User.updateOne({ id }, { username }, { upsert: true });
  },
  getStories: async (options = {}, fields = "") =>
    NewStory.find(options, fields),
  saveStory: async (storyname, adj, nodes, css, published) => {
    await NewStory.updateOne(
      { title: storyname },
      { pages: nodes.length + 1, adj, nodes, css, published },
      { upsert: true }
    );
  },
  deleteStory: async (options = {}) => {
    NewStory.deleteOne(options, function (err) {});
  },
  saveActiveUser: async (username, id, story, activity) => {
    await ActiveUser.updateOne(
      { id },
      { username, story, activity },
      { upsert: true }
    );
  },
  deleteActiveUser: async (options = {}) => {
    await ActiveUser.deleteOne(options);
  },
};*/

/*async function connessione() {
    if (!connectionString) {
        console.error("MongoDB connection string missing!");
        process.exit(1);
    }
    await mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    db.on("error", (err) => {
        console.error("MongoDB error: " + err.message);
        process.exit;
    });
    db.once("open", () => {
        db.collection("NoloNoloDB").find(query);
        console.log("mongoDB connection established")
    });

};*/

//console.log(db);

//var query = { address: "12344" };

//const a = db.collection("NoloNoloDB").find(query);

//var myobj = { name: "Company Inc", address: "Highway 37" };

/*module.exports = {

    //getUsers: async (options = {}) => User.find(options),
    /*saveUser: async (username, id) => {
    await User.updateOne({ id }, { username }, { upsert: true });
    },*

    /*saveClients: async (options = {}) => Client.find(options),*/

    /*saveClient: async (options = {}) => {
        //var myobj = { name: "Company Inc", address: "Highway 37" };
        await Client.updateOne(options, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            //db.close();
        });
    },*

};*/

/*var dbo = db.db("mydb");
function addObject() {
    var myobj = { name: "Company Inc", address: "Highway 37" };
    db.collection("customers").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
}*/

