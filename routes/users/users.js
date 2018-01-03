var express = require('express');
var router = express.Router();
var app = express();
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
app.route('/')
	.get(function(req, res) {
		res.send('Get a random book');
	})
	.post(function(req, res) {
		res.send('Add a book');
	})
	.put(function(req, res) {
		res.send('Update the book');
	});
module.exports = app;
