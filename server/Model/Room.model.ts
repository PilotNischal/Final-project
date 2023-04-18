import mongoose from "mongoose";
import { prop, pre, getModelForClass } from "@typegoose/typegoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import moment, { Moment } from "moment";

export class Room {
  @prop({ required: true, default: crypto.randomUUID() })
  room_id: string;
  @prop({ required: true })
  hotel_id: string;
  @prop({ required: true })
  room_number: number;
  @prop({
    required: true,
    default: [],
  })
  bookedDays: Array<String>;
  @prop({ required: true })
  cost: number;
  @prop({ required: false, default: 0 })
  offer: number | undefined;
  @prop({ required: false, default: "No offer" })
  offer_type: string;
}
export const RoomModel = getModelForClass(Room, {
  schemaOptions: {
    timestamps: true,
  },
});
