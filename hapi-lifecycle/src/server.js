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
   * request lifecycle
   */
  server.ext('onRequest', function (request, reply) {
    console.log('onRequest called..!');
    return reply.continue();
  });
  server.ext('onPreAuth', function (request, reply) {
    console.log('onPreAuth called..!');
    return reply.continue();
  });
  server.ext('onPostAuth', function (request, reply) {
    console.log('onPostAuth called..!');
    return reply.continue();
  });
  server.ext('onPreHandler', function (request, reply) {
    console.log('onPreHandler called..!');
    return reply.continue();
  });
  server.ext('onPostHandler', function (request, reply) {
    console.log('onPostHandler called..!');
    return reply.continue();
  });
  server.ext('onPreResponse', function (request, reply) {
    console.log('onPreResponse called..!');
    return reply.continue();
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
