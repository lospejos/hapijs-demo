'use strict';

const axios = require('axios');

/**
 * Get API Index
 */
module.exports.getApiIndex = function(request,reply){
    let data = {
      api: [
        'HTTP GET /',
        'HTTP GET /posts',
        'HTTP GET /posts/{id}'
      ]
    };
    return reply(data);
};

/**
 * Get Post / Posts
 */
module.exports.getPost = function(request,reply){
  let postId = request.params.id || '';
  axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  .then((result)=>{
    return reply(result.data);
  }).catch((err)=>{
    return reply(err).code(404);
  });
};