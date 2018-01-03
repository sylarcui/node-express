let express = require('express');
let routerUse = express();

let home = require('./home');
routerUse.use('/', home);

let signup = require('./users/signup');
routerUse.use('/signup', signup);

let users = require('./users/users');
let register = require('./users/register');
let userlist = require('./users/userlist');

routerUse.use('/', home);
routerUse.use('/users', users);
routerUse.use('/signup', signup);
routerUse.use('/register', register);
routerUse.use('/userlist', userlist);

// catch 404 and forward to error handler
routerUse.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
routerUse.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.json(err);
});

module.exports = routerUse;

