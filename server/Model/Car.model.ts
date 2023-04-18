import mongoose from "mongoose";
import { prop, pre, getModelForClass } from "@typegoose/typegoose";
import crypto from "crypto";
import { Moment } from "moment";
import { CarReviewPermission, TCar, Tranmission } from "../Types/types";

export class Car {
  @prop({ required: true, unique: true, default: crypto.randomUUID() })
  car_id: string;

  @prop({ required: true })
  car_type: TCar;

  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true })
  car_number: string;

  @prop({ required: true })
  car_images: Array<string>;

  @prop({ required: true, default: 0 })
  trunkspace: number;

  @prop({ required: true })
  seatnumber: number;

  @prop({ required: true })
  cost: number;

  @prop({ required: true })
  transmission: Tranmission;

  @prop({ required: true, default: 0 })
  discount: number;

  @prop({ required: true, default: false })
  ac_system: boolean;

  @prop({ required: true })
  door_number: number;

  @prop({ required: true, default: [] })
  bookedDays: Array<Moment>;

  @prop({ required: true, default: 0 })
  totalReviews: number;

  @prop({ required: true, default: 0 })
  averageRating: number;

  @prop({ required: true })
  review_permission: CarReviewPermission;

  @prop({ required: true, default: [] })
  free_includes: Array<string>;

  @prop({ required: true, default: [] })
  hire_includes: Array<string>;
}

export const CarModel = getModelForClass(Car, {
  schemaOptions: {
    timestamps: true,
  },
});
