import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserService', () => {
  let model: Model<User>;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();

    model = module.get<Model<User>>(getModelToken(User.name));
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
