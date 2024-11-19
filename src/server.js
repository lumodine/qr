const fastifyOptions = {
  logger: (process.env.NODE_ENV === 'development'),
  ignoreTrailingSlash: true,
  ignoreDuplicateSlashes: true,
  trustProxy: true,
};

const baseApiUrl = process.env.API_URL;

const fastify = require('fastify')(fastifyOptions);
const cors = require('@fastify/cors');
const axios = require('axios');

fastify.register(cors);

fastify.get('/:id', async (request, reply) => {
  const { id } = request.params;
  let alias = 'not-found';

  const { data: response } = await axios.get(`${baseApiUrl}/tenants/${id}/alias`);

  if (response.success) {
    alias = response.data;
  }

  const qrMenuUrl = process.env.QR_MENU_URL.replaceAll('{alias}', alias);
  return reply.redirect(qrMenuUrl);
});

const port = process.env.PORT || 7000;
fastify.listen({ port, host: '0.0.0.0' }, async (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`Server listening on ${address}`);
});
