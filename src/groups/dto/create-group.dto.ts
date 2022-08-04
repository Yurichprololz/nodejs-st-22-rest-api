import { IsArray, IsString, Validate } from 'class-validator';
import { ArrayOfPermission } from '../validation/ArrayOfPermisson';

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsArray()
  @Validate(ArrayOfPermission)
  permission: Permission[];
}
