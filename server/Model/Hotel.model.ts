import mongoose from "mongoose";
import { prop, pre, getModelForClass } from "@typegoose/typegoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Room } from "./Room.model";
import { Review } from "./Review.model";
import { Area } from "./Area.model";
import { TRoom } from "../Types/types";

export class Hotel {
  @prop({ required: true })
  name: string;

  @prop({ required: true, default: crypto.randomUUID() })
  hotel_id: string;

  @prop({ required: true, unique: false, sparse: true })
  location: string;

  @prop({ required: true })
  type: TRoom;

  @prop({ required: true })
  description: string;

  @prop({ required: true, default: [] })
  hotel_features: Array<string>;

  @prop({ required: true, default: 0 })
  averageRating: number;

  @prop({ required: true, default: 0 })
  totalReviews: number;

  

  @prop({ required: true, default: [] })
  hotelImages: Array<string>;

  @prop({ required: true })
  review_permission: string;
}

export const HotelModel = getModelForClass(Hotel, {
  schemaOptions: {
    timestamps: true,
  },
});
