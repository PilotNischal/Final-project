import { array, boolean, number, object, string, TypeOf } from "zod";

export const createRoomBodySchema = {
  body: object({
    hotel_id: string({ required_error: "Hotel is required" }).uuid(),
    room_number: string({ required_error: "room number is required" }),
    bookedDays: array(string().regex(/^\d{4}-\d{2}-\d{2}$/))
      .optional()
      .transform((val) => val ?? []),
    cost: number({ required_error: "room cost is required" }),
    offer: number().default(0),
    offer_type: string().default("No Offer"),
  }).strict(),
};

export type createRoomBodyType = TypeOf<typeof createRoomBodySchema.body>;

export const addOfferBodySchema = {
  body: object({
    room_number: string({ required_error: "Room number is required" }),
    offer: number({ required_error: "Offer is required" }),
    offer_type: string({ required_error: "offer type is required" }),
  }),
};

export type addOfferType = TypeOf<typeof addOfferBodySchema.body>;

export const checkRoomBodySchema = {
  body: object({
    room_number: number({ required_error: "Room number is required" }),
  }),
};

export type checkRoomType = TypeOf<typeof checkRoomBodySchema.body>;

export const updateRoomBodySchema = {
  body: object({
    room_number: number({
      required_error: "Room number is required",
    }),
    bookedDays: array(string().regex(/^\d{4}-\d{2}-\d{2}$/)),
    cost: number({ required_error: "room cost is required" }),
    offer: number().optional(),
    offer_type: string().optional(),
  }).strict(),
};

export type updateRoomBodyType = TypeOf<typeof updateRoomBodySchema.body>;

export const bookRoomSchema = {
  body: object({
    room_id: string({
      required_error: "Id is required",
    }),
    bookedDays: array(string().regex(/^\d{4}-\d{2}-\d{2}$/)),
    username: string({}),
  }).strict(),
};
export type bookRoomType = TypeOf<typeof bookRoomSchema.body>;
