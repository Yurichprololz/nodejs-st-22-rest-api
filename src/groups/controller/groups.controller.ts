import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GroupsService } from '../services/groups.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { GroupsErrorsMessages } from '../helpers/groups.errors.enum';
import { addUsersToGroupDto } from '../dto/add-users-to-group';
import { UserGroupsService } from '../services/user.group.service';

@Controller('v1/groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly userGroupService: UserGroupsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGroupDto: CreateGroupDto) {
    const group = await this.groupsService.create(createGroupDto);
    return group;
  }

  @Post('addUsers')
  @HttpCode(HttpStatus.CREATED)
  async addUsersToGroup(@Body() dto: addUsersToGroupDto) {
    const { groupId, userIds } = dto;
    await this.userGroupService.addUsersToGroup(groupId, userIds);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const group = await this.groupsService.findOne(id);
    if (!group) {
      throw new NotFoundException(GroupsErrorsMessages.NotExist);
    }
    return group;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    const group = this.groupsService.update(id, updateGroupDto);
    if (!group) {
      throw new NotFoundException(GroupsErrorsMessages.NotExist);
    }
    return group;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const group = await this.groupsService.remove(id);
    if (group === null) {
      throw new NotFoundException(GroupsErrorsMessages.NotExist);
    }
  }
}
