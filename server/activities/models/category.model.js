var mongoose = require('mongoose');
const Activity = require('./activity.model');

const schema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  activities: [Activity.schema]
});
module.exports = mongoose.model('Category', schema);