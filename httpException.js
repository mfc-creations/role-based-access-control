'use strict';
const createError = require('http-errors');

function HttpError(code, message) {
	return createError(code, message);
}

module.exports = HttpError;
