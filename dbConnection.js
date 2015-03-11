var mongoose = require('mongoose');
var config = require('config');

mongoose.connect(config.get('mongo.connection'));

module.exports = mongoose;
