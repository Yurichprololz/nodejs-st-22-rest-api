import { Injectable } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';

const permission = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];
@ValidatorConstraint({ name: 'ArrayOfPermission', async: true })
@Injectable()
export class ArrayOfPermission {
  async validate(value: Permission[]) {
    return value.every((element) => {
      return permission.includes(element);
    });
  }

  defaultMessage() {
    return `Permission must only contain 'READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES`;
  }
}
