'use strict';

var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
	name: String,
	date: Date,
	body: String,
	alertType: String
});

EventSchema.methods.findByOrderDate = function(date) {
	return this.model('AlertEvents').find({date: date});
};

var Event = mongoose.model('AlertEvents', EventSchema);

module.exports = Event;
