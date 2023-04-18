import { getModelForClass, prop } from "@typegoose/typegoose";
import crypto from "crypto";

export class CarBooking {
  @prop({ required: true, unique: true, default: crypto.randomUUID() })
  booking_id: string;
  @prop({ required: true })
  days: Array<string>;
  @prop({ required: true })
  booker_id: string;
  @prop({ required: true })
  cost: number;
  @prop({ required: true, default: true })
  status: boolean;
  @prop({ required: true })
  car_id: string;
}
export const CarBookingModel = getModelForClass(CarBooking, {
  schemaOptions: {
    timestamps: true,
  },
});
