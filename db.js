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

    saveRental: async (_rent, _prod, _client, _start, _end) => {
        /*await Client.insertOne({ username }, { id }, {pass}, { upsert: true });*/

        new Noleggio({
            rent_id: _id,
            prod_id: _prod,
            client_id: _client,
            start_date: _start,
            end_date: _end
        }).save();
    },

    searchClientID: async (id) => {
        return Promise.resolve(Client.find({ client_id: id }));
    },

    //search con il nome per il login! così l'ID rimane ""privato""
    searchClient: async (_name) => {
        return Promise.resolve(Client.find({ name: _name }));
    },

    searchWorker: async (id) => {
        return Promise.resolve(Worker.find({ work_id: id }));
    },

    searchProd: async (id) => {
        return Promise.resolve(Prodotto.find({ prod_id: id}));
    },

    searchRent: async (id) => {
        return Promise.resolve(Noleggio.find({ rent_id: id}));
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

    },

    //delete functions: Schema.deleteOne(options); Schema.deleteOne(options, function (err) {});

    deleteClient: async (id) => {
        return Promise.resolve(Client.findOneAndDelete({ client_id : id }));
    },

    deleteProd: async (id) => {
        Prodotto.deleteOne({prod_id: id})
    },

    deleteRental: async (id) => {
        return Promise.resolve(Noleggio.findOneAndDelete({ rental_id : id }));
    },

};
