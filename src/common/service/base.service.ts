import { FindAndModifyWriteOpResultObject } from 'mongodb';
import {
  Model,
  FilterQuery,
  QueryFindOptions,
  QueryFindBaseOptions,
  CreateQuery,
  SaveOptions,
  ModelOptions,
  UpdateQuery,
  ModelUpdateOptions,
  QueryFindOneAndUpdateOptions,
  QueryFindOneAndRemoveOptions,
} from 'mongoose';

import { BaseEntity } from '../entity';
import {
  PaginatedData,
  UpdateResult,
  DeleteResult,
  BaseEntityStatus,
} from '..';

export abstract class BaseService<Entity extends BaseEntity> {
  constructor(private readonly baseModel: Model<Entity>) {}

  find(
    conditions: FilterQuery<Entity>,
    projection?: any | null,
    options?: QueryFindOptions,
  ): Promise<Entity[]> {
    return this.baseModel.find(conditions, projection, options).exec();
  }

  async findPaginated(
    conditions: FilterQuery<Entity>,
    projection?: any | null,
    options?: QueryFindOptions,
  ): Promise<PaginatedData<Entity>> {
    const [data, count] = await Promise.all([
      this.baseModel.find(conditions, projection, options).exec(),
      this.baseModel.countDocuments(conditions).exec(),
    ]);

    return { data, count };
  }

  findOne(
    conditions: FilterQuery<Entity>,
    projection?: any | null,
    options?: QueryFindBaseOptions,
  ): Promise<Entity> {
    return this.baseModel.findOne(conditions, projection, options).exec();
  }

  findById(
    id: string,
    projection?: any | null,
    options?: QueryFindBaseOptions,
  ): Promise<Entity> {
    return this.baseModel.findById(id, projection, options).exec();
  }

  findByIds(
    ids: string[],
    projection?: any | null,
    options?: QueryFindOptions,
  ): Promise<Entity[]> {
    return this.baseModel
      .find({ _id: { $in: ids } } as any, projection, options)
      .exec();
  }

  async findOneOrCreate(
    conditions: Partial<Entity>,
  ): Promise<{
    entity: Entity;
    isNew: boolean;
  }> {
    let entity = await this.findOne(conditions as any);
    let isNew = false;

    if (!entity) {
      entity = await this.create(conditions as any);
      isNew = true;
    }

    return { entity, isNew };
  }

  count(conditions: FilterQuery<Entity>): Promise<number> {
    return this.baseModel.countDocuments(conditions).exec();
  }

  exists(conditions: FilterQuery<Entity>): Promise<boolean> {
    return this.baseModel.exists(conditions);
  }

  create(
    doc: CreateQuery<Partial<Entity>>,
    options?: SaveOptions,
  ): Promise<Entity> {
    return this.baseModel.create(doc, options);
  }

  createMany(
    docs: Partial<Entity>[],
    options?: { ordered?: boolean; rawResult?: boolean } & ModelOptions,
  ): Promise<Entity[]> {
    return this.baseModel.insertMany(docs, options);
  }

  updateOne(
    conditions: FilterQuery<Entity>,
    doc: UpdateQuery<Entity>,
    options?: ModelUpdateOptions,
  ): Promise<UpdateResult> {
    return this.baseModel.updateOne(conditions, doc, options).exec();
  }

  updateMany(
    conditions: FilterQuery<Entity>,
    doc: UpdateQuery<Entity>,
    options?: ModelUpdateOptions,
  ): Promise<UpdateResult> {
    return this.baseModel.updateMany(conditions, doc, options).exec();
  }

  findOneAndUpdate(
    conditions: FilterQuery<Entity>,
    update: UpdateQuery<Entity>,
    options?: QueryFindOneAndUpdateOptions,
  ): Promise<Entity> {
    return this.baseModel.findOneAndUpdate(conditions, update, options).exec();
  }

  findByIdAndUpdate(
    id: string,
    update: UpdateQuery<Entity>,
    options?: QueryFindOneAndUpdateOptions,
  ): Promise<Entity> {
    return this.baseModel.findByIdAndUpdate(id, update, options).exec();
  }

  increment(
    conditions: FilterQuery<Entity>,
    property: string,
    value: number,
  ): Promise<UpdateResult> {
    return this.baseModel
      .updateMany(conditions, { $inc: { [property]: value } } as any)
      .exec();
  }

  decrement(
    conditions: FilterQuery<Entity>,
    property: string,
    value: number,
  ): Promise<UpdateResult> {
    return this.increment(conditions, property, -value);
  }

  deleteOne(
    conditions: FilterQuery<Entity>,
    options?: ModelOptions,
  ): Promise<DeleteResult> {
    return this.baseModel.deleteOne(conditions, options).exec();
  }

  deleteMany(
    conditions: FilterQuery<Entity>,
    options?: ModelOptions,
  ): Promise<DeleteResult> {
    return this.baseModel.deleteMany(conditions, options).exec();
  }

  findOneAndDelete(
    conditions: FilterQuery<Entity>,
    options?: QueryFindOneAndRemoveOptions,
  ): Promise<Entity> {
    return this.baseModel.findOneAndDelete(conditions, options).exec();
  }

  findByIdAndDelete(
    id: string,
    options?: QueryFindOneAndRemoveOptions,
  ): Promise<FindAndModifyWriteOpResultObject<Entity>> {
    return this.baseModel.findByIdAndDelete(id, options).exec();
  }

  remove(conditions: FilterQuery<Entity>): Promise<DeleteResult> {
    return this.baseModel.remove(conditions).exec();
  }

  findOneAndRemove(
    conditions: FilterQuery<Entity>,
    options: QueryFindOneAndRemoveOptions,
  ): Promise<Entity> {
    return this.baseModel.findOneAndRemove(conditions, options).exec();
  }

  findByIdAndRemove(
    id: string,
    options?: QueryFindOneAndRemoveOptions,
  ): Promise<FindAndModifyWriteOpResultObject<Entity>> {
    return this.baseModel.findByIdAndRemove(id, options).exec();
  }

  softDelete(conditions: FilterQuery<Entity>): Promise<UpdateResult> {
    return this.baseModel
      .updateMany(conditions, { status: BaseEntityStatus.DELETED } as any)
      .exec();
  }
}
