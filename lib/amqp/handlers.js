'use strict';

require('../../dbConnection');
var LOCAL_LISTINGS_PURCHASE = 'PREMIUM LOCAL LISTING PURCHASE';
var Event = require('../models/Event');
var alerts = require('../alerts');

module.exports = {

	'webs.event.premium.purchase': function(buffer) {
		var data  = JSON.parse(' ' + buffer);
		console.log('handling rabbit event', data);
		var isLocalListings = !!data && /Local Listing/i.test(JSON.stringify(data));
		if (isLocalListings) {
			console.log('attempting to save a local listings purchase');
			var purchaseEvent = new Event({
				name: LOCAL_LISTINGS_PURCHASE,
				date: new Date(),
				body: data,
				alertType: 'green'
			});
			purchaseEvent.save();
			console.log('attempting to turn the green light on');
			alerts.green();
			console.log('event saved: ', purchaseEvent);
		}
	},

	'webs.event.signup': function(data) {
		console.log(data);
	}

};
