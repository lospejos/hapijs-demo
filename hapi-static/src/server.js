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
   * set middleware
   */
  server.path(__dirname + '/static/');
  server.register(require('inert'), (err)=>{
    if(err) throw err;
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
  server.route({
    method: 'GET',
    path: '/static/{filename*}',
    handler: function (request, reply) {
      let filename = request.params.filename || 'index.html';
      console.log(`HTTP GET /static/${filename} :: `);
      return reply.file(`${filename}`);
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
