var express = require('express');
var app = express();
import User from '../../DB/users/user'
app.route('/')
	.get(function(req, res, next) {
		res.render('register', { title: '注册' })
	})
	.post(function(req, res, next) {
		let data = req.body.data
		let wherestr = {'username' : req.body.data.username}
		User.getByConditions(wherestr, (err, results) => {
			console.log(results.length)
			if (results != null && results.length > 0) {
				err = {
					message: '用户名已存在',
					code: 100
				}
				next(err)
				return;
			}
			if (err) {
				res.locals.error = err;
				next(err)
				return;
			}
			User.insert(data, function (err, results) {
				console.log(err, results)
				if (err) {
					return next(err)
				} else {
					res.send('ok');
					
				}
			})
		})
	})
	.put(function(req, res) {
		res.send('Update the book');
	});
module.exports = app;
