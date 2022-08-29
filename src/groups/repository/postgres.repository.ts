import { InjectModel } from '@nestjs/sequelize';
import { Group } from '../model/groups.model';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { GroupsRepository } from './groups.repository';
import { Transaction } from 'sequelize';
import { User } from '../../users/model/user.model';

export class PostgresGroupsRepository implements GroupsRepository {
  constructor(@InjectModel(Group) private GroupModel: typeof Group) {}
  async create(dto: CreateGroupDto): Promise<Group> {
    const group = await this.GroupModel.create({ ...dto });
    return group;
  }

  async findByID(id: string): Promise<Group> {
    try {
      const group = await this.GroupModel.findByPk(id, { include: User });
      return group;
    } catch {
      return null;
    }
  }

  async findAll(): Promise<Group[]> {
    const groups = await this.GroupModel.findAll();
    return groups;
  }

  async update(
    id: string,
    dto: UpdateGroupDto | string,
    transactionHost?: { transaction: Transaction },
  ): Promise<Group> {
    try {
      const group = await this.GroupModel.findByPk(id, transactionHost);
      if (typeof dto === 'string') {
        return await group.update({ users: [dto] }, transactionHost);
        // group.set({ users: dto });
        // await group.save({ transaction });
        // console.log(group.getDataValue('users').login);
      } else {
        group.set({ ...dto });
        await group.save();
      }
      return group;
    } catch {
      return null;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.GroupModel.destroy({ where: { id } });
    } catch {
      return null;
    }
  }
}
