const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  image: String,
  location: { type: String, enum: ['indoor', 'outdoor'] },
  time: Number
});
module.exports.schema = schema;
module.exports.model = mongoose.model('Child', schema);