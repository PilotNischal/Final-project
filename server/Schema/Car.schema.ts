import moment from "moment";
import { array, boolean, number, object, string, TypeOf, z, ZodAny } from "zod";

export const Transmission = z.enum(["Automatic", "Mannual"]);
export const TCar = z.enum(["Small", "Medium", "Large", "SUV", "Luxury"]);
export const CarReviewPermission = z.enum(["ON", "OFF"]);

export const addCarBodySchema = {
  body: object({
    car_number: string({ required_error: "Car no is required" }),
    car_type: TCar,
    name: string({
      required_error: "Car name is required",
    }).regex(
      new RegExp(/^[a-z A-Z0-9_\-.]*$/gm),
      "Please Enter valid Area name"
    ),
    review_permission: CarReviewPermission,
    door_number: number({ required_error: "Door number is required" }),
    car_images: array(
      string().max(64, "Image name cannot be greater than 64 characters")
    ).optional(),
    trunkspace: number({
      required_error: "Trunkspace is required",
    }),
    seatnumber: number({
      required_error: "Seat number is required",
    }),
    cost: number({
      required_error: "Cost is required",
    }),
    ac_system: boolean().optional(),
    transmission: Transmission,
    discount: number({}).max(3, "Discount too high").optional(),
    free_includes: array(string()).optional(),
    hire_includes: array(string()).optional(),
  }).strict(),
};

export type addCarBodyType = TypeOf<typeof addCarBodySchema.body>;

export const updateCarBodySchema = {
  body: object({
    car_id: string({
      required_error: "Car id is required",
    }),
    car_type: string({
      required_error: "Car Type is required",
    }),
    name: string({
      required_error: "Car name is required",
    }).regex(
      new RegExp(/^[a-z A-Z0-9_\-.]*$/gm),
      "Please Enter valid Area name"
    ),
    model: string({
      required_error: "Car model is required",
    }),
    description: string({
      required_error: "Description is required",
    }).max(1000, "Description cannot be more than 1000 characters"),
    color: string({
      required_error: "Car color is required",
    }).regex(
      new RegExp(/^[a-z A-Z0-9_\-.]*$/gm),
      "Please Enter valid Area name"
    ),
    car_images: array(
      string().max(64, "Image name cannot be greater than 64 characters")
    ).optional(),
    trunkspace: boolean({
      required_error: "Trunkspace is required",
    }),
    seatnumber: number({
      required_error: "Seat number is required",
    }),
    cost: number({
      required_error: "Cost is required",
    }),

    discount: number({}).max(3, "Discount too high").optional(),
  }).strict(),
};

export type updateCarBodyType = TypeOf<typeof updateCarBodySchema.body>;

export const getCarBodySchema = {
  body: object({
    car_id: string({
      required_error: "Car id is required",
    }).uuid(),
  }).strict(),
};

export type getCarBodyType = TypeOf<typeof getCarBodySchema.body>;

export const deleteCarBodySchema = {
  body: object({
    car_id: string({
      required_error: "Car id is required",
    }).uuid(),
  }),
};

export type deleteCarBodyType = TypeOf<typeof deleteCarBodySchema.body>;
export const rentCarBodySchema = {
  body: object({
    car_id: string({
      required_error: "Car Id is required",
    }),
    bookedDays: array(
      string({ required_error: "Book days is required to book a car" }).regex(
        /^\d{4}-\d{2}-\d{2}$/
      )
    ),
    username: string({ required_error: "Username is required" }),
  }).strict(),
};

export type rentCarBodyType = TypeOf<typeof rentCarBodySchema.body>;

export const cancelRentBodySchema = {
  body: object({
    booking_id: string({ required_error: "Booking id is required" }),
    car_id: string({
      required_error: "Car Id is required",
    }),
    username: string({ required_error: "Username is required" }),
  }).strict(),
};

export type cancelRentBodyType = TypeOf<typeof cancelRentBodySchema.body>;
