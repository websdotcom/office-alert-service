'use strict';

var express = require('express');
var app = express();

var hbs = require('express-hbs');
var path = require('path');
var morgan = require('morgan');

app.use(morgan('dev'));
app.use(hbs.express3({extname: '.html'}));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
	res.send('welome to the office alert app');
});

var port = 15001;
app.listen(port);
console.log('express listening on port', port);
