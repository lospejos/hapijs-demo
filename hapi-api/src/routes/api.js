'use strict';

const APIHandler = require('../handlers/api');

module.exports = [
  { method: 'GET', path: '/apis', handler: APIHandler.getApiIndex },
  { method: 'GET', path: '/posts/{id*}', handler: APIHandler.getPost }
];
