var mongoose = require('mongoose');
const Child = require('./child.model');

const schema = new mongoose.Schema({
  name: String,
  image: String,
  children: [Child.schema]
});
module.exports = mongoose.model('Parent', schema);