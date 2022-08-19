import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GroupsModule } from './groups/groups.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorLoggerInterceptor } from './common/interceptor/error-logger.interceptor';

@Module({
  imports: [
    UsersModule,
    GroupsModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      define: {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      // synchronize: false,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorLoggerInterceptor,
    },
    LoggerMiddleware,
    Logger,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
