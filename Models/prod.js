var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ProdSchema = new Schema(
  {
    image: {type: String},
    name: {type: String},
    brand: {type: String},
    speed: {type: String},
    length: {type: String},
    guests: {type: String,},
    year: {type: String},
    summary: {type: String},
    low_season: {type: String},
    high_season: {type: String,},
    prod_id: {type: String},
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