const mongoose = require('mongoose');
const config = require('../../config/config.json');

mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`)
  .catch(err => {
    console.error(err);
    throw err;
  });

mongoose.connection.on('connected', () => {
  console.log(
    `Mongoose default connection open mongodb://${config.db.host}:${config.db
      .port}/${config.db.name}`
  );
});

mongoose.connection.on('error', err => {
  console.log(`Mongoose default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection disconnected through app termination'
    );
  });
  process.exit(0);
});

require('./blog');
require('./skill');
require('./work');
