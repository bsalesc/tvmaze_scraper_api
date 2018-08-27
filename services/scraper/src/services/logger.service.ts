import * as log4js from 'log4js';
import * as path from 'path';

log4js.configure({
  appenders: {
    scraper: {
      type: 'file',
      filename: path.join('./logs/', 'access.log'),
      flags: 'w',
    },
  },
  categories: { default: { appenders: ['scraper'], level: 'trace' } },
});

export const loggerService = log4js.getLogger('Scraper');
