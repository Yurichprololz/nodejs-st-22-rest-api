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

@Controller('v1/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
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
