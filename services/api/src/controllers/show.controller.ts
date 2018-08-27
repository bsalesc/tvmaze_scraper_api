import { Request, Response, NextFunction } from 'express';
import { StatusEnum } from '../enums/status.enum';
import { BaseController } from './base.controller';
import { ShowService } from '../services/show.service';
import { isPageNumber } from '../services/validation.service';

export class ShowController extends BaseController<ShowService> {
  service = new ShowService();

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page } = req.query;
      isPageNumber(page);
      const shows = await this.service.get(page);

      res.status(StatusEnum.OK).json(shows);
    } catch (e) {
      next(e);
    }
  };
}
