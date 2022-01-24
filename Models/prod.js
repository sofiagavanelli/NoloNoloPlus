var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ProdSchema = new Schema(
  {
    image: {type: String},
    name: {type: String, required: true},
    brand: {type: String, required: true},
    speed: {type: String, required: true},
    length: {type: String, required: true},
    guests: {type: String, required: true},
    year: {type: String, require: true},
    summary: {type: String, required: true},
    low_season: {type: String, required: true},
    high_season: {type: String, required: true},
    prod_id: {type: String, required: true},
    category: {type: String},
    //available: {type: Boolean, required: true }
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