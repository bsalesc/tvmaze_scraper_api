import { Document, Model, model, Schema } from 'mongoose';
import { ShowInterface } from '../interfaces/show.interface';
import { CastSchema } from './cast.schema';

export type ShowDocument = ShowInterface & Document;

export const ShowSchema = new Schema({
  id: Number,
  name: String,
  cast: [CastSchema],
});

export const Show: Model<ShowDocument> = model<ShowDocument>(
  'Show',
  ShowSchema,
);
