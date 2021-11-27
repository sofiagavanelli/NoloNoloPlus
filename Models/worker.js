var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const WorkerSchema = new Schema(
  {
    name: {type: String, required: true},
    surname: {type: String, required: true},
    user_id: {type: String, required: true},
    password: {type: String, required: true, minLeght: 5},
    manager: {type: Boolean, required: true}
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