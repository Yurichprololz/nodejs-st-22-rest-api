import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { PostgresUsersRepository } from './repository/postgres.repository';
import { UsersController } from './controller/users.controller';
import { UserService } from './service/user.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UserService, PostgresUsersRepository],
})
export class UsersModule {}
