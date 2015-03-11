'use strict';

require('../../dbConnection');
var LOCAL_LISTINGS_PURCHASE = 'PREMIUM LOCAL LISTING PURCHASE';
var Event = require('../models/Event');

module.exports = {

	'webs.event.premium.purchase': function(data) {
		var isLocalListings = !!data && /Local Listing/i.test(JSON.stringify(data));
		if (isLocalListings) {
			var purchaseEvent = new Event({
				name: LOCAL_LISTINGS_PURCHASE,
				date: new Date(),
				body: data,
				alertType: 'green'
			});
			purchaseEvent.save();
			console.log('event saved: ', purchaseEvent);
		}
	},

	'webs.event.signup': function(data) {
		console.log(data);
	}

};
