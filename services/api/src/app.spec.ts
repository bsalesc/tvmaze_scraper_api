import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as mongoose from 'mongoose';

import app from './app';

let sandbox: sinon.SinonSandbox;
beforeEach(() => (sandbox = sinon.createSandbox()));
afterEach(() => sandbox.restore());

describe('App', () => {
  it('should return the application with parsers and logger', async () => {
    const appInstance = await app();
    const middlewares = ['jsonParser', 'urlencodedParser', 'logger'];

    expect(
      appInstance._router.stack.filter(f => middlewares.indexOf(f.name) >= 0),
    ).length(middlewares.length);
  });
});
