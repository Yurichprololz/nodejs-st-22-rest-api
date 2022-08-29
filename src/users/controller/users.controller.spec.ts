import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from '../dto/create-users.dto';
import { UpdateUserDTO } from '../dto/update-users.dto';
import { PostgresUsersRepository } from '../repository/postgres.repository';
import {
  mockUserRepositoryService,
  UserFilterService,
} from '../repository/users.mock.repositoru';
import { UserService } from '../service/user.service';
import { UsersController } from './users.controller';

const user1: CreateUserDTO = {
  login: 'Meganagibatorgodx',
  password: '123',
  age: 13,
};

const updateUser1: UpdateUserDTO = {
  login: 'Meganagibatorgodx',
  password: '123',
  age: 14,
};

const user2: CreateUserDTO = {
  login: 'LanaDelRey',
  password: 'BornToDie',
  age: 33,
};

let idUser1: string;
let idUser2: string;

describe('UsersController', () => {
  let controller: UsersController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UserService,
        UserFilterService,
        {
          provide: PostgresUsersRepository,
          useValue: new mockUserRepositoryService(new UserFilterService()),
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('get clean arr', async () => {
    const res = await controller.GetUsers(Infinity, 0, '');
    expect(res).toStrictEqual([]);
  });

  it('create user', async () => {
    const res = await controller.createUser(user1);

    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('isDeleted');
    expect(res.isDeleted).toBeFalsy();
    idUser1 = res.id;
  });

  it('create user2', async () => {
    const res = await controller.createUser(user2);

    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('isDeleted');
    expect(res.isDeleted).toBeFalsy();
    idUser2 = res.id;
  });

  it('get user2', async () => {
    const res = await controller.GetUserById(idUser2);

    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('isDeleted');
    expect(res.isDeleted).toBeFalsy();
    expect(res.login).toBe('LanaDelRey');
  });

  it('remove user2', async () => {
    const res = await controller.removeUser(idUser2);

    expect(res).toBeFalsy();
  });

  it('get user2', async () => {
    controller.GetUserById(idUser2).catch((err) => {
      expect(err).toHaveProperty(['response', 'message'], "User does'n exist");
      expect(err).toHaveProperty('status', 404);
      expect(err).toBeInstanceOf(NotFoundException);
    });
  });

  it('get all user', async () => {
    const res = await controller.GetUsers(Infinity, 0, '');

    expect(res.length).toBe(1);
    expect(res[0].login).toBe('Meganagibatorgodx');
  });
  it('update user 1', async () => {
    const res = await controller.updateUser(idUser1, updateUser1);

    expect(res).toHaveProperty('age', 14);
    expect(res).toHaveProperty('login', 'Meganagibatorgodx');
  });
});
