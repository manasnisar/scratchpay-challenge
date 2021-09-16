const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'coding-challenge API documentation',
    version,
  },
  servers: [
    {
      url: `${config.env === "production" ? "https://scratchpay-challenge.herokuapp.com:" : "http://localhost:" }${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
