import { array, boolean, number, object, string, TypeOf, z } from "zod";

export const addCarReviewBodySchema = {
  body: object({
    username: string({ required_error: "reviewer is required" }).uuid(),
    message: string({
      required_error: "Review Message is required",
    }),
    rating: number({
      required_error: "Rating is required",
    }),
    car_id: string({ required_error: "hotel id is required" }).uuid(),
  }),
};

export type addCarReviewBodyType = TypeOf<typeof addCarReviewBodySchema.body>;

export const updateReviewBodySchema = {
  body: object({
    review_id: string({
      required_error: "review id is required",
    }).max(40, "Review id cannot be more than 40 characters"),
    reviewer: string({ required_error: "reviewer is required" }).regex(
      new RegExp(/^[a-z A-Z0-9_\-.]*$/gm),
      "Please Enter valid Area name"
    ),
    message: string({
      required_error: "Review Message is required",
    }),
    rating: number({
      required_error: "Rating is required",
    }),
    hotel_id: string({ required_error: "hotel id is required" }).max(
      40,
      "Hotel id cannot be more than 40 characters"
    ),
  }),
};

export type updateReviewBodyType = TypeOf<typeof updateReviewBodySchema.body>;

export const getReviewBodySchema = {
  body: object({
    review_id: string({
      required_error: "review id is required",
    }).max(40, "Review id cannot be more than 40 characters"),
  }),
};

export type getReviewBodyType = TypeOf<typeof getReviewBodySchema.body>;

export const deleteReviewBodySchema = {
  body: object({
    review_id: string({
      required_error: "review id is required",
    }).max(40, "Review id cannot be more than 40 characters"),
  }),
};

export type deleteReviewBodyType = TypeOf<typeof deleteReviewBodySchema.body>;
