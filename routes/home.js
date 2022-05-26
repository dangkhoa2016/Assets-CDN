// const debug = require('debug')('assets-cdn:routes->home');
const fs = require('fs');

async function routes(fastify, options) {

  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  });

  fastify.get('/favicon.ico', async (request, reply) => {
    const buffer = fs.readFileSync('./imgs/favicon.ico');
    reply.type('image/x-icon').send(buffer);
  });

  fastify.get('/favicon.png', async (request, reply) => {
    const buffer = fs.readFileSync('./imgs/favicon.png');
    reply.type('image/png').send(buffer);
  });

};

module.exports = routes;
