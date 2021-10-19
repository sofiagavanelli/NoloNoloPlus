var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WorkerSchema = new Schema(
  {
    name: {type: String, required: true},
    password: {type: String, required: true, minLeght: 5},
  }
);

// Virtual for book's URL
WorkerSchema
.virtual('url')
.get(function () {
  return '/catalog/worker/' + this._id;
});

//Export model
module.exports = mongoose.model('Worker', WorkerSchema);