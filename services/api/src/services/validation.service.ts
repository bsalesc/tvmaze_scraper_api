import { InvalidParamException } from '../exceptions/invalid-param.exception';

export const isPageNumber = input => {
  if (Number.isInteger(parseInt(input, 10))) return true;

  throw new InvalidParamException('Invalid page number parameter');
};
