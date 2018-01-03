module.exports = {
	resMsg: ({results, message, code}) => {
		return data = {
			code: code ||'200',
			message: message || 'ok',
			data: results || ''
		}
	}
};