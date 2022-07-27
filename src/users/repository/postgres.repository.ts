import { InjectModel } from '@nestjs/sequelize';
import { User } from '../model/user.model';
import { CreateUserDTO } from '../users-dto/create-users.dto';
import { UpdateUserDTO } from '../users-dto/update-users.dto';
import { UsersRepository } from './users.repository';

export class PostgresUsersRepository implements UsersRepository {
  constructor(@InjectModel(User) private UserModel: typeof User) {}

  async create(data: CreateUserDTO) {
    const user = await this.UserModel.create({ ...data });
    return user;
  }

  async findByID(id: string): Promise<User> {
    const user = await this.UserModel.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.UserModel.findAll({ where: { isDeleted: false } });
    return users;
  }

  async update(id: string, dto: UpdateUserDTO): Promise<User> {
    const user = await this.findByID(id);
    user.set({ ...dto });
    await user.save();
    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findByID(id);
    await user.destroy();
  }
}
