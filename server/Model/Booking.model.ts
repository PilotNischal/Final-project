import { getModelForClass, prop } from "@typegoose/typegoose";
import crypto from "crypto";

export class Booking {
  @prop({ required: true, unique: true, default: crypto.randomUUID() })
  booking_id: string;
  @prop({ required: true })
  days: Array<string>;
  @prop({ required: true })
  booker_id: string;
  @prop({ required: true })
  cost: string;
  @prop({ required: true })
  room_id: string;
  @prop({ required: true, default: true })
  status: boolean;
}
export const BookingModel = getModelForClass(Booking, {
  schemaOptions: {
    timestamps: true,
  },
});
