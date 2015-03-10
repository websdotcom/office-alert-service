'use strict';

var express = require('express');
var app = express();

var path = require('path');
var morgan = require('morgan');
var lessMiddleware = require('less-middleware');

app.use(morgan('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(lessMiddleware(__dirname + '/public/css'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.render('index', {});
});

var port = 15001;
app.listen(port);
console.log('express listening on port', port);