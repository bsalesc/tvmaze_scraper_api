import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import 'sinon-mongoose';
import { ShowService } from './show.service';
import { Show } from '../models/show.model';
import { ShowInterface } from '../interfaces/show.interface';
import config from '../config/config.env';

let sandbox: sinon.SinonSandbox;
beforeEach(() => (sandbox = sinon.createSandbox()));
afterEach(() => sandbox.restore());

const service = new ShowService();

const mockShows: ShowInterface[] = [
  {
    id: 1,
    name: 'The Walking Dead',
    cast: [
      {
        id: 3,
        name: 'Lauren Cohan',
        birthday: '1982-01-07',
      },
      {
        id: 2,
        name: 'Norman Reedus',
        birthday: '1969-01-06',
      },
      {
        id: 1,
        name: 'Andrew Lincoln',
        birthday: '1973-09-14',
      },
    ],
  },
];

describe('Show service', () => {
  it('should return data from the mongo', async () => {
    const page = 0;
    sinon
      .mock(Show)
      .expects('find')
      .chain('limit')
      .withArgs(config.get('SHOWS_BY_PAGE'))
      .chain('skip')
      .withArgs(page)
      .chain('sort')
      .withArgs('id')
      .chain('exec')
      .resolves(mockShows);

    const shows = await service.get(page);

    expect(shows).to.deep.equals(mockShows);
  });
});
