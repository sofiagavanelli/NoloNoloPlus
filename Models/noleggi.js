var mongoose = require('mongoose');

var Schema = mongoose.Schema;


const RentalSchema = new Schema(
  {
    //rental_id: {type: String, required: true},
    prod_id: {type: String, required: true},
    client_id: {type: String, required: true},
    start_date: { type: Date},
    end_date: {type: Date},
    worker_id: {type: String},
    price: {type: String, required: true},
    //approved: {type: Boolean, required: true},
    //METODO DI PAGAMENTO!!
    paymethod: {type: String},
  }
);

//var rentModel = mongoose.model('Rent', RentalSchema);
//var rentprova =rentModel.find({});
// Virtual for book's URL
RentalSchema
.virtual('url')
.get(function () {
  return '/catalog/rental/' + this._id;
});

//Export model
module.exports = mongoose.model('Rental', RentalSchema);