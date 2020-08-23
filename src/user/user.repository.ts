import { EntityRepository } from 'typeorm';

import { BaseRepository } from '../common';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}
