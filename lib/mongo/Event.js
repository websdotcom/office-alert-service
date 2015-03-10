var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
	name: String,
	date: Date,
	body: String,
	alertType: String
});
var Event = mongoose.model('AlertEvents', EventSchema);

EventSchema.methods.findByOrderDate = function(date) {
	return this.model('AlertEvents').find({ date: date });
};

module.exports = Event;