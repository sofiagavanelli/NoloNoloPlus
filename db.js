const mongoose = require("mongoose");
//da inserire in una variabile env:
const connectionString = "mongodb+srv://user1:user1pass@cluster0.hbwrn.mongodb.net/rental_agency?retryWrites=true&w=majority";

const Client = require("./Models/client");
const Noleggio = require("./Models/noleggi");
const Prodotto = require("./Models/prod");
const Worker = require("./Models/worker");


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

    //getUsers: async (options = {}) => User.find(options) tel, email,
    saveClient: async (_img, _name, _surname, _username, _pass, _place, _address, tel, email) => {
        
        console.log(_username + "--" + _name + "--" + _pass);

        new Client({
            image: _img,
            name: _name,
            surname: _surname,
            client_id: _username,
            password: _pass,
            place: _place,
            address: _address,
            phone: tel, 
            email: email
        }).save();
    },

    saveProd: async (_category,_imageUrl, _name, _brand, _pow, _len, _guests, _yy, _sum, _low_season,_high_season, _id, _status) => {
        /*await Client.insertOne({ username }, { id }, {pass}, { upsert: true });*/

        new Prodotto({
            category: _category,
            image: _imageUrl,
            name: _name,
            brand: _brand,
            power: _pow,
            length: _len,
            guests: _guests,
            year: _yy,
            summary: _sum,
            plow_season:_low_season,
            high_season: _high_season,
            prod_id: _id,
            status: _status,
            available: true
        }).save();
    },

    saveRental: async (/*_rent,*/ _prod, _client, _start, _end, _worker, _price, _payment, _ok) => {
        /*await Client.insertOne({ username }, { id }, {pass}, { upsert: true });*/

        /*const newN =*/ return Promise.resolve(new Noleggio({
            //_id: _id,
            prod_id: _prod,
            client_id: _client,
            start_date: _start,
            end_date: _end,
            worker_id: _worker,
            price: _price,
            paymethod: _payment,
            approved: _ok,
            //worker_id: _worker
        }).save());
        
        //await newN.save();


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
        return Promise.resolve(Noleggio.find({ _id: id}));
    },

    searchRentByProdID: async (id) => {
        return Promise.resolve(Noleggio.find({ prod_id: id}));
    },

    searchRentByClient: async (username) => {
        return Promise.resolve(Noleggio.find({ client_id: username}));
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


    deleteClient: async (id) => {
        return Promise.resolve(Client.findOneAndDelete({ client_id : id }));
    },

    deleteProd: async (id) => {
        return Promise.resolve(Prodotto.findOneAndDelete({ prod_id : id }));

    },

    deleteRental: async (id) => {
        return Promise.resolve(Noleggio.findOneAndDelete({ _id : id }));
    },

    updateProd: async (id) => {
        return Promise.resolve(Prodotto.findOneAndUpdate({ 
            prod_id : id,
            category: _category,
            image: _imageUrl,
            name: _name,
            brand: _brand,
            power: _pow,
            length: _len,
            guests: _guests,
            year: _yy,
            summary: _sum,
            plow_season:_low_season,
            high_season: _high_season,
            status: _status,
            available: true
        }));
    },
    
    

};
