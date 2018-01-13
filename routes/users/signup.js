import express from 'express'
import User from '../../DB/users/user'
import respones from '../../controllers/response'
const app = express()
app.route('/')
	// .get(function(req, res, next) {
	// 	res.render('register', { title: '注册' })
	// })
	.post(function(req, res, next) {
		let data = req.body
		if (data.account.trim() === '') {
			res.send(respones.resMsg({results: '用户名不能为空'}));
			return
		}
		if (!data.userPassword) {
			res.send(respones.resMsg({results: '密码不能为空'}));
			return
		}
		data.createDte = Date.now()
		console.log(req.body, 'req.body.data')
		let wherestr = {'account' : req.body.account}
		User.getByConditions(wherestr, (err, results) => {
			console.log(results.length)
			if (results != null && results.length > 0) {
				err = {
					message: '用户名已存在',
					code: 100
				}
			}
			if (err) {
				res.locals.error = err;
				next(err)
				return;
			}
			User.insert(data, (err, results) => {
				if (err) {
					res.locals.error = err;
					next(err)
				} else {
					res.send(respones.resMsg({results}));
				}
			})
		})
	})
	.put(function(req, res) {
		res.send('Update the book');
	});
module.exports = app;