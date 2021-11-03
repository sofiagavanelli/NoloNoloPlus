var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClientSchema = new Schema(
  {
    name: {type: String, required: true},
    client_id: {type: String, required: true},
    password: {type: String, required: true, minLeght: 5},
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