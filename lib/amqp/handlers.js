'use strict';

var LOCAL_LISTINGS_PURCHASE = 'PREMIUM LOCAL LISTING PURCHASE';
var Event = require('./mongo/Event');

module.exports = {

	'webs.event.premium.purchase': function(data) {
		require('../../dbConnection');
		var isLocalListings = !!data.match(/Local Listing/i);
		var messageJSON = JSON.parse(data);
		if (isLocalListings) {
			var purchaseEvent = new Event({
				name: LOCAL_LISTINGS_PURCHASE,
				date: new Date(),
				body: messageJSON,
				alertType: 'green'
			});
			purchaseEvent.save();
			console.log('event saved: ', purchaseEvent);
		}
	}

};
