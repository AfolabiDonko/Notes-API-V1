const mongoose = require('mongoose');

const dbConfig = require('../config/db.config');

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require('./user.model')(mongoose);
db.notes = require('./note.model')(mongoose);

module.exports = db;
