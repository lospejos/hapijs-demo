'use strict';

module.exports = function(server){

  /**
   * set server
   */
  server.connection({
    port: 3000,
    host: 'localhost'
  });


  /**
   * server event
   */
  // The 'log' event includes the event object and a tags object
  server.on('log', function (event, tags) {
    console.log('[log] event emited..!');
    if (tags.error) {
      console.log('Server error: ' + (event.data || 'unspecified'));
    }
  });
  server.on('start', function () {
    console.log('[start] event emited..!');
  });
  server.on('stop', function () {
    console.log('[stop] event emited..!');
  });
  // The 'request' and 'request-internal' events include the request object, the event object, and a tags object 
  server.on('request', function (request, event, tags) {
    console.log('[request] event emited..!');
    if (tags.received) {
      console.log('New request: ' + request.id);
    }
  });
  server.on('request-internal', function (request, event, tags) {
    console.log('[request-internal] event emited..!');
    if (tags.received) {
      console.log('New request: ' + request.id);
    }
  });
  // The 'request-error' event includes the request object and the causing error err object
  server.on('request-error', function (request, err) {
    console.log('[request-error] event emited..!');
    //after 500-error-reply
    console.log('[500 Error]');
    console.log(`path :: ${request.path}`);
    console.log(`statusCode :: ${request.response.statusCode}`);
    console.log(`error :: ${err.message}`);
  });
  // The 'response' and 'tail' events include the request object:
  server.on('response', function (request) {
    console.log('[response] event emited..!');
    console.log('Response sent for request: ' + request.id);
  });
  server.on('tail', function (request) {
    console.log('[tail] event emited..!');
    console.log('Response sent for request: ' + request.id);
  });
  // The 'route' event includes the route public interface, 
  server.on('route', function (route, connection, server) {
    console.log('[route] event emited..!');
    console.log('New route added: ' + route.path);
  });


  /**
   * route
   */
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      console.log('HTTP GET / :: ');
      return reply.redirect('home');
    }
  });
  server.route({
    method: 'GET',
    path: '/home',
    handler: function (request, reply) {
      console.log('HTTP GET /home :: ');
      return reply('<h1>home</h1>');
    }
  });


  /**
   * 404 handler
   */
  server.route({
    method: '*',
    path: '/{p*}',
    handler: function(request, reply){
      console.log('[404 Error]');
      console.log(`request.path :: ${request.path}`);
      return reply('404 Not Found..!').code(404);
    }
  });

  return server;
};
