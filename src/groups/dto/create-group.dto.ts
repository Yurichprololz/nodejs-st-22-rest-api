import { IsArray, IsEnum, IsString } from 'class-validator';
import {
  arrayOfPermission,
  Permission,
} from '../interface/permission.interface';

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsArray()
  @IsEnum(arrayOfPermission, { each: true })
  permission: Permission[];
}
