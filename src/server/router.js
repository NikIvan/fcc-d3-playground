const path = require('path');
const https = require('https');

const HttpRouter = require('./lib/HttpRouter');
const {sendFile} = require('./lib/responseHelpers');
const config = require('./config/config');

const router = new HttpRouter();

const staticRoutes = [
  '/',
  '/color-pie',
  '/bar-chart',
  '/scatterplot',
  '/line-chart',
  '/world-map',
  '/not-found',
  '/menu-page',
];

staticRoutes.forEach((route) => {
  router.set(route, {
    method: HttpRouter.METHOD_GET,
    isExact: true,
  }, async (req, res) => {
    const pathToFile = path.join(config.publicFolder, '/index.html');
    await sendFile(req, res, pathToFile);
  });
});

const apiProxyRoutes = [
  {
    url: '/api/v1/un-population',
    remoteUrl: 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv',
  },
  {
    url: '/api/v1/iris',
    remoteUrl: 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv',
  },
  {
    url: '/api/v1/temperature',
    remoteUrl: 'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv',
  },
  {
    url: '/api/v1/world-map-geo-data',
    remoteUrl: 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json',
  },
];

apiProxyRoutes.forEach((route) => {
  router.set(
    route.url, {
      method: HttpRouter.METHOD_GET,
      isExact: true,
    }, apiProxyHandler(route.remoteUrl),
  );
});

function apiProxyHandler(dataUrl) {
  return (req, res) => {
    const apiRequest = https.request(dataUrl, {
      method: HttpRouter.METHOD_GET,
    }, (apiResponse) => {
      apiResponse.pipe(res, {end: true});
    });

    apiRequest.on('error', (error) => {
      console.error(error);
    });

    apiRequest.end();
  };
}

module.exports = router;
