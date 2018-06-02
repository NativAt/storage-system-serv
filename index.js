// connnect mongoose to database
const mongoose = require('mongoose');

// set up default mongoose connection
const { connectionString } = require('./config');

const dbConnect = () => {
  mongoose.connect(`${connectionString}/storage`);

  const db = mongoose.connection;

  // bind connection to error event
  db.on('connected', () => {
    console.log('mongodb connection success!');
  });

  db.on('error', () => {
    throw 'mongodb connection error';
  });
};

module.exports = dbConnect;
