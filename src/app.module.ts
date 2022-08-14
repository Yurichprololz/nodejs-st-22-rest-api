import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/model/user.model';
import { GroupsModule } from './groups/groups.module';
import { Group } from './groups/model/groups.model';
import { UserGroup } from './groups/model/user.group.model';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

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
      models: [User, Group, UserGroup],
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
  providers: [LoggerMiddleware, Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
