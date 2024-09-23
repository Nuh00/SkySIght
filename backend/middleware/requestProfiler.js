const { generalLogger } = require('../utils/logger');

const requestProfiler = (req, res, next) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const end = process.hrtime(start);
    const duration = (end[0] * 1e9 + end[1]) / 1e6; // Convert to milliseconds

    generalLogger.info(`${req.method} ${req.originalUrl} - ${duration.toFixed(2)}ms`);
  });

  next();
};

module.exports = requestProfiler;