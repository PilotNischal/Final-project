import moment, { max } from "moment";
import { array, boolean, number, object, string, TypeOf, z } from "zod";
import { Area } from "../Model/Area.model";
import { createAreaBodySchema } from "./Area.schema";
import { createRoomBodySchema } from "./Room.schema";

export const TRoom = z.enum([
  "Single",
  "Twin",
  "Delux",
  "Suite",
  "RoomsWithView",
]);
export const createHotelSchema = {
  body: object({
    name: string({
      required_error: "Area name is required",
    }).regex(
      new RegExp(/^[a-z A-Z0-9_\-.]*$/gm),
      "Please Enter valid Area name"
    ),
    location: string({ required_error: "Location is required" }),
    type: TRoom,
    description: string({
      required_error: "Hotel description is required",
    })
      .min(10, "Description not long enough")
      .max(1000, "Keep the description short"),

    review_permission: string({
      required_error: "Review Permission is required",
    }),
    hotel_features: string().optional(),
  }),
};

export type createHotelBodyType = TypeOf<typeof createHotelSchema.body>;

export const updateHotelSchema = {
  body: object({
    hotel_id: string({ required_error: "Hotel id is required" }).max(
      40,
      "Hotel id cannot be greater than 12 characters"
    ),
    name: string({
      required_error: "Area name is required",
    }).regex(
      new RegExp(/^[a-z A-Z0-9_\-.]*$/gm),
      "Please Enter valid Area name"
    ),
    location: string({ required_error: "Location name is reqired" }),
    type: TRoom,
    description: string({
      required_error: "Hotel description is required",
    })
      .min(30, "Description not long enought")
      .max(1000, "Keep the description short"),
  }).strict(),
};

export type updateHotelBodyType = TypeOf<typeof updateHotelSchema.body>;

export const getHotelSchema = {
  body: object({
    hotel_id: string({ required_error: "Hotel is required" }).uuid(),
  }).strict(),
};

export type getHotelBodyType = TypeOf<typeof getHotelSchema.body>;

export const deleteHotelSchema = {
  body: object({
    hotel_id: string({ required_error: "Hotel is required" }).max(
      40,
      "Hotel id cannot be greater than 12 characters"
    ),
  }).strict(),
};

export type deleteHotelBodyType = TypeOf<typeof deleteHotelSchema.body>;
