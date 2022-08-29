import { Module } from '@nestjs/common';
import { GroupsService } from './services/groups.service';
import { GroupsController } from './controller/groups.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './model/groups.model';
import { PostgresGroupsRepository } from './repository/postgres.repository';
import { User } from '../users/model/user.model';
import { UserGroup } from './model/user.group.model';
import { UserGroupsService } from './services/user.group.service';

@Module({
  imports: [SequelizeModule.forFeature([Group, User, UserGroup])],
  controllers: [GroupsController],
  providers: [GroupsService, UserGroupsService, PostgresGroupsRepository],
})
export class GroupsModule {}
