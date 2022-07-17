import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { IUser } from '../model/user.model';
import { CreateUserDTO } from '../users-dto/create-users.dto';
import { UpdateUserDTO } from '../users-dto/update-users.dto';
import { UserFilterService } from './user-filter/user-filter.service';

@Injectable()
export class UserService {
  constructor(private userFilterService: UserFilterService) {}
  users: IUser[] = [];

  getUsers(limit: number, offset: number, loginSubstring: string | undefined) {
    let arr = this.userFilterService.filterByNotDeleted(this.users);

    if (loginSubstring) {
      arr = this.userFilterService.filterByString(arr, loginSubstring);
    }
    if (limit) {
      arr = this.userFilterService.filterByLimit(arr, limit, offset);
    }
    return arr;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  getUserIndexById(id: string) {
    return this.users.findIndex((user) => user.id === id);
  }

  createUser(userDto: CreateUserDTO) {
    const user = { id: v4(), ...userDto, isDeleted: false };
    this.users.push(user);
    return user;
  }

  updateUser(id: string, userDto: UpdateUserDTO) {
    const newUser = { id, ...userDto, isDeleted: false };
    const index = this.getUserIndexById(id);
    this.users[index] = newUser;
    return newUser;
  }

  removeUser(id: string) {
    this.getUserById(id).isDeleted = true;
  }

  isNotUnique(userDto: CreateUserDTO) {
    return this.users.some((user) => user.login === userDto.login);
  }
}
