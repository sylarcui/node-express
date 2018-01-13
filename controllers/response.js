module.exports = {
	resMsg: ({results, message, code}) => {
		let data = {
			code: code ||'200',
			message: message || 'ok',
			data: results || ''
		}
		return data
	}
};