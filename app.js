'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');
var morgan = require('morgan');
var lessMiddleware = require('less-middleware');
var request = require('request');

var Event = require('./lib/models/Event');
var arduinoServer = require('config').get('arduinoServer');

app.use(morgan('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(lessMiddleware(__dirname + '/public/css'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	Event.findLocalListingsBuyers().exec(function(err, buyers) {
		if (err) {
			console.log('there was a errors ' + err);
		}
		var vars = {
			events : [],
			buyers : buyers && buyers.length || 0
		};
		res.render('index', vars);
	});
});

app.get('/lightSwitch/:id/:status', function(req, res) {
	request({url: arduinoServer + '/' + req.params.id + '/' + req.params.status}).then(function() {
		res.render(200);

	});
});

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});

var port = 15001;
http.listen(port, function() {
	console.log('express listening on port', port);
});
