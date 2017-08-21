process.env.NODE_ENV = 'development';

const Hapi = require('hapi');
const Server = require('../src/server.js')(new Hapi.Server());

// start server
Server.start((err)=>{
    if(err) throw err;
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`Server running at: ${Server.info.uri}`);
});
