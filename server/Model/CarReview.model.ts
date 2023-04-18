import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import crypto from "crypto";
import { Car } from "./Car.model";
import { User } from "./User.model";

export class CarReview {
  @prop({ required: true, default: crypto.randomUUID() })
  review_id: string;
  @prop({ required: true })
  reviewer_id: Ref<User, User["username"]>;
  @prop({ required: true })
  message: string;
  @prop({ required: true })
  rating: number;
  @prop({ required: true, default: false })
  confirmation: boolean;
  @prop({ required: true })
  car_id: Ref<Car, Car["car_id"]>;
}

export const CarReviewModel = getModelForClass(CarReview, {
  schemaOptions: {
    timestamps: true,
  },
});
