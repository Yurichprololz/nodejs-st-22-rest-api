import { Repository } from 'src/interface/repository.interface';
import { User } from '../model/user.model';
import { CreateUserDTO } from '../dto/create-users.dto';
import { UpdateUserDTO } from '../dto/update-users.dto';

export type UsersRepository = Repository<User, CreateUserDTO, UpdateUserDTO>;
