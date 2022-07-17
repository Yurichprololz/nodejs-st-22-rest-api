import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from '../users-dto/create-users.dto';
import { UpdateUserDTO } from '../users-dto/update-users.dto';
import { UserServiceService } from '../users-service/user-service.service';

@Controller('v1/users')
export class UsersController {
  constructor(private usersService: UserServiceService) {}

  @Get()
  GetUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  GetUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDTO) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
