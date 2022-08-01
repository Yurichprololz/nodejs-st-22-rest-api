import { Injectable } from '@nestjs/common';
import { IUser } from 'src/users/model/user.model';

@Injectable()
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
