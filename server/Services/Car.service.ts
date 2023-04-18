import logger from "../config/logger/logger";
import { CarModel, Car } from "../Model/Car.model";
import crypto from "crypto";
import {
  addCarBodyType,
  cancelRentBodyType,
  deleteCarBodyType,
  getCarBodyType,
  rentCarBodyType,
  updateCarBodyType,
} from "../Schema/Car.schema";
import mongoose from "mongoose";
import fs from "fs";
import { addCarReviewBodyType } from "../Schema/CarReview.schema";
import { CarReview, CarReviewModel } from "../Model/CarReview.model";
import { UserModel } from "../Model/User.model";
import { CarBookingModel } from "../Model/CarBooking.model";
import { sendBookingMail } from "../config/Mailer/Mailer";
import moment from "moment";

export async function addCarService({
  car_type,
  name,
  review_permission,
  car_number,
  car_images,
  door_number,
  trunkspace,
  seatnumber,
  cost,
  discount,
  transmission,
  ac_system,
  free_includes,
  hire_includes,
}: addCarBodyType): Promise<{
  response: any;
  statusNumber: number;
}> {
  try {
    const findCarNumber = await CarModel.findOne({ car_number });

    if (findCarNumber) {
      return {
        response: "Car number Already exist",
        statusNumber: 409,
      };
    } else {
      const car_id = crypto.randomUUID();
      const addCarCommand = await CarModel.create({
        _id: new mongoose.Types.ObjectId(),
        car_type: car_type,
        car_id: car_id,
        car_number: car_number,
        name: name,
        door_number: door_number,
        car_images: car_images,
        trunkspace: trunkspace,
        seatnumber: seatnumber,
        cost: cost,
        review_permission: review_permission,
        transmission: transmission,
        ac_system: ac_system ? ac_system : false,
        discount: discount ? discount : 0,
        free_includes: free_includes,
        hire_includes: hire_includes,
      });
      if (addCarCommand) {
        return {
          response: "Car Added Sucessfully",
          statusNumber: 200,
        };
      } else {
        return {
          response: "Adding Car unsuccessful",
          statusNumber: 200,
        };
      }
    }
  } catch (error) {
    logger.error(JSON.stringify(error));
    return {
      response: error,
      statusNumber: 400,
    };
  }
}

export async function deleteCarService({ car_id }: deleteCarBodyType): Promise<
  | {
      response: any;
      statusNumber: number;
    }
  | undefined
> {
  try {
    const { bookedDays } = (await CarModel.findOne(
      { car_id },
      { bookedDays: 1, _id: 0 }
    )) as any;
    if (
      bookedDays.filter((value: string) =>
        bookedDays.includes(moment().format("YYYY-MM-DD"))
      ) > 0
    ) {
      return {
        response: "This car is rented",
        statusNumber: 200,
      };
    } else {
      const checkReviews = await CarReviewModel.find({ car_id });
      if (checkReviews.length > 0) {
        const deleteAllReviews = await CarReviewModel.deleteMany({ car_id });
        if (deleteAllReviews.deletedCount > 0) {
          const findCarCommand = await findCarService(car_id);
          const imagesToBeDeleted = findCarCommand?.car_images;

          if (imagesToBeDeleted && imagesToBeDeleted.length > 0) {
            imagesToBeDeleted.forEach((image) => {
              if (fs.existsSync(`./Assets/Car/${image}`)) {
                fs.unlink(`./Assets/Car/${image}`, (err) => err);
              }
            });
          }

          const deleteCarCommand = await deleteCarServiceById(car_id);
          if (deleteCarCommand) {
            return {
              response: "Car Deleted Successfully",
              statusNumber: 200,
            };
          } else {
            return {
              response: "Error while deleting",
              statusNumber: 400,
            };
          }
        }
      } else {
        const findCarCommand = await findCarService(car_id);
        const imagesToBeDeleted = findCarCommand?.car_images;

        if (imagesToBeDeleted && imagesToBeDeleted.length > 0) {
          imagesToBeDeleted.forEach((image) => {
            if (fs.existsSync(`./Assets/Car/${image}`)) {
              fs.unlink(`./Assets/Car/${image}`, (err) => err);
            }
          });
        }

        const deleteCarCommand = await deleteCarServiceById(car_id);
        if (deleteCarCommand) {
          return {
            response: "Car Deleted Successfully",
            statusNumber: 200,
          };
        } else {
          return {
            response: "Error while deleting",
            statusNumber: 400,
          };
        }
      }
    }
  } catch (error) {
    logger.error(JSON.stringify(error));
    return {
      response: "Error",
      statusNumber: 400,
    };
  }
}

export async function getAllCarService(): Promise<{
  response: any;
  statusNumber: number;
}> {
  try {
    const cars = await CarModel.find();

    if (cars) {
      return {
        response: cars,
        statusNumber: 200,
      };
    } else {
      return {
        response: "Read unsucessful",
        statusNumber: 400,
      };
    }
  } catch (error) {
    logger.error(JSON.stringify(error));
    return {
      response: error,
      statusNumber: 400,
    };
  }
}

export async function readCarService({ car_id }: getCarBodyType): Promise<{
  response: any;
  statusNumber: number;
}> {
  try {
    const car = await CarModel.findOne(
      { car_id },
      { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
    ).lean();
    if (!car) throw Error("No Car Found");
    var reviews = [];
    const review = await CarReviewModel.find(
      {
        car_id: car_id,
        confirmation: true,
      },
      { __v: 0, _id: 0, createdAt: 0, updatedAt: 0, car_id: 0, review_id: 0 }
    )
      .sort({ updatedAt: -1, createdAt: -1 })
      .lean();

    for (let i = 0; i < review.length; i++) {
      const user = await UserModel.findOne(
        { username: review[i].reviewer_id },
        { firstname: 1, lastname: 1, email: 1, _id: 0 }
      );
      reviews.push({
        ...review[i],
        user,
      });
    }
    return {
      response: { ...car, review: reviews },
      statusNumber: 200,
    };
  } catch (error) {
    return {
      response: error,
      statusNumber: 400,
    };
  }
}

export async function updateCarService({
  car_id,
  car_type,
  name,
  model,
  car_images,
  color,
  description,
  trunkspace,
  seatnumber,
  cost,
  discount,
}: updateCarBodyType): Promise<{ response: any; statusNumber: number }> {
  try {
    const findCarCommand = await findCarService(car_id);
    const imagesToBeDeleted = findCarCommand?.car_images;

    if (imagesToBeDeleted && imagesToBeDeleted.length > 0) {
      imagesToBeDeleted.forEach((image) => {
        if (fs.existsSync(`./Assets/Car/${image}`)) {
          fs.unlink(`./Assets/Car/${image}`, (err) => err);
        }
      });
    }

    const updateCarCommand = await CarModel.updateOne(
      { car_id },
      {
        $set: {
          car_type: car_type,
          name: name,
          model: model,
          car_images,
          color: color,
          description: description,
          trunkspace: trunkspace,
          seatnumber: seatnumber,
          cost: cost,
          discound: discount ? discount : 0,
        },
      }
    );
    if (updateCarCommand) {
      return {
        response: "Car Updated Sucessful",
        statusNumber: 200,
      };
    } else {
      return {
        response: "Data Update unsucessful",
        statusNumber: 200,
      };
    }
  } catch (error) {
    logger.error(JSON.stringify(error));
    return {
      response: error,
      statusNumber: 400,
    };
  }
}

async function findCarService(car_id: Car["car_id"]) {
  return await CarModel.findOne({
    car_id,
  });
}

async function deleteCarServiceById(car_id: Car["car_id"]) {
  return await CarModel.findOneAndDelete({ car_id });
}

export async function giveCarReviewService({
  car_id,
  username,
  rating,
  message,
}: addCarReviewBodyType): Promise<any> {
  const reviewer_id = username;
  try {
    const checkReviewPermission = await CarModel.findOne(
      { car_id },
      { review_permission: 1, _id: 0 }
    );

    if (
      checkReviewPermission &&
      (checkReviewPermission.review_permission == "ON" ||
        checkReviewPermission.review_permission.toLowerCase() == "true")
    ) {
      const checkReviewerCommand = await CarReviewModel.find({
        reviewer_id,
        car_id,
      });

      if (checkReviewerCommand.length > 0) {
        return {
          response: "Already Reviewed by this user",
          statusNumber: 409,
        };
      } else {
        const review_id = crypto.randomUUID();
        const addCarReviewCommand = await CarReviewModel.create({
          review_id,
          reviewer_id,
          message,
          rating,
          car_id,
        });
        if (addCarReviewCommand) {
          return {
            response: "Review Sent for Inspection",
            statusNumber: 200,
          };
        }
      }
    } else {
      return {
        response: "Cannot Review for this car",
        statusNumber: 403,
      };
    }
  } catch (error) {
    logger.error(JSON.stringify(error));
    return {
      response: error,
      statusNumber: 200,
    };
  }
}

export async function rentCarService({
  car_id,
  bookedDays,
  username,
}: rentCarBodyType): Promise<
  | {
      response: any;
      statusNumber: number;
    }
  | undefined
> {
  try {
    const findCar = (await CarModel.findOne(
      { car_id },
      { _id: 0, createdAt: 0, updatedAt: 0 }
    )) as any;

    if (
      findCar.bookedDays.filter((value: string) => bookedDays.includes(value)) >
      0
    ) {
      return {
        response: `This car is already rented`,
        statusNumber: 200,
      };
    } else {
      for (let i = 0; i < bookedDays.length; i++) {
        const response = await CarModel.updateOne(
          {
            car_id: car_id,
          },
          {
            $push: {
              bookedDays: bookedDays[i],
            },
          }
        );
      }
      const booker_id = username;
      const { email } = (await UserModel.findOne({
        username: booker_id,
      })) as any;
      const BOOKING_ID = crypto.randomUUID();
      const rentCar = await CarBookingModel.create({
        booking_id: BOOKING_ID,
        booker_id: booker_id,
        days: bookedDays,
        cost: findCar?.cost * bookedDays.length,
        car_id: car_id,
      });

      if (rentCar) {
        sendBookingMail(
          bookedDays[0],
          bookedDays[bookedDays.length - 1],
          BOOKING_ID,
          undefined,
          findCar.car_number,
          email,
          "nischal0407@xavier.edu.np"
        );

        return {
          response: "Car rented  Succesfully",
          statusNumber: 200,
        };
      } else {
        return {
          response: "Error sending message in email",
          statusNumber: 400,
        };
      }
    }
  } catch (error) {
    logger.error(JSON.stringify(error));

    return {
      response: "Error white booking",
      statusNumber: 400,
    };
  }
}

export async function cancelRentService({
  car_id,
  username,
  booking_id,
}: cancelRentBodyType): Promise<
  { response: any; statusNumber: number } | undefined
> {
  try {
    const readRentedDays = (await CarModel.findOne(
      { car_id },
      { bookedDays: 1, _id: 0 }
    )) as any;

    const findRentedCar = await CarBookingModel.updateOne(
      {
        booking_id: booking_id,
      },
      { $set: { status: false } }
    );

    if (findRentedCar.modifiedCount > 0) {
      const cancelCarRent = await CarModel.updateOne(
        { car_id },
        { $set: { bookedDays: [] } }
      );

      if (cancelCarRent.modifiedCount > 0) {
        return {
          response: "Car Rent Cancelled",
          statusNumber: 200,
        };
      } else {
        return {
          response: "Error",
          statusNumber: 400,
        };
      }
    } else {
      return {
        response: "Error",
        statusNumber: 400,
      };
    }
  } catch (error) {
    logger.error(JSON.stringify(error));
    return {
      response: error,
      statusNumber: 400,
    };
  }
}
