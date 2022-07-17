import { Injectable } from '@nestjs/common';
import { IUser } from 'src/users/model/user.model';

@Injectable()
export class UserFilterService {
  filterByString(users: IUser[], loginSubstring: string) {
    return users.filter((user) =>
      user.login.toLowerCase().includes(loginSubstring.toLowerCase()),
    );
  }

  filterByLimit(users: IUser[], limit: string) {
    return users.splice(0, Number(limit));
  }

  filterByNotDeleted(users: IUser[]) {
    return users.filter((user) => !user.isDeleted);
  }
}
