import { Module } from '@nestjs/common';
import { UsersController } from './users-controller/users.controller';
import { UserFilterService } from './users-service/user-filter/user-filter.service';
import { UserService } from './users-service/user.service';

@Module({
  controllers: [UsersController],
  providers: [UserService, UserFilterService],
})
export class UsersModule {}
