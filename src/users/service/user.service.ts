import { Injectable } from '@nestjs/common';
import { PostgresUsersRepository } from '../repository/postgres.repository';
import { CreateUserDTO } from '../dto/create-users.dto';
import { UpdateUserDTO } from '../dto/update-users.dto';

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

  async getUserById(id: string) {
    const user = await this.repository.findByID(id);
    return user;
  }

  async getUserByName(name: string) {
    const user = await this.repository.findByName(name);
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
    return await this.repository.remove(id);
  }
}
