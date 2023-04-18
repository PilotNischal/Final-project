import { Mongoose } from "mongoose";
import logger from "../config/logger/logger";
import { Hotel, HotelModel } from "../Model/Hotel.model";
import { Room, RoomModel } from "../Model/Room.model";
import { TRoom } from "../Types/types";
import crypto from "crypto";
import { addCarBodyType } from "../Schema/Car.schema";
import { createRoomBodyType } from "../Schema/Room.schema";
import { ReviewModel } from "../Model/Review.model";
import { addReviewBodyType } from "../Schema/Review.schema";
import { response } from "express";

import { UserModel } from "../Model/User.model";

import { createHotelBodyType } from "../Schema/Hotel.schema";
import { BookingModel } from "../Model/Booking.model";

export async function getAllHotelsService(): Promise<{
  hotels: Array<any>;
  statusNumber: number;
}> {
  try {
    let hotels = [];

    const response = await HotelModel.find().lean();
    for (let i = 0; i < response.length; i++) {
      const room = await RoomModel.find({
        hotel_id: response[i].hotel_id,
      });
      hotels.push({
        ...response[i],
        rooms: room,
        averageCost:
          room.reduce((sum, item) => sum + item.cost, 0) / room.length,
      });
    }
    return {
      hotels: hotels,
      statusNumber: 200,
    };
  } catch (error) {
    logger.error(JSON.stringify(error));
    return {
      hotels: [],
      statusNumber: 400,
    };
  }
}
export async function getHotelService(hotel_id: string): Promise<{
  response: any;
  statusNumber: number;
}> {
  try {
    const hotel = (await HotelModel.findOne(
      { hotel_id },
      { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
    ).lean()) as Hotel;

    var reviews = [];
    const rooms = await RoomModel.find(
      {
        hotel_id: hotel_id,
      },
      {
        _id: 0,
      }
    );
    const review = await ReviewModel.find(
      {
        hotel_id: hotel_id,
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
      response: { ...hotel, review: reviews, room: rooms },
      statusNumber: 200,
    };
  } catch (error) {
    logger.error(JSON.stringify(error));
    return {
      response: "No Hotel Found",
      statusNumber: 400,
    };
  }
}
export async function insertHotelService({
  description,
  location,
  name,
  type,
  hotelImages,
  review_permission,
  hotel_features,
}: createHotelBodyType & { hotelImages: string[] }): Promise<{
  hotel: Hotel | string;
  statusNumber: number;
}> {
  try {
    const hotel_id = crypto.randomUUID();
    const response = await HotelModel.create({
      hotel_id,
      description,
      location,
      name,
      type,
      hotelImages,
      hotel_features: hotel_features?.split(","),
      review_permission,
    });

    return {
      hotel: response,
      statusNumber: 200,
    };
  } catch (error) {
    logger.error(JSON.stringify(error));
    return {
      hotel: "Error While creating hotel",
      statusNumber: 400,
    };
  }
}

export async function deleteHotelService(hotel_id: string): Promise<{
  response: Hotel | string;
  statusNumber: number;
}> {
  try {
    const response = await HotelModel.deleteOne({
      hotel_id,
    });
    if (response.deletedCount > 0) {
      return {
        response: "Deleted sucessful",
        statusNumber: 200,
      };
    } else
      return {
        response: "No Hotel  Found",
        statusNumber: 400,
      };
  } catch (error) {
    logger.error(JSON.stringify(error));
    return {
      response: "Error while deleting Hotel",
      statusNumber: 400,
    };
  }
}

export async function readWithRatingService(): Promise<{
  response: any;
  statusNumber: number;
}> {
  const countHotelsCommand = await HotelModel.find().sort({
    averageRating: -1,
    name: 1,
  });

  return {
    response: "Entered Here",
    statusNumber: 200,
  };
}

export async function giveHotelReviewService({
  hotel_id,
  username,
  rating,
  message,
}: addReviewBodyType): Promise<any> {
  try {
    const checkReviewPermission = await HotelModel.findOne(
      { hotel_id },
      { review_permission: 1, _id: 0 }
    );

    if (checkReviewPermission && checkReviewPermission.review_permission) {
      const reviewer_id = username;
      const checkReviewerCommand = await ReviewModel.find({
        $and: [{ reviewer_id }, { hotel_id }],
      });

      if (checkReviewerCommand.length > 0) {
        return {
          response: "Already Reviewed for this hotel",
          statusNumber: 400,
        };
      } else {
        const addHotelReviewCommand = await ReviewModel.create({
          reviewer_id,
          message,
          rating,
          hotel_id,
        });
        if (addHotelReviewCommand) {
          return {
            response: "Review Sent for Inspection",
            statusNumber: 200,
          };
        }
      }
    } else {
      return {
        response: "Cannote review in this hotel",
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

export async function readLimitedOfferHotelsService(): Promise<any> {
  let hotels = [];

  const readAllHotels = await HotelModel.find().lean();

  for (let i = 0; i < readAllHotels.length; i++) {
    const readrooms = await RoomModel.find({
      hotel_id: readAllHotels[i].hotel_id,
      offer: { $gt: 0 },
    });

    hotels.push({
      hotel: readAllHotels[i],
      rooms: readrooms,
      averageCost:
        readrooms.reduce((sum, item) => sum + item.cost, 0) /
        (readrooms.length > 0 ? readrooms.length : 1),
    });
  }

  return {
    response: hotels
      .sort((a, b) => a.rooms.length - b.rooms.length)
      .filter((item) => item.rooms.length > 0)
      .map((item: any) => {
        return { ...item.hotel, averageCost: item.averageCost };
      }),
    statusNumber: 200,
  };
}
