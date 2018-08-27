import { Request, Response, NextFunction } from 'express';
import { StatusEnum } from '../enums/status.enum';
import { InvalidParamException } from '../exceptions/invalid-param.exception';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  const { message } = err;

  if (next) {
    let code: number;

    switch (err.constructor) {
      case InvalidParamException:
        code = StatusEnum.BAD_REQUEST;
        break;

      default:
        code = StatusEnum.INTERNAL_SERVER_ERROR;
    }

    return res.status(code).json({ message });
  }
};
