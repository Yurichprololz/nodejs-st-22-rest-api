import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/model/user.model';
import { Group } from '../model/groups.model';

@Injectable()
export class UserGroupsService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Group) private GroupModel: typeof Group,
    @InjectModel(User) private UserModel: typeof User,
  ) {}

  async addUsersToGroup(id: string, userIds: string) {
    try {
      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };

        const group = await this.GroupModel.findByPk(id, transactionHost);
        const user = await this.UserModel.findByPk(userIds, transactionHost);
        if (group && user) {
          await group.$add('users', [user.id], transactionHost);
          await user.$add('groups', [group.id], transactionHost);
        }
        throw new BadRequestException('Transaction has rollbacked');
      });
    } catch (err) {
      throw err;
    }
  }
}
