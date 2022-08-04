import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Permission } from '../interface/permission.interface';

@Table({ tableName: 'group' })
export class Group extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column
  name: string;

  @Column({ type: DataType.ARRAY(DataType.TEXT) })
  permission: Permission[];
}
