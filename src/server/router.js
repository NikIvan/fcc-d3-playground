const path = require('path');

const HttpRouter = require('./lib/HttpRouter');
const { sendFile } = require('./lib/responseHelpers');
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

module.exports = router;
