const mongoose = require("mongoose");
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


module.exports = {

    //getUsers: async (options = {}) => User.find(options),
    saveClient: async (username, id, pass) => {
        /*await Client.insertOne({ username }, { id }, {pass}, { upsert: true });*/
        console.log(username + "--" + id + "--" + pass);

        new Client({
            name: username,
            client_id: id,
            password: pass
        }).save();
    },

    saveProd: async (_imageUrl, _name, _brand, _pow, _len, _guests, _yy, _sum, _price, _id,) => {
        /*await Client.insertOne({ username }, { id }, {pass}, { upsert: true });*/

        new Prodotto({
            image: _imageUrl,
            name: _name,
            brand: _brand,
            power: _pow,
            length: _len,
            guests: _guests,
            year: _yy,
            summary: _sum,
            price: _price,
            prod_id: _id,
            available: true
        }).save();
    },

    saveRental: async (_prod, _client, _start, _end) => {
        /*await Client.insertOne({ username }, { id }, {pass}, { upsert: true });*/

        new Noleggio({
            prod_id: _prod,
            client_id: _client,
            start_date: _start,
            end_date: _end
        }).save();
    },

    searchClient: async (id, pass) => {
        return Promise.resolve(Client.find({ name: id, password: pass}));
    },

    getProds: async (options = {}) => {
        
        //var prods = await Prodotto.find(options);

        return Promise.resolve(Prodotto.find(options));

    },

    getClients: async (options = {}) => {
        
        return Promise.resolve(Client.find(options));

    },

    getRentals: async (options = {}) => {
        
        return Promise.resolve(Noleggio.find(options));

    }

    //saveClients: async (options = {}) => Client.find(options),

    /*saveClient: async (options = {}) => {
        //var myobj = { name: "Company Inc", address: "Highway 37" };
        await Client.updateOne(options, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            //db.close();
        });
    },*/

};

//module.export = db;

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
