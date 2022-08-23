import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { inspect } from 'util';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: Logger) {}
  use(req: Request, res: Response, next: NextFunction) {
    // this.logger.log(`path: ${req.originalUrl}`);
    // this.logger.log(`response: ${inspect(res)}`);
    this.logger.log(`request: ${inspect(req.headers)}`);
    // this.logger.log(`method: ${req.method}`);
    next();
  }
}
