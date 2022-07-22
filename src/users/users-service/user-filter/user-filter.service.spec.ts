import { Test, TestingModule } from '@nestjs/testing';
import { UserFilterService } from './user-filter.service';

describe('UserFilterService', () => {
  let service: UserFilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFilterService],
    }).compile();

    service = module.get<UserFilterService>(UserFilterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
