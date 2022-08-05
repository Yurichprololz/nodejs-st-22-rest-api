import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-users.dto';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
