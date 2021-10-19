var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProdSchema = new Schema(
  {
    name: {type: String, required: true},
    prod_id: {type: String, required: true},
    summary: {type: String, required: true},
    power: {type: String, required: true},
    available: {type: Boolean, required: true }
  }
);

// Virtual for book's URL
ProdSchema
.virtual('url')
.get(function () {
  return '/catalog/product/' + this._id;
});

//Export model
module.exports = mongoose.model('Prod', ProdSchema);