import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/model/user.model';
import { Group } from './groups.model';

@Table
export class UserGroup extends Model {
  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Group)
  @Column
  groupId: string;
}
