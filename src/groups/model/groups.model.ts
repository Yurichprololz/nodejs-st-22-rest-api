import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/model/user.model';
import { Permission } from '../interface/permission.interface';
import { UserGroup } from './user.group.model';

@Table({ tableName: 'group' })
export class Group extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column
  name: string;

  @Column({ type: DataType.ARRAY(DataType.TEXT) })
  permission: Permission[];

  @BelongsToMany(() => User, () => UserGroup)
  users: User[];
}
