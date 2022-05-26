const debug = require('debug')('assets-cdn:routes->assets');
// const fs = require('fs');
const { BASE_URL } = process.env;
const fetch = require('gaxios').request;


async function routes(fastify, options) {
  fastify.get('/*', {}, async (request, reply) => {
    const { '*': file_path } = request.params;
    if (file_path) {
      const url = `${BASE_URL}/${file_path}`;
      debug(url);
      fetch({ url, responseType: 'stream' }).then(response => {
        reply.type(response.headers['content-type']).send(response.data);
      }).catch(ex => {
        debug(ex);
        reply.status(500).send({ error: ex.message });
      });
    }
    else
      return '';
  });
};

module.exports = routes;
