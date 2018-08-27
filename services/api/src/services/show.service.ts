import { Show } from '../models/show.model';
import config from '../config/config.env';

export class ShowService {
  get = async (page: number) => {
    const shows = await Show.find({})
      .select('-_id id name cast.id cast.name cast.birthday')
      .limit(config.get('SHOWS_BY_PAGE'))
      .skip(config.get('SHOWS_BY_PAGE') * page)
      .sort('id');

    return shows;
  };
}
