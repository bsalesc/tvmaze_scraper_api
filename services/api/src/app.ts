import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ShowRoute } from './routes/show.route';
import { morganMiddleware } from './middlewares/morgan.middleware';
import { errorMiddleware } from './middlewares/error.middleware';

export default async (): Promise<express.Application> => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morganMiddleware());

  const showRoute = new ShowRoute(app);
  showRoute.registerRoutes();

  app.use(errorMiddleware);

  return app;
};
