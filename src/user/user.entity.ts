import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseEntity, defaultTimestampFields } from '../common';

@Schema({ timestamps: defaultTimestampFields })
export class User extends BaseEntity {
  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
