import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { mockRes, mockReq } from 'sinon-express-mock';

import { ShowController } from './show.controller';
import { NextFunction } from 'express';
import { spy } from 'sinon';
import { InvalidParamException } from '../exceptions/invalid-param.exception';

const req = mockReq({ query: { page: 0 } });
const res = mockRes();

const controller = new ShowController();

let sandbox: sinon.SinonSandbox;
beforeEach(() => (sandbox = sinon.createSandbox()));
afterEach(() => sandbox.restore());

const nextSpy: sinon.SinonSpy = spy();

describe('Show controller', () => {
  it('should return data from the service', async () => {
    sandbox.stub(controller.service, 'get').resolves([]);
    const next: NextFunction = sandbox.stub();

    await controller.get(req, res, next);

    expect(res.json.lastCall.args[0]).to.deep.equal([]);
  });

  it('should throw an error from the service', async () => {
    sandbox.stub(controller.service, 'get').throws();

    await controller.get(req, res, nextSpy);

    expect(nextSpy.lastCall.args[0]).to.be.an.instanceOf(Error);
  });

  it('should throw an error from invalid page number', async () => {
    const request = mockReq({
      query: { page: 'invalid' },
    });

    await controller.get(request, res, nextSpy);

    expect(nextSpy.lastCall.args[0]).to.be.an.instanceOf(InvalidParamException);
  });
});
