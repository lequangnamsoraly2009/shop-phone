const DeviceDetector = require("node-device-detector");

const deviceDetector = new DeviceDetector();

const deviceMiddleware = (req, res, next) => {
  const useragent = req.headers["user-agent"];
  req.useragent = useragent;
  req.device = deviceDetector.detect(useragent);
  next();
};

module.exports = deviceMiddleware;
