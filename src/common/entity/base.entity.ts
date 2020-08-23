import {
  Index,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity as TypeormBaseEntity,
} from 'typeorm';

export abstract class BaseEntity extends TypeormBaseEntity {
  @Index()
  @Column({ generated: 'increment', readonly: true, select: false })
  row_num: number;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
