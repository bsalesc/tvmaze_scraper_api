import * as fs from 'fs';
import * as path from 'path';
import * as morganBase from 'morgan';

export const morganMiddleware = () => {
  const stream = fs.createWriteStream(path.join('./logs/', 'access.log'), {
    flags: 'w',
  });

  return morganBase('combined', { stream });
};
