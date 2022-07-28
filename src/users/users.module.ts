import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { PostgresUsersRepository } from './repository/postgres.repository';
import { UsersController } from './users-controller/users.controller';
import { UserFilterService } from './users-service/user-filter/user-filter.service';
import { UserService } from './users-service/user.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UserService, UserFilterService, PostgresUsersRepository],
})
export class UsersModule {}
