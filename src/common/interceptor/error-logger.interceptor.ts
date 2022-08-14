import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { inspect } from 'util';

@Injectable()
export class ErrorLoggerInterceptor implements NestInterceptor {
  constructor(private logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const methodKey = context.getHandler().name;
        const className = context.getClass().name;
        const [req, res]: [Request, Response] = context.getArgs();

        // console.log(req.method);
        // console.log(res);
        // const httpCtx = context.switchToHttp()
        // const req = httpCtx.getRequest();
        // const res = httpCtx.getResponse();
        // const args = { ...params, ...query, body };

        // this.logger.error(`${req}`);
        // this.logger.error(`${res}`);
        // this.logger.error(`${methodName}`);
        // this.logger.error(`${res.method}`);
        this.logger.error(`request: ${inspect(req)}`);
        this.logger.error(`response: ${inspect(res)}`);
        this.logger.error(`METHOD: ${req.method}`);
        this.logger.error(`${className}: ${methodKey}`);
        throw err;
      }),
    );
  }
}
