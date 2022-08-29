import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { mockGroupsRepositoryService } from '../repository/groups.mock.repository';
import { PostgresGroupsRepository } from '../repository/postgres.repository';
import { GroupsService } from '../services/groups.service';
import { UserGroupsService } from '../services/user.group.service';
import { GroupsController } from './groups.controller';

const group1: CreateGroupDto = {
  name: 'admin',
  permission: ['READ', 'WRITE', 'DELETE', 'SHARE'],
};

const updateGroup1: UpdateGroupDto = {
  name: 'admin',
  permission: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
};

const group2: CreateGroupDto = {
  name: 'activist',
  permission: ['READ', 'WRITE', 'DELETE'],
};

let idGroup1: string;
let idGroup2: string;

describe('GroupsController', () => {
  let controller: GroupsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [
        GroupsService,
        {
          provide: PostgresGroupsRepository,
          useValue: new mockGroupsRepositoryService(),
        },
        {
          provide: UserGroupsService,
          useValue: null,
        },
      ],
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('get clean arr', async () => {
    const res = await controller.findAll();
    expect(res).toStrictEqual([]);
  });

  it('create group', async () => {
    const res = await controller.create(group1);

    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('name', 'admin');
    expect(res).toHaveProperty('permission');
    idGroup1 = res.id;
  });

  it('create group2', async () => {
    const res = await controller.create(group2);

    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('name', 'activist');
    expect(res).toHaveProperty('permission');
    idGroup2 = res.id;
  });

  it('get group2', async () => {
    const res = await controller.findOne(idGroup2);

    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('name', 'activist');
    expect(res).toHaveProperty('permission', ['READ', 'WRITE', 'DELETE']);
  });

  it('remove group2', async () => {
    const res = await controller.remove(idGroup2);

    expect(res).toBeFalsy();
  });

  it('get group2', async () => {
    controller.findOne(idGroup2).catch((err) => {
      expect(err).toHaveProperty(['response', 'message'], "Group does'n exist");
      expect(err).toHaveProperty('status', 404);
      expect(err).toBeInstanceOf(NotFoundException);
    });
  });

  it('get all groups', async () => {
    const res = await controller.findAll();
    expect(res.length).toBe(1);
    expect(res[0]).toHaveProperty('name', 'admin');
  });

  it('update group 1', async () => {
    const res = await controller.update(idGroup1, updateGroup1);

    expect(res).toHaveProperty('permission', [
      'READ',
      'WRITE',
      'DELETE',
      'SHARE',
      'UPLOAD_FILES',
    ]);
  });
});
