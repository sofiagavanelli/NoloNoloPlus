var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClientSchema = new Schema(
  {
    image: {type: String},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    client_id: {type: String, required: true},
    password: {type: String, required: true, minLeght: 5},
    place: {type: String, required: true},
    address: {type: String, required: true}
  }
);

// Virtual for book's URL
//PROBABILMENTE queste righe non ci servono per ciò che dobbiamo fare noi!
ClientSchema
.virtual('url')
.get(function () {
  return '/catalog/client/' + this._id;
});

//Export model
module.exports = mongoose.model('Client', ClientSchema);





/*
class User {
  constructor(db) {
    this.collection = db.collection('users');
  }
  async addUser(id, pass, _n) {

    let user = {name: _n, client_id: id, password: pass};

    /*const newUser = *await this.collection.insertOne(user);
    //return newUser;
  }
}
module.exports = User;*/