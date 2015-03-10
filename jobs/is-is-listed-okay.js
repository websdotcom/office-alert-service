'use strict';

var bluebird = require('bluebird');
var request = bluebird.promisify(require('request'));
var qs = require('querystring');
var _ = require('lodash');

var burgerfi = {
	businessName: 'BurgerFi',
	zip: 20910,
	address: '8504 Fenton St',
	city: 'Silver Spring',
	state: 'MD',
	phone: '(301) 565-2100'
};

console.log('searching...', burgerfi);

bluebird.all([
	'facebook',
	'google',
	'hundred-directories',
	'localeze',
	'yahoo',
	'yelp',
	'yp'
]).map(function(name) {
	return request({
		url: 'http://locallistings.webs.prd.yyz.webs.com/listing/' + name,
		qs: burgerfi,
		json: true
	}).spread(function(resp, body) {
		console.log(name, 'isListed? -->', body.isListed);
	});
});
