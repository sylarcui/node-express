import express from 'express'
import User from '../../DB/users/user'
const app = express()
const resmsg = {
	code: 200,
	message: 'ok'
}
app.route('/')
	// .get(function(req, res, next) {
	// 	res.render('register', { title: '注册' })
	// })
	.post(function(req, res, next) {
		let data = req.body
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
					resmsg.data = results
					res.send(resmsg);
				}
			})
		})
	})
	.put(function(req, res) {
		res.send('Update the book');
	});
module.exports = app;