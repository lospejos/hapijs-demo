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
  server.register(require('vision'), (err)=>{
    if(err) throw err;
    server.views({
      engines: { ejs: require('ejs') },
      relativeTo: __dirname + '/views/',
      layout: 'layouts/default',
      layoutKeyword: 'body',
      isCached: false  /* only development */
    });
  });


  /**
   * route
   */
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      console.log('HTTP GET / :: ');
      return reply.redirect('hello');
    }
  });
  /**
   * route (view-handler-function)
   */
  server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {
      let data = {
        message: 'HTTP GET /hello :: no layout'
      };
      let options = {
        layout: false
      }
      return reply.view('hello', data, options);
    }
  });
  server.route({
    method: 'GET',
    path: '/hello1',
    handler: function (request, reply) {
      let data = {
        message: 'HTTP GET /hello1 :: use default layout'
      };
      return reply.view('hello', data);
    }
  });
  server.route({
    method: 'GET',
    path: '/hello2',
    handler: function (request, reply) {
      let data = {
        message: 'HTTP GET /hello2 :: use common layout',
        header_message: 'hello header :)',
        footer_message: 'bye footer :('
      };
      let options = {
        layout: 'layouts/common'
      }
      return reply.view('hello', data, options);
    }
  });
  /**
   * route (view-handler-object)
   */
  server.route({
    method: 'GET',
    path: '/hello3',
    handler: {
      view: {
        template: 'hello.ejs',
        context: {
          message: 'HTTP GET /hello3 :: use default layout'
        }
      }
    }
  });
  server.route({
    method: 'GET',
    path: '/hello4',
    handler: {
      view: {
        template: 'hello.ejs',
        context: {
          message: 'HTTP GET /hello4 :: use common layout',
          header_message: 'hello header :)',
          footer_message: 'bye footer :('
        },
        options: {
          layout: 'layouts/common'
        }
      }
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
      let data = {
        statusCode: 404,
        errorMessage: 'Page not found'
      };
      return reply.view('error', data).code(404);
    }
  });

  return server;
};
