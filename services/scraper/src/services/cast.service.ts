import { URL } from 'url';
import config from '../config/config.env';
import { loggerService } from './logger.service';
import { requestLimiter } from '../utils/request.util';
import { ShowInterface } from '../interfaces/show.interface';
import { CastInterface } from '../interfaces/cast.interface';
import { Show } from '../models/show.model';

export class CastService {
  static get = async (shows: ShowInterface[], currentIndexShow: number = 0) => {
    const show = shows[currentIndexShow];
    if (!show) return shows;

    try {
      const apiUrl = new URL('/shows/' + show.id + '/cast', config.get('API'));
      const castResponse = await requestLimiter.request({
        url: apiUrl.href,
        method: 'GET',
      });

      const cast = JSON.parse(castResponse.body);

      show.cast = cast.map(
        ({ person: { id, name, birthday } }): CastInterface => ({
          id,
          name,
          birthday,
        }),
      );

      show.cast = show.cast.sort((previous, current) => {
        const prevBirthday = !!previous.birthday
          ? new Date(previous.birthday)
          : null;

        const currBirthday = !!current.birthday
          ? new Date(current.birthday)
          : null;

        return prevBirthday < currBirthday ? 1 : -1;
      });

      await CastService.save(show);

      currentIndexShow++;
    } catch (e) {
      loggerService.error(
        `Error getting data show's cast (${show.id}): ${e.message}`,
      );
    }

    await CastService.get(shows, currentIndexShow);
  };

  static save = async (show: ShowInterface) => {
    try {
      await Show.create(show);
    } catch (e) {
      loggerService.error(`Error saving data into mongo: ${e.message}`);
      throw e;
    }
  };
}
