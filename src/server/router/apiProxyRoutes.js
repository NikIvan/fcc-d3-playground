const https = require('https');
const HttpRouter = require('../lib/HttpRouter');

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
  {
    url: '/api/v1/world-cities',
    remoteUrl: 'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv',
  },
  {
    url: '/api/v1/missing-migrants',
    remoteUrl: 'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/267eac8b97d161c479d950ffad3ddd5ce2d1f370/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv',
  },
  {
    url: '/api/v1/hiv-data',
    remoteUrl: 'https://gist.githubusercontent.com/curran/470752f12c027f8ff4266e7c96f26a56/raw/66908b56e371e7c9f5a1c0911ac3250f570a4c83/share-of-population-infected-with-hiv-ihme.csv',
  },
  {
    url: '/api/v1/countries-slim-3',
    remoteUrl: 'https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/slim-3/slim-3.csv',
  },
  {
    url: '/api/v1/covid-data',
    remoteUrl: 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv',
  },
];

function initApiProxyRoutes(router) {
  apiProxyRoutes.forEach((route) => {
    router.set(
      route.url, {
        method: HttpRouter.METHOD_GET,
        isExact: true,
      }, apiProxyHandler(route.remoteUrl),
    );
  });
}

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

module.exports = initApiProxyRoutes;
