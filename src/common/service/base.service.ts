import {
  DeepPartial,
  InsertResult,
  FindManyOptions,
  FindConditions,
  FindOneOptions,
  UpdateResult,
  DeleteResult,
} from 'typeorm';

import {
  BaseEntity,
  BaseRepository,
  PaginatedData,
  BaseEntityStatus,
} from '..';

export abstract class BaseService<Entity extends BaseEntity> {
  constructor(private readonly repository: BaseRepository<Entity>) {}

  find(options?: FindManyOptions<Entity>): Promise<Entity[]>;
  find(conditions?: FindConditions<Entity>): Promise<Entity[]>;
  find(
    optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>,
  ): Promise<Entity[]> {
    return this.repository.find(optionsOrConditions as any);
  }

  findPaginated(
    options?: FindManyOptions<Entity>,
  ): Promise<PaginatedData<Entity>> {
    return this.repository.findPaginated(options);
  }

  findOne(options?: FindOneOptions<Entity>): Promise<Entity>;
  findOne(conditions?: FindConditions<Entity>): Promise<Entity>;
  findOne(
    optionsOrConditions?: FindOneOptions<Entity> | FindConditions<Entity>,
  ): Promise<Entity> {
    return this.repository.findOne(optionsOrConditions as any);
  }

  findById(id: string): Promise<Entity> {
    return this.repository.findOne({ where: { id } });
  }

  findByIds(ids: any[], options?: FindManyOptions<Entity>): Promise<Entity[]>;
  findByIds(ids: any[], conditions?: FindConditions<Entity>): Promise<Entity[]>;
  findByIds(
    ids: any[],
    optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>,
  ): Promise<Entity[]> {
    return this.repository.findByIds(ids, optionsOrConditions as any);
  }

  findOneOrCreate(
    conditions: DeepPartial<Entity>,
  ): Promise<{
    entity: Entity;
    isNew: boolean;
  }> {
    return this.repository.findOneOrCreate(conditions);
  }

  count(options?: FindManyOptions<Entity>): Promise<number>;
  count(conditions?: FindConditions<Entity>): Promise<number>;
  count(
    optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>,
  ): Promise<number> {
    return this.repository.count(optionsOrConditions as any);
  }

  insert(
    entity: DeepPartial<Entity> | DeepPartial<Entity>[],
  ): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  save(entity: DeepPartial<Entity>): Promise<Entity>;
  save(entities: DeepPartial<Entity>[]): Promise<Entity[]>;
  save(
    entityOrEntities: DeepPartial<Entity> | DeepPartial<Entity>[],
  ): Promise<Entity> | Promise<Entity[]> {
    return this.repository.save(entityOrEntities as any);
  }

  update(
    criteria: FindConditions<Entity>,
    partialEntity: DeepPartial<Entity>,
  ): Promise<UpdateResult> {
    return this.repository.update(criteria, partialEntity);
  }

  increment(
    conditions: FindConditions<Entity>,
    propertyPath: string,
    value: number | string,
  ): Promise<UpdateResult> {
    return this.repository.increment(conditions, propertyPath, value);
  }

  decrement(
    conditions: FindConditions<Entity>,
    propertyPath: string,
    value: number | string,
  ): Promise<UpdateResult> {
    return this.repository.decrement(conditions, propertyPath, value);
  }

  remove(entity: Entity): Promise<Entity>;
  remove(entities: Entity[]): Promise<Entity[]>;
  remove(
    entityOrEntities: Entity | Entity[],
  ): Promise<Entity> | Promise<Entity[]> {
    return this.repository.remove(entityOrEntities as any);
  }

  delete(criteria: FindConditions<Entity>): Promise<DeleteResult> {
    return this.repository.delete(criteria);
  }

  softdelete(criteria: FindConditions<Entity>): Promise<UpdateResult> {
    return this.repository.update(criteria, {
      status: BaseEntityStatus.DELETED,
    } as any);
  }
}
