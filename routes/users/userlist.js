var express = require('express');
var router = express.Router();
var app = express();
import util from 'util'
import User from '../../DB/users/user'
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
app.route('/')
	.get(function(req, res, next) {
		let data
		User.getByPager(data, (err, results) => {
			console.log(results, '-------')
			res.render('user/userlist', { userList: results })
		})
	})
	.post(function(req, res, next) {
		console.log(req.body.data)		// res.send('Add a book');
	})
	.put(function(req, res) {
		res.send('Update the book');
	});
module.exports = app;
