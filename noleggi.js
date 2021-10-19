var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RentalSchema = new Schema(
  {
    prod_id: {type: String, required: true},
    client_id: {type: String, required: true},
    start_date: { type: Date},
    end_date: {type: Date}
  }
);

// Virtual for book's URL
RentalSchema
.virtual('url')
.get(function () {
  return '/catalog/rental/' + this._id;
});

//Export model
module.exports = mongoose.model('Rental', RentalSchema);