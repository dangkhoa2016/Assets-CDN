const debug = require('debug')('assets-cdn:routes->accounts');
const fs = require('fs');
const path = require('path');
const base_dir = path.join(process.cwd(), '.data');

async function routes(fastify, options) {
  fastify.get('/list', {}, async (request, reply) => {
    const list = await fs.readdirSync(base_dir);
    debug(list);
    return list;
  });

  fastify.get('/*.json', {}, async (request, reply) => {
    const { '*': file_name } = request.params;
    if (file_name) {
      const file_path = path.join(base_dir, file_name);
      debug(file_path);
      if (await fs.existsSync(file_path)) {
        const content = await fs.readFileSync(file_path);
        return reply.type('application/json').send(content);
      }

      reply.status(404).send(`File ${file_name} does not exists.`);
    }
    else
      return '';
  });
};

module.exports = routes;
