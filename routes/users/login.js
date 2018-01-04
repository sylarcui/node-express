import express from 'express'
import User from '../../DB/users/user'
import crypto from 'crypto'
const app = express()
const resmsg = {
	code: 200,
	message: 'ok'
}
app.route('/')
	.get(function(req, res, next) {
		const hash = crypto.createHmac('sha256', 'abcdfg').digest('hex')
		console.log(hash, '-0-0-0-0-0-0')
		res.render('register', { title: '注册' })
	})
	.post(function(req, res, next) {
		let data = req.body
		// data.loginDate = Date.now()
		if (req.body.account.trim() === '') {
			res.send('没有用户名');
			return
		}
		if (!req.body.userPassword) {
			console.log(req.body.account, 'req.body.data')
			res.send('密码');
			return
		}
		// res.send('没有用户名');
		let wherestr = {'account' : req.body.account}
		User.getByConditions(wherestr, (err, results) => {
			if (results != null && results.length < 0) {
				err = {
					message: '用户名不存在',
					code: 100
				}
			}
			if (err) {
				res.locals.error = err;
				next(err)
				return;
			}
			let hash = crypto.createHmac('sha256', req.body.userPassword).digest('hex')
			results[0].userPassword = hash
			resmsg.data = results[0]
			res.send(resmsg);
		})
	})
	.put(function(req, res) {
		res.send('Update the book');
	});
module.exports = app;