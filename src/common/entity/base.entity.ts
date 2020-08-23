import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export abstract class BaseEntity extends Document {
  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}
