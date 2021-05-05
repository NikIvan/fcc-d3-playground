const path = require('path');
const HttpRouter = require('../lib/HttpRouter');
const config = require('../config/config');
const {sendFile} = require('../lib/responseHelpers');

const staticRoutes = [
  '/',
  '/color-pie',
  '/bar-chart',
  '/scatterplot',
  '/line-chart',
  '/world-map',
  '/not-found',
  '/menu-page',
  '/missing-migrants',
  '/choropleth-map',
];

function initStaticRoutes(router) {
  for (let i = 0; i < staticRoutes.length; i += 1) {
    const route = staticRoutes[i];

    router.set(route, {
      method: HttpRouter.METHOD_GET,
      isExact: true,
    }, async (req, res) => {
      const pathToFile = path.join(config.publicFolder, '/index.html');
      await sendFile(req, res, pathToFile);
    });
  }
}

module.exports = initStaticRoutes;
