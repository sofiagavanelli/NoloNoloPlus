var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ManagerSchema = new Schema(
  {
    name: {type: String, required: true},
    password: {type: String, required: true, minLeght: 5},
  }
);

// Virtual for book's URL
ManagerSchema
.virtual('url')
.get(function () {
  return '/catalog/manager/' + this._id;
});

//Export model
module.exports = mongoose.model('Manager', ManagerSchema);