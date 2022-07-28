import { ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, Op } from 'sequelize';
import { User } from '../model/user.model';
import { CreateUserDTO } from '../users-dto/create-users.dto';
import { UpdateUserDTO } from '../users-dto/update-users.dto';
import { UsersRepository } from './users.repository';

export class PostgresUsersRepository implements UsersRepository {
  constructor(@InjectModel(User) private UserModel: typeof User) {}

  async create(data: CreateUserDTO) {
    try {
      const user = await this.UserModel.create({ ...data });
      return user;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError')
        throw new ConflictException('The user with this login already exists');
    }
  }

  async findByID(id: string): Promise<User | null> {
    try {
      const user = await this.UserModel.findOne({
        where: {
          id,
          isDeleted: false,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }
  async findAll(
    limit: number,
    offset: number,
    loginSubstring: string | undefined,
  ): Promise<User[]> {
    const condition: FindOptions = {
      where: {
        isDeleted: false,
        login: {
          [Op.iLike]: loginSubstring ? `%${loginSubstring}%` : '%',
        },
      },
    };

    if (limit) {
      condition.where;
      condition.limit = limit;
      condition.offset = offset;
    }

    const users = await this.UserModel.findAll(condition);
    return users;
  }

  async update(id: string, dto: UpdateUserDTO): Promise<User> {
    try {
      const user = await this.findByID(id);
      user.set({ ...dto });
      await user.save();
      return user;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('The user with this login already exists');
      }
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
