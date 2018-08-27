import * as http from 'http';
import { StatusEnum } from './enums/status.enum';
import { ScraperService } from './services/scraper.service';

let scraperRunning = false;

export const requestListener = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  res.writeHead(StatusEnum.OK, { 'Content-Type': 'application/json' });

  if (scraperRunning) {
    return res.end(
      JSON.stringify({ message: 'Scraper is already running, please wait.' }),
    );
  }

  res.end(JSON.stringify({ message: 'Scraper is starting.' }));

  scraperRunning = true;
  await ScraperService.start();
  scraperRunning = false;
};
