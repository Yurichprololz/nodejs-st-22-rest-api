import { IsArray, IsString, Validate } from 'class-validator';
import { Permission } from '../interface/permission.interface';
import { ArrayOfPermission } from '../validation/ArrayOfPermisson';

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsArray()
  @Validate(ArrayOfPermission)
  permission: Permission[];
}
