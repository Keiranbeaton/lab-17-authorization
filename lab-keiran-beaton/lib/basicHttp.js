'use strict';

module.exports = exports = function(req, res, next) {
  try {
    let header = req.headers.authorization;
    let basicString = header.split(' ')[1];
    let authBuffer = new Buffer(basicString, 'base64');
    let authString = authBuffer.toString();
    let authArr = authString.split(':');
    req.auth = {username: authArr[0], password: authArr[1]};
    authBuffer.fill(0);
    next();
  } catch(error) {
    error.statusCode = 400;
    error.message = 'Invalid BasicHTTP Authentication';
    next(error);
  }
};
