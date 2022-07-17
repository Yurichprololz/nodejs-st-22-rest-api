import { Module } from '@nestjs/common';
import { UsersController } from './users-controller/users.controller';
import { UserFilterService } from './users-service/user-filter/user-filter.service';
import { UserServiceService } from './users-service/user-service.service';

@Module({
  controllers: [UsersController],
  providers: [UserServiceService, UserFilterService],
})
export class UsersModule {}
