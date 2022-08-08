import { Module } from '@nestjs/common';
import { GroupsService } from './services/groups.service';
import { GroupsController } from './controller/groups.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './model/groups.model';
import { PostgresGroupsRepository } from './repository/postgres.repository';

@Module({
  imports: [SequelizeModule.forFeature([Group])],
  controllers: [GroupsController],
  providers: [GroupsService, PostgresGroupsRepository],
})
export class GroupsModule {}
