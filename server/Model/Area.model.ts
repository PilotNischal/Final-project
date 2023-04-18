import mongoose, { Date } from 'mongoose';
import { prop, pre, getModelForClass } from '@typegoose/typegoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import moment, { Moment } from 'moment';
import { Hotel } from './Hotel.model';
export class Area {
  @prop({
    required: true,
    default: crypto.randomUUID(),
    unique: true,
  })
  area_id: string;
  @prop({ required: true })
  name: string;
  @prop({ required: true, maxlength: 1000 })
  description: string;
  @prop({ required: true, default: false })
  featured: boolean;
  @prop({ default: [] })
  hotels: Array<string>;
  @prop({ required: true })
  popularDestinations: Array<Hotel>;
}
export const AreaModel = getModelForClass(Area, {
  schemaOptions: {
    timestamps: true,
  },
});
