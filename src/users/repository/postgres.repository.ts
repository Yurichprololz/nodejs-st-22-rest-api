import { InjectModel } from '@nestjs/sequelize';
import { User } from '../model/user.model';
import { CreateUserDTO } from '../dto/create-users.dto';
import { UpdateUserDTO } from '../dto/update-users.dto';
import {
  getFindOneOptions,
  getFindOptions,
  isUniqueConstraintError,
} from '../helpers/repository.helper';
import { UsersRepository } from './users.repository';
import { Transaction } from 'sequelize';
import { Group } from '../../groups/model/groups.model';

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
      options.include = Group;
      const user = await this.UserModel.findOne(options);
      return user;
    } catch {
      return null;
    }
  }

  async findByName(login: string): Promise<User | null> {
    try {
      const user = await this.UserModel.findOne({ where: { login } });
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

  async update(
    id: string,
    dto: UpdateUserDTO | string,
    transactionHost?: { transaction: Transaction },
  ): Promise<User> {
    try {
      const user = await this.UserModel.findByPk(id, transactionHost);
      if (typeof dto === 'string') {
        user.set({ groups: dto });
        return await user.save(transactionHost);
      } else {
        user.set({ ...dto });
        await user.save();
      }
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
