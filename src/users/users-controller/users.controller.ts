import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
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
    @Query('offset', new DefaultValuePipe(0)) offset: number,
    @Query('loginSubstring') loginSubstring: string | undefined,
  ) {
    return this.usersService.getUsers(limit, offset, loginSubstring);
  }

  @Get(':id')
  GetUserById(@Param('id') id: string) {
    const user = this.usersService.getUserById(id);
    if (user) {
      return user;
    }
    throw new NotFoundException("User does'n exist");
  }

  @Post()
  createUser(@Body() user: CreateUserDTO) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    const newUser = this.usersService.updateUser(id, user);
    if (newUser) {
      return newUser;
    }
    throw new NotFoundException("User does'n exist");
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    const user = this.usersService.removeUser(id);
    if (!user) {
      throw new NotFoundException("User does'n exist");
    }
  }
}
