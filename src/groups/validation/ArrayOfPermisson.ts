import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { GroupsErrorsMessages } from '../helpers/groups.errors.enum';

const permission = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];
@ValidatorConstraint({ name: 'ArrayOfPermission', async: true })
@Injectable()
export class ArrayOfPermission implements ValidatorConstraintInterface {
  async validate(value: any[]) {
    return value.every((element) => {
      return permission.includes(element);
    });
  }

  defaultMessage() {
    return GroupsErrorsMessages.InvalidPermission;
  }
}
