const { createLogger, format, transports } = require('winston');
const path = require('path');
const { Logtail } = require('@logtail/node');
const { LogtailTransport } = require('@logtail/winston');

const logtail = new Logtail(process.env.LOGGER_TOKEN);

const createCustomLogger = (filename) => {
  return createLogger({
    level: 'info',
    format: format.combine(
      format.errors({ stack: true }),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
      }),
      format.prettyPrint(),
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: path.join('logs', filename) }),
      new LogtailTransport(logtail)
    ]
  });
};

module.exports = {
  generalLogger: createCustomLogger('general.log'),
  createLogger: createCustomLogger('create.log'),
  readLogger: createCustomLogger('read.log'),
  updateLogger: createCustomLogger('update.log'),
  deleteLogger: createCustomLogger('delete.log'),
};