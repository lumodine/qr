const baseApiUrl = process.env.API_URL;

const fastify = require('fastify')({
  logger: (process.env.NODE_ENV === 'development'),
  routerOptions: {
    ignoreTrailingSlash: true,
    ignoreDuplicateSlashes: true,
    trustProxy: true,
  },
});
const cors = require('@fastify/cors');
const axios = require('axios');

fastify.register(cors);

fastify.get('/:id', async (request, reply) => {
  const { id } = request.params;
  const { event } = request.query;
  let toUrl = process.env.LANDING_URL;

  const { data: response } = await axios.get(`${baseApiUrl}/tenants/${id}/alias`);

  if (response.success) {
    const alias = response.data;

    toUrl = process.env.QR_MENU_URL.replaceAll('{alias}', alias);

    if (event) {
      try {
        await axios.post(`${baseApiUrl}/events`, {
          tenant: id,
          type: event,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return reply.redirect(toUrl);
});

const port = process.env.PORT || 7000;
fastify.listen({ port, host: '0.0.0.0' }, async (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`Server listening on ${address}`);
});
