import { Application, Router } from 'express';

export class BaseRoute<T> {
  app: Application;
  router: Router;
  controller: T;

  constructor(app: Application) {
    this.app = app;
    this.router = Router();
  }
}
