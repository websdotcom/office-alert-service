'use strict';

var bluebird = require('bluebird');
var request = bluebird.promisify(require('request'));
var arduinoServer = require('config').get('arduinoServer');
var _ = require('lodash');
var DEFAULT_DURATION = 5000;

var onOff = function(num, duration) {
	duration = duration || DEFAULT_DURATION;
	console.log('setting', num, 'to 1');
	request({url: arduinoServer + '/' + num + '/1'}).then(function() {
		_.delay(function() {
			console.log('setting', num, 'to 0');
			request({url: arduinoServer + '/' + num + '/0'});
		}, duration);
	});
};

module.exports = {

	green: function(duration) {
		console.log('attempting to turn green light for', duration, 'ms');
		onOff('8', duration);
	},

	red: function(duration) {
		console.log('attempting to turn red light for', duration, 'ms');
		onOff('7', duration);
	}

};
