import { Repository } from '../../interface/repository.interface';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { Group } from '../model/groups.model';

export type GroupsRepository = Repository<
  Group,
  CreateGroupDto,
  UpdateGroupDto
>;
