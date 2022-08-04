import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { GroupsService } from '../services/groups.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { GroupsErrorsMessages } from '../helpers/groups.errors.enum';

@Controller('v1/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    const group = await this.groupsService.create(createGroupDto);
    return group;
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const group = await this.groupsService.findOne(id);
    if (!group) {
      return new NotFoundException(GroupsErrorsMessages.NotExist);
    }
    return group;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    const group = this.groupsService.update(id, updateGroupDto);
    if (!group) {
      return new NotFoundException(GroupsErrorsMessages.NotExist);
    }
    return group;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const group = await this.groupsService.remove(id);
    if (group === null) {
      return new NotFoundException(GroupsErrorsMessages.NotExist);
    }
    return group;
  }
}
