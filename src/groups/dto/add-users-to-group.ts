import { IsUUID } from 'class-validator';

export class addUsersToGroupDto {
  @IsUUID()
  groupId: string;

  @IsUUID()
  userIds: string;
}
