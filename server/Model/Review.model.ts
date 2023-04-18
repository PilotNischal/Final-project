import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import crypto from "crypto";
import { Hotel } from "./Hotel.model";
import { User } from "./User.model";

export class Review {
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
  hotel_id: Ref<Hotel, Hotel["hotel_id"]>;
}

export const ReviewModel = getModelForClass(Review, {
  schemaOptions: {
    timestamps: true,
  },
});
