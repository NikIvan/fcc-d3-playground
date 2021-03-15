const path = require('path');
const https = require('https');

const HttpRouter = require('./lib/HttpRouter');
const {sendFile} = require('./lib/responseHelpers');
const config = require('./config/config');

const router = new HttpRouter();

router.set(
  '/', {
    method: HttpRouter.METHOD_GET,
    isExact: true,
  }, async (req, res) => {
    const pathToFile = path.join(config.publicFolder, '/index.html');
    await sendFile(req, res, pathToFile);
  },
);

router.set(
  '/color-pie', {
    method: HttpRouter.METHOD_GET,
    isExact: true,
  }, async (req, res) => {
    const pathToFile = path.join(config.publicFolder, '/index.html');
    await sendFile(req, res, pathToFile);
  },
);

router.set(
  '/bar-chart', {
    method: HttpRouter.METHOD_GET,
    isExact: true,
  }, async (req, res) => {
    const pathToFile = path.join(config.publicFolder, '/index.html');
    await sendFile(req, res, pathToFile);
  },
);

router.set(
  '/api/v1/un-population', {
    method: HttpRouter.METHOD_GET,
    isExact: true,
  }, (req, res) => {
    const url = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';

    const apiRequest = https.request(url, {
      method: HttpRouter.METHOD_GET,
    }, (apiResponse) => {
      apiResponse.pipe(res, {end: true});
    });

    apiRequest.on('error', (error) => {
      console.error(error);
    });

    apiRequest.end();
  },
);

module.exports = router;
