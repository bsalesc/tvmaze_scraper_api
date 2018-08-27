import { URL } from 'url';
import * as requestPromise from 'request-promise';
import config from '../config/config.env';
import { Show } from '../models/show.model';
import { loggerService } from './logger.service';
import { ShowInterface } from '../interfaces/show.interface';
import { CastService } from './cast.service';

export class ShowService {
  static get = async (currentPage: number = 0, lastShowSaved: number = 0) => {
    try {
      const apiUrl = new URL('/shows', config.get('API'));
      apiUrl.searchParams.set('page', currentPage.toString());

      const pageShows = await requestPromise.get(apiUrl.href, {
        json: true,
        simple: false,
      });

      if (pageShows.length === 0) return;

      const shows: ShowInterface[] = pageShows.map(
        ({ id, name }): ShowInterface => ({ id, name, cast: [] }),
      );

      await CastService.get(shows.filter(f => f.id > lastShowSaved));
      loggerService.trace(`Shows data from page ${currentPage} were saved.`);

      currentPage++;
    } catch (e) {
      loggerService.error(
        `Error getting data page(${currentPage}): ${e.message}`,
      );
    }

    await ShowService.get(currentPage);
  };

  static getLastShowSaved = async (): Promise<number> => {
    let lastShowSaved = 0;
    const lastShow = await Show.findOne({}, null, {
      sort: { id: -1 },
    });

    if (lastShow) lastShowSaved = lastShow.id;

    return lastShowSaved;
  };

  static getShowPage = async showId =>
    Math.floor(showId / config.get('SHOWS_BY_PAGE'));
}
