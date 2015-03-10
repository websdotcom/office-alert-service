var amqp = require('amqp');

var mongo = require('./mongo/connection');
var Event = require('./mongo/Event');
var LOCAL_LISTINGS_PURCHASE = "PREMIUM LOCAL LISTING PURCHASE";

var util = require('util');

//TODO: fill in connection string and exchange name
var connection = amqp.createConnection({}, {defaultExchangeName: ''});

connection.on('error', function(err) {
	//set a alert here?
	console.log('error connecting to rabbit', err);
});

//TODO add exchange name
connection.on('ready', function() {
	console.log('in ready state');
	connection.exchange('', {
		type: 'topic',
		passive: false,
		durable: true,
		autoDelete: false
	}, function(exchange) {
		connection.queue('AlertSystem', {
			passive: false,
			durable: true,
			autoDelete: false
		}, function(queue) {
			queue.bind(exchange, 'webs.event.premium.purchase');
			queue.subscribe({ack: true}, function(message) {
				var isLocalListings = !! message.data.match(/Local Listing/i);
				var messageData = JSON.parse(message.data);
				if (isLocalListings) {
					var purchaseEvent = new Event({
						name: LOCAL_LISTINGS_PURCHASE,
						date: new Date(),
						body: messageData,
						alertType: 'green'
					});

					purchaseEvent.save();
					console.log('event saved: ' + util.inspect(purchaseEvent));
				}
				queue.shift();
			});
		});
	});
});
