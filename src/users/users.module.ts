import { Module } from '@nestjs/common';
import { UsersController } from './users-controller/users.controller';
import { UserServiceService } from './users-service/user-service.service';

@Module({
  controllers: [UsersController],
  providers: [UserServiceService],
})
export class UsersModule {}
