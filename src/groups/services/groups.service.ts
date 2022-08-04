import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { PostgresGroupsRepository } from '../repository/postgres.repository';

@Injectable()
export class GroupsService {
  constructor(private repository: PostgresGroupsRepository) {}

  create(createGroupDto: CreateGroupDto) {
    return this.repository.create(createGroupDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findByID(id);
  }

  update(id: string, updateGroupDto: UpdateGroupDto) {
    return this.repository.update(id, updateGroupDto);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}
