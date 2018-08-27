import * as http from 'http';
import config from './config/config.env';
import { mongooseConnect } from './config/mongoose';
import { requestListener } from './request-listener';

mongooseConnect()
  .then(() => http.createServer(requestListener).listen(config.get('PORT')))
  .catch(error => console.error(error));
