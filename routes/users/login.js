import express from 'express'
import User from '../../DB/users/user'
import crypto from 'crypto'
import respones from '../../controllers/response'
const app = express()
const resmsg = {
	code: 200,
	message: 'ok'
}
app.route('/')
	.get(function(req, res, next) {
		res.render('register', { title: '注册' })
	})
	.post(function(req, res, next) {
		let data = req.body
		// data.loginDate = Date.now()
		if (req.body.account.trim() === '') {
			res.send(respones.resMsg({results: '用户名不能为空'}));
			return
		}
		if (!req.body.userPassword) {
			console.log(req.body.account, 'req.body.data')
			res.send(respones.resMsg({results: '密码不能为空'}));
			return
		}
		// res.send('没有用户名');
		let wherestr = {'account' : req.body.account}
		let hash = crypto.createHmac('sha256', req.body.userPassword).digest('hex')
		User.getByConditions(wherestr, (err, results) => {
			if (results != null && results.length <= 0) {
				err = {
					message: '用户名不存在',
					code: 100
				}
			} else if (results[0].userPassword !== hash) {
				err = {
					message: '密码错误',
					code: 100
				}
			}
			if (err) {
				res.locals.error = err;
				next(err)
				return;
			}
			resmsg.data = results[0]
			res.send(resmsg);
			// User.findByIdAndUpdate(data, (err, results) => {
			//
			// })
		})
	})
	.put(function(req, res) {
		res.send('Update the book');
	});
module.exports = app;