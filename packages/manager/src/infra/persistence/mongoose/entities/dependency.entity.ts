import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type DependencyDocument = HydratedDocument<Dependency>;

@Schema()
export class DependencyVersion {
  @Prop({ required: true })
  version: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: false })
  status: boolean;

  @Prop()
  integrity: string;
}

@Schema()
export class Dependency {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [DependencyVersion], default: [] })
  versions: DependencyVersion[];
}

const DependencySchema = SchemaFactory.createForClass(Dependency);

export { DependencySchema };
