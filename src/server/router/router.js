const HttpRouter = require('../lib/HttpRouter');
const initStaticRoutes = require('./staticRoutes');
const initApiProxyRoutes = require('./apiProxyRoutes');

const router = new HttpRouter();

initStaticRoutes(router);
initApiProxyRoutes(router);

module.exports = router;
