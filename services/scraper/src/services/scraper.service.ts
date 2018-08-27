import { ShowService } from './show.service';
import { loggerService } from './logger.service';

export class ScraperService {
  static start = async () => {
    loggerService.trace('Initializing the scraper');

    const lastShowSaved = await ShowService.getLastShowSaved();
    const lastPage = await ShowService.getShowPage(lastShowSaved);

    loggerService.trace('Getting data from shows');
    await ShowService.get(lastPage, lastShowSaved);

    loggerService.trace('Scraper finished.');
  };
}
