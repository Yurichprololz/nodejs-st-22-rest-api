import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt.strategy';
import { UserErrors } from '../../users/helpers/user.errors.enum';
import { CreateUserDTO } from '../dto/create-users.dto';
import { UpdateUserDTO } from '../dto/update-users.dto';
import { UserService } from '../service/user.service';

@Controller('v1/users')
export class UsersController {
  constructor(private usersService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async GetUsers(
    @Query('limit', new DefaultValuePipe(NaN)) limit: number,
    @Query('offset', new DefaultValuePipe(0)) offset: number,
    @Query('loginSubstring') loginSubstring: string | undefined,
  ) {
    return await this.usersService.getUsers(limit, offset, loginSubstring);
  }

  @Get(':id')
  async GetUserById(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    if (user) {
      return user;
    }
    throw new NotFoundException(UserErrors.NotExist);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(@Body() dto: CreateUserDTO) {
    const user = await this.usersService.createUser(dto);
    return user;
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    const newUser = await this.usersService.updateUser(id, user);
    if (newUser) {
      return newUser;
    }
    throw new NotFoundException(UserErrors.NotExist);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUser(@Param('id') id: string) {
    const user = await this.usersService.removeUser(id);
    if (user === null) {
      throw new NotFoundException(UserErrors.NotExist);
    }
  }
}
