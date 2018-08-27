import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as mongoose from 'mongoose';

import { mongooseConnect } from './mongoose';

let sandbox: sinon.SinonSandbox;
beforeEach(() => (sandbox = sinon.createSandbox()));
afterEach(() => sandbox.restore());

describe('Mongoose', () => {
  it('should connect sucessefully', async () => {
    let error = false;
    sandbox.stub(mongoose, 'connect').resolves();

    try {
      await mongooseConnect();
    } catch (e) {
      error = true;
    }

    expect(error).to.be.equals(false);
  });

  it('should throws error', async () => {
    let error = false;
    sandbox.stub(mongoose, 'connect').throws();

    try {
      await mongooseConnect();
    } catch (e) {
      error = true;
      expect(e).to.be.an.instanceOf(Error);
    }

    expect(error).to.be.equals(true);
  });
});
