'use strict';

require('../../dbConnection');
var mongoose = require('mongoose');
var LOCAL_LISTINGS_PURCHASE = require('../constants').LOCAL_LISTINGS;

var EventSchema = new mongoose.Schema({
	name: String,
	date: Date,
	body: String,
	alertType: String
});

EventSchema.statics.findByOrderDate = function(date) {
	return this.model('AlertEvents').find({date: date});
};

EventSchema.statics.findLocalListingsBuyers = function() {
	return this.model('AlertEvents').find({name: LOCAL_LISTINGS_PURCHASE});
};

var Event = mongoose.model('AlertEvents', EventSchema);

module.exports = Event;
