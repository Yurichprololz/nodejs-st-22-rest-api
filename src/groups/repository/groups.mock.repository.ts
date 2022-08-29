import { NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { Permission } from '../interface/permission.interface';

interface IGroup {
  id: string;
  name?: string;
  permission?: Permission[];
}

export class mockGroupsRepositoryService {
  groups: IGroup[] = [];

  findAll() {
    return this.groups;
  }

  findByID(id: string): IGroup | undefined {
    return this.groups.find((group) => group.id === id);
  }

  getGroupIndexById(id: string): number {
    return this.groups.findIndex((group) => group.id === id);
  }

  create(groupDto: CreateGroupDto) {
    const group = { id: v4(), ...groupDto };
    this.groups.push(group);
    return group;
  }

  update(id: string, userDto: UpdateGroupDto): IGroup | undefined {
    const newGroup: IGroup = { id, ...userDto };
    const index = this.getGroupIndexById(id);
    if (index !== -1) {
      this.groups[index] = newGroup;
      return newGroup;
    }
    return undefined;
  }

  remove(id: string) {
    const index = this.getGroupIndexById(id);
    if (index === -1) {
      throw new NotFoundException("The group isn't found");
    }
    this.groups.splice(index, 1);
  }
}
