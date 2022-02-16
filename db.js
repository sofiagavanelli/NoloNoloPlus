const mongoose = require("mongoose");
const client = require("./Models/client");

var sha1 = require('sha1');

//PER USARE QUELLO NON IN LOCALE:
const connectionString = "mongodb://site202133:Tee9youy@mongo_site202133?writeConcern=majority";
//const connectionString = process.env.DATABASELOCAL_STRING;


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
    saveClient: async (_img, _name, _surname, _username, _pass, _place, _address, tel, email, bday, _note) => {

        //console.log(sha1(_pass));
        
        //TODO CONTROLLARE DUPLICATO DELL'USERNAME
            new Client({
                //image: _img,
                name: _name,
                surname: _surname,
                client_id: _username,
                password: sha1(_pass),
                place: _place,
                address: _address,
                phone: tel, 
                email: email,
                birth: bday,
                note: _note
            }).save();
            
    },

    saveWorker: async(_name, _surname, _password, _year, _isManager, _userId) =>{
        console.log("dentro save");
        new Worker ({
            name:_name,
            surname: _surname,
            password: _password,
            manager: _isManager, 
            user_id: _userId,
            year:_year
        }).save();
    },

    saveProd: async (_category,_imageUrl,_name, _brand, _speed, _len, _guests, _yy, _sum, _low_season,_high_season, _id, _status) => {

        return Promise.resolve(new Prodotto({
            category: _category,
            image: _imageUrl,
            name: _name,
            brand: _brand,
            speed: _speed,
            length: _len,
            guests: _guests,
            year: _yy,
            summary: _sum,
            low_season:_low_season,
            high_season: _high_season,
            prod_id: _id,
            status: _status,
            //available: true
        }).save());
    },

    saveRental: async (/*_rent,*/ _prod, _client, _start, _end, _worker, _price, _payment, _approved, _discount) => {
        /*await Client.insertOne({ username }, { id }, {pass}, { upsert: true });*/
        return Promise.resolve(new Noleggio({
            prod_id: _prod,
            client_id: _client,
            start_date: _start,
            end_date: _end,
            worker_id: _worker,
            price: _price,
            paymethod: _payment,
            approved: _approved,
            deleted: false,
            delivered: false,
            discount: _discount
        }).save());
        
        //await newN.save();
    },

    updateProd: async (idprod, cat, img, nome, marca, vel, len, ospiti, anno, desc, price_low, price_high, state) => {
        console.log({idprod, cat, img, nome, marca, vel, len, ospiti, anno, desc, price_low, price_high, state})
        
        console.log("prova per modifica prodotto");
        await Prodotto.findOneAndUpdate(
            {prod_id: idprod},
            { $set: {category: cat,
                image: img,
                name: nome,
                brand: marca,
                speed: vel,
                length: len,
                guests: ospiti,
                year: anno,
                summary: desc,
                low_season: price_low,
                high_season: price_high,
                status: state, }},
            {returnOriginal: false}
            ).exec()
            .then(x => console.log("ok"))
            .catch(x => console.log("Errore"))
    },

    addDiscount: async (id, value) => {
        await Client.findOneAndUpdate(
            {client_id: id},
            { $set: {discount: value} },
            {returnOriginal: false}
            ).exec()
            .then(x => console.log("ok"))
            .catch(x => console.log("Errore"))
    },

    updateClient: async (id, img, n, s, pass, citta, indirizzo, telefono, mail, bday, notes) => {
        
        await Client.findOneAndUpdate(
            {client_id: id},
            { $set: {image: img,
                    name: n,
                    surname: s,
                    password: pass,
                    place: citta,
                    address: indirizzo,
                    phone: telefono,
                    email: mail,
                    birth: bday,
                    note: notes, }},
            {returnOriginal: false}
            ).exec()
            .then(x => console.log("ok"))
            .catch(x => console.log("Errore"))
    },

    updateRent: async (id, s, e, w, p, pay, a, d) => {

        /*console.log("SONO IN MODIFICA NOLEGGIO");

        console.log(id +  " " + s + " " + e + " " + w + " " + p + " " + pay + " " + a );*/
        
        await Noleggio.findOneAndUpdate(
            {_id: id},
            { $set: {start_date: s,
                    end_date: e, 
                    price: p,
                    worker_id: w,
                    paymethod: pay,
                    approved: a,
                    discount: d
                }},
            {returnOriginal: false}
            ).exec()
            .then(x => console.log("ok"))
            .catch(x => console.log("Error"))
    },


    searchClientID: async (id) => {
        console.log("prova");
        return Promise.resolve(Client.find({ client_id: id }));
    },

    searchWorkerID: async (id) => {
        return Promise.resolve(Worker.find({ user_id: id }));
    },

    //search con il nome per il login! così l'ID rimane ""privato""
    searchClient: async (_name) => {
        return Promise.resolve(Client.find({ name: _name }));
    },

    searchWorker: async (id) => {
        return Promise.resolve(Worker.find({ user_id: id }));
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

    getWorker: async (options = {}) => {
        
        return Promise.resolve(Worker.find(options));

    },

    deleteClient: async (id) => {
        return Promise.resolve(Client.findOneAndDelete({ client_id : id }));
    },

    deleteWorker: async (id) => {
        return Promise.resolve(Worker.findOneAndDelete({ user_id : id }));
    },

    deleteProd: async (id) => {
        return Promise.resolve(Prodotto.findOneAndDelete({ prod_id : id }));

    },

    deleteRental: async (id) => {
        return Promise.resolve(Noleggio.findOneAndDelete({ _id : id }));
    },

    deleteBoolRent: async (id) => {
        await Noleggio.findOneAndUpdate(
            {_id: id},
            { $set: {deleted: true }},
            {returnOriginal: false}
            ).exec()
            .then(x => console.log("ok"))
            .catch(x => console.log("Errore"))
    },

    deliverBoolRent: async (id) => {
        await Noleggio.findOneAndUpdate(
            {_id: id},
            { $set: {delivered: true }},
            {returnOriginal: false}
            ).exec()
            .then(x => console.log("ok"))
            .catch(x => console.log("Errore"))
    },

    lateProd: async (id) => {
        await Prod.findOneAndUpdate(
            {prod_id: id},
            { $set: {status: "rotto" }},
            {returnOriginal: false}
            ).exec()
            .then(x => console.log("ok"))
            .catch(x => console.log("Errore"))
    },

    /* joinClientsRentals: async (options = {}) =>{
        db.collection('rentals').aggregate([
            {
                $lookup:
                {
                    from: 'clients',
                    localField: 'client_id',
                    foreignField: 'client_id',
                    as: 'clientRentals'
                }
            }
        ]).toArray(function(err, resp) {
            if (err) throw err;
            console.log("join function");
            console.log(JSON.stringify(resp));
            return JSON.stringify(resp);
        });
    } */
    
    

};
