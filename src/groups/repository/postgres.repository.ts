import { InjectModel } from '@nestjs/sequelize';
import { Group } from '../model/groups.model';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { GroupsRepository } from './groups.repository';

export class PostgresGroupsRepository implements GroupsRepository {
  constructor(@InjectModel(Group) private GroupModel: typeof Group) {}
  async create(dto: CreateGroupDto): Promise<Group> {
    const group = await this.GroupModel.create({ ...dto });
    return group;
  }

  async findByID(id: string): Promise<Group> {
    const group = await this.GroupModel.findByPk(id);
    return group;
  }

  async findAll(): Promise<Group[]> {
    const groups = await this.GroupModel.findAll();
    return groups;
  }

  async update(id: string, dto: UpdateGroupDto): Promise<Group> {
    const group = await this.findByID(id);
    group.set({ ...dto });
    await group.save();
    return group;
  }

  async remove(id: string): Promise<void> {
    await this.GroupModel.destroy({ where: { id } });
  }
}
