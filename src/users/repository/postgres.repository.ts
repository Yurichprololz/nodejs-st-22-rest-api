import { InjectModel } from '@nestjs/sequelize';
import { User } from '../model/user.model';
import { CreateUserDTO } from '../users-dto/create-users.dto';
import { UpdateUserDTO } from '../users-dto/update-users.dto';
import {
  getFindOneOptions,
  getFindOptions,
  isUniqueConstraintError,
} from './repository.helper';
import { UsersRepository } from './users.repository';

export class PostgresUsersRepository implements UsersRepository {
  constructor(@InjectModel(User) private UserModel: typeof User) {}

  async create(data: CreateUserDTO) {
    try {
      const user = await this.UserModel.create({ ...data });
      return user;
    } catch (error) {
      isUniqueConstraintError(error);
      return null;
    }
  }

  async findByID(id: string): Promise<User | null> {
    try {
      const options = getFindOneOptions(id);
      const user = await this.UserModel.findOne(options);
      return user;
    } catch {
      return null;
    }
  }

  async findAll(
    limit: number,
    offset: number,
    loginSubstring: string | undefined,
  ): Promise<User[]> {
    const options = getFindOptions(limit, offset, loginSubstring);
    const users = await this.UserModel.findAll(options);
    return users;
  }

  async update(id: string, dto: UpdateUserDTO): Promise<User> {
    try {
      const user = await this.findByID(id);
      user.set({ ...dto });
      await user.save();
      return user;
    } catch (error) {
      isUniqueConstraintError(error);
      return null;
    }
  }

  async remove(id: string): Promise<void | null> {
    const user = await this.findByID(id);
    if (user === null) return null;
    user.isDeleted = true;
    await user.save();
  }
}
