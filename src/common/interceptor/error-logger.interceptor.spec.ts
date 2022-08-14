import { ErrorLoggerInterceptor } from './error-logger.interceptor';

describe('ErrorLoggerInterceptor', () => {
  it('should be defined', () => {
    expect(new ErrorLoggerInterceptor()).toBeDefined();
  });
});
