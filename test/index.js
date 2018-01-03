import http from 'http';
import assert from 'mocha';

import '../bin/www.js';

describe('Example Node Server', () => {
	it('should retur 200', done => {
		http.get('http://127.0.0.1:3000', res => {
			assert.equal(200, res.statusCode);
			done();
		});
	});
});