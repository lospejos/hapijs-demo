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
   * routing
   */
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      console.log('HTTP GET / :: ');
      return reply.redirect('/apis');
    }
  });
  /**
   * routing (api)
   */
  server.route(require('./routes/api'));


  /**
   * 404 handler
   */
  server.route({
    method: '*',
    path: '/{p*}',
    handler: function(request, reply){
      console.log('[404 Error]');
      console.log(`request.path :: ${request.path}`);
      return reply('404 Not Found').code(404);
    }
  });

  return server;
};
