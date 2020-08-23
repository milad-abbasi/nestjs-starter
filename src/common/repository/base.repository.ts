import {
  EntityRepository,
  Repository,
  FindManyOptions,
  DeepPartial,
} from 'typeorm';

import { BaseEntity, PaginatedData } from '../';

@EntityRepository()
export abstract class BaseRepository<
  Entity extends BaseEntity
> extends Repository<Entity> {
  async findPaginated(
    options?: FindManyOptions<Entity>,
  ): Promise<PaginatedData<Entity>> {
    const [entities, count] = await this.findAndCount(options);

    return { data: entities, count };
  }

  async findOneOrCreate(
    conditions: DeepPartial<Entity>,
  ): Promise<{ entity: Entity; isNew: boolean }> {
    let entity = await this.findOne({ where: conditions });
    let isNew = false;

    if (!entity) {
      entity = await this.save(conditions);
      isNew = true;
    }

    return { entity, isNew };
  }
}
