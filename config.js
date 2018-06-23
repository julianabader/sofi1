const path = require('path');

module.exports = {
  dbPath: 'mongodb://julianab:nouray1994@ds225840.mlab.com:25840/db_ringapp2018',
  port: process.env.PORT || 3000,
  public_path: path.join(__dirname, 'public'),
};