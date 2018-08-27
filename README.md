# TVMazeScraper

## Instructions to run the application locally with Docker

**Must have:**

- Docker installed.
- Ports 80, 447, 8081, 8082 and 27017 free.

**Running**

Run `docker-compose up` to (at first time will build the images) run the application with mongo.

**Scraper to TvMaze**

Accessing `http://localhost/scraper/` will trigger the scraper.

**RESTful API to Shows**

Accessing `http://localhost/api/shows?page=X` will get the list shows with casts.

Run tests: must access `./services/api/` and run script `npm run test`.

## Hosted application

**Scraper to TvMaze**

Accessing `http://tvmaze-epam5263.cloudapp.net/scraper/` will trigger the scraper.

**RESTful API to Shows**

Accessing `http://tvmaze-epam5263.cloudapp.net/api/shows?page=X` will get the list shows with casts.
