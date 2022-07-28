import { Injectable } from '@nestjs/common';
import { IUser } from '../model/user.model';
import { PostgresUsersRepository } from '../repository/postgres.repository';
import { CreateUserDTO } from '../users-dto/create-users.dto';
import { UpdateUserDTO } from '../users-dto/update-users.dto';

@Injectable()
export class UserService {
  constructor(private repository: PostgresUsersRepository) {}

  async getUsers(
    limit: number,
    offset: number,
    loginSubstring: string | undefined,
  ) {
    const users = await this.repository.findAll(limit, offset, loginSubstring);
    return users;
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await this.repository.findByID(id);
    return user;
  }

  async createUser(userDto: CreateUserDTO) {
    const user = await this.repository.create(userDto);
    return user;
  }

  async updateUser(id: string, userDto: UpdateUserDTO) {
    const user = await this.repository.update(id, userDto);
    return user;
  }

  async removeUser(id: string) {
    await this.repository.remove(id);
  }
}
