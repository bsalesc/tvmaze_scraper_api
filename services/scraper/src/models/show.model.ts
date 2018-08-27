import { Document, Model, model, Schema } from 'mongoose';
import { ShowInterface } from '../interfaces/show.interface';

export type ShowDocument = ShowInterface & Document;

const CastSchema = new Schema({
  id: Number,
  name: String,
  birthday: String,
});

export const ShowSchema = new Schema({
  id: Number,
  name: String,
  cast: [CastSchema],
});

export const Show: Model<ShowDocument> = model<ShowDocument>(
  'Show',
  ShowSchema,
);
