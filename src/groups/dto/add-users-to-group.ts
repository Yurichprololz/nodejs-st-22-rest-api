import { IsArray, IsUUID } from 'class-validator';

export class addUsersToGroupDto {
  @IsUUID()
  groupId: string;

  @IsArray()
  @IsUUID(4, { each: true })
  userIds: string[];
}
