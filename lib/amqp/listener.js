'use strict';

var amqp = require('amqp');
var handlers = require('./handlers');
var config = require('config').get('amqp');

var connection = amqp.createConnection(config.connection, {defaultExchangeName: config.exchange});

connection.on('error', function(err) {
	//set a alert here?
	console.log('error connecting to rabbit', err);
});

connection.on('ready', function() {
	console.log('in ready state');
	connection.exchange(config.exchange, {
		type: 'topic',
		passive: false,
		durable: true,
		autoDelete: false
	}, function(exchange) {
		connection.queue(config.queue, {
			passive: false,
			durable: true,
			autoDelete: false
		}, function(queue) {
			config.events.forEach(function(event) {
				queue.bind(exchange, event);
			});
			queue.subscribe({ack: true}, function(message, headers, deliveryInfo) {
				var eventHandler = handlers[deliveryInfo.routingKey];
				if (eventHandler) {
					try {
						eventHandler(message.data);
					} catch (err) {
						console.error('failed to handle event', message, deliveryInfo);
						console.error(err);
					}
				}
				queue.shift();
			});
		});
	});
});
