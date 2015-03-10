'use strict';

var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('welome to the office alert app');
});

app.listen(15001);
