import { Repository } from 'src/interface/repository.interface';
import { User } from '../model/user.model';
import { CreateUserDTO } from '../users-dto/create-users.dto';
import { UpdateUserDTO } from '../users-dto/update-users.dto';

export type UsersRepository = Repository<User, CreateUserDTO, UpdateUserDTO>;
