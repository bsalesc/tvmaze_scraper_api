import { BaseRoute } from './base.route';
import { ShowController } from '../controllers/show.controller';

export class ShowRoute extends BaseRoute<ShowController> {
  controller = new ShowController();

  registerRoutes = () => {
    this.router.get('', this.controller.get);

    this.app.use('/shows', this.router);
  };
}
