import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDTO } from '../users-dto/create-users.dto';
import { UpdateUserDTO } from '../users-dto/update-users.dto';
import { UserService } from '../users-service/user.service';

@Controller('v1/users')
export class UsersController {
  constructor(private usersService: UserService) {}

  @Get()
  GetUsers(
    @Query('limit', new DefaultValuePipe(NaN)) limit: number,
    @Query('loginSubstring') loginSubstring: string | undefined,
  ) {
    return this.usersService.getUsers(limit, loginSubstring);
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
