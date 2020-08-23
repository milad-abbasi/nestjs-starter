import { Entity, Column } from 'typeorm';

import { BaseEntity, defaultOrderByCondition } from '../common';

@Entity({ orderBy: defaultOrderByCondition })
export class User extends BaseEntity {
  @Column()
  name: string;
}
