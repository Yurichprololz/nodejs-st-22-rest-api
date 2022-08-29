import { v4 } from 'uuid';
import { CreateUserDTO } from '../dto/create-users.dto';
import { UpdateUserDTO } from '../dto/update-users.dto';

interface IUser {
  id: string;
  login?: string;
  password?: string;
  age?: number;
  isDeleted: boolean;
}

export class mockUserRepositoryService {
  constructor(private userFilterService: UserFilterService) {}
  users: IUser[] = [];

  findAll(limit: number, offset: number, loginSubstring: string | undefined) {
    let arr = this.userFilterService.filterByNotDeleted(this.users);

    if (loginSubstring) {
      arr = this.userFilterService.filterByString(arr, loginSubstring);
    }
    if (limit) {
      arr = this.userFilterService.filterByLimit(arr, limit, offset);
    }
    return arr;
  }

  findByID(id: string): IUser | undefined {
    return this.users.find((user) => user.id === id && !user?.isDeleted);
  }

  getUserIndexById(id: string): number {
    return this.users.findIndex((user) => user.id === id && !user?.isDeleted);
  }
  create(userDto: CreateUserDTO) {
    const user = { id: v4(), ...userDto, isDeleted: false };
    this.users.push(user);
    return user;
  }

  update(id: string, userDto: UpdateUserDTO): IUser | undefined {
    const newUser: IUser = { id, ...userDto, isDeleted: false };
    const index = this.getUserIndexById(id);
    if (index !== -1) {
      this.users[index] = newUser;
      return newUser;
    }
    return undefined;
  }

  remove(id: string) {
    const user = this.findByID(id);
    if (user) {
      user.isDeleted = true;
      return user;
    }
    return undefined;
  }
}

export class UserFilterService {
  filterByString(users: IUser[], loginSubstring: string) {
    return users
      .filter((user) =>
        user.login.toLowerCase().includes(loginSubstring.toLowerCase()),
      )
      .sort(this.sortArrayByLogin);
  }

  filterByLimit(users: IUser[], limit: number, offset: number) {
    return users.splice(offset * limit, limit);
  }
  sortArrayByLogin(x: IUser, y: IUser) {
    return x.login.localeCompare(y.login);
  }

  filterByNotDeleted(users: IUser[]) {
    return users.filter((user) => !user.isDeleted);
  }
}
