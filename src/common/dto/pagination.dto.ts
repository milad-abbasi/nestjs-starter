import { IsOptional, IsInt, Min, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

import { SortType } from '..';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  size?: number = 10;

  @IsOptional()
  @IsString()
  sort_field?: string = '_id';

  @IsOptional()
  @IsInt()
  @IsIn(Object.values(SortType))
  sort_type?: SortType = SortType.DESC;

  get limit(): number {
    return this.size;
  }

  get offset(): number {
    return (this.page - 1) * this.size;
  }
}
