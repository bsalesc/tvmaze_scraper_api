import { Schema } from 'mongoose';

export const CastSchema = new Schema({
  id: Number,
  name: String,
  birthday: String,
});
