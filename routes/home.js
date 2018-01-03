var express = require('express');
var router = express.Router();
import User from '../DB/users/user'
/* GET home page. */

router.get('/', function(req, res, next) {
	// let a = getById('5a4667d5347a2ed1df75f87d')
	console.log(req.query.id, 'ooooooo')
	User.getById(req.query.id, function (err, results) {
		console.log(err, results)
		if (err) {
			return next(err)
		} else {
			res.render('index', { title: results.username })
		}
	})
})

module.exports = router
