import { Mongoose } from "mongoose";
import logger from "../config/logger/logger";
import { Hotel, HotelModel } from "../Model/Hotel.model";
import { Room, RoomModel } from "../Model/Room.model";
import { TRoom } from "../Types/types";
import { addOfferType, checkRoomType } from "../Schema/Room.schema";
import moment, { Moment } from "moment";
import {
  sendBookingMail,
  sendMail,
  sendMessageFromMail,
} from "../config/Mailer/Mailer";
import { UserModel } from "../Model/User.model";
import crypto, { randomUUID } from "crypto";
import { BookingModel } from "../Model/Booking.model";
import { sendMailService } from "./User.service";

export async function addRoomService({
  hotel_id,
  cost,
  room_number,
  offer,
  offer_type,
}: {
  hotel_id: string;
  cost: number;
  room_number: string;
  offer?: number;
  offer_type?: string;
}): Promise<{ response: any; statusNumber: number }> {
  try {
    const checkHotelCommand = await HotelModel.findOne({ hotel_id: hotel_id });
    if (checkHotelCommand) {
      const checkRoomNumber = await RoomModel.findOne({
        room_number: room_number,
      });
      if (checkRoomNumber) {
        return {
          response: "Room already exist",
          statusNumber: 400,
        };
      } else {
        const room_id = crypto.randomUUID();
        const addRoomController = await RoomModel.create({
          room_id,
          hotel_id,
          cost,
          room_number,
          offer,
          offer_type,
        });
        if (addRoomController) {
          return {
            response: "Room added sucessfully",
            statusNumber: 200,
          };
        } else {
          return {
            response: "Error adding room",
            statusNumber: 400,
          };
        }
      }
    } else {
      return {
        response: "Hotel Not Found",
        statusNumber: 400,
      };
    }
  } catch (error) {
    logger.error(JSON.stringify(error));
    return {
      response: error,
      statusNumber: 500,
    };
  }
}

export async function addRoomOfferService({
  room_number,
  offer,
  offer_type,
}: addOfferType): Promise<{ response: any; statusNumber: number }> {
  try {
    const addOfferCommand = await RoomModel.findOneAndUpdate(
      { room_id: room_number },
      { $set: { offer: offer, offer_type: offer_type } }
    );

    if (addOfferCommand) {
      const users = await UserModel.find().lean();
      const room = await RoomModel.findOne({
        room_id: room_number,
      });
      const hotel = await HotelModel.findOne({
        hotel_id: room?.hotel_id,
      });
      for (let i = 0; i < users.length; i++) {
           sendMessageFromMail(
          `Have you checked out new Offer of ${offer} in ${room?.room_number} of hotel:${hotel?.name} `,
          "Willowdale Notification service",
          users[i].email,
          "info@willowdale.com"
        );
      }
      return {
        response: "Offer for room added successful",
        statusNumber: 200,
      };
    } else {
      return {
        response: "Adding offer was unsucessful",
        statusNumber: 200,
      };
    }
  } catch (error) {
    logger.error(JSON.stringify(error));
    return {
      response: error,
      statusNumber: 500,
    };
  }
}

export async function checkRoomAvailabilityService({
  room_number,
}: checkRoomType): Promise<{ response: any; statusNumber: number }> {
  try {
    const checkRoomNumber = await RoomModel.findOne({
      room_number: room_number,
    });

    if (checkRoomNumber) {
      if (checkRoomNumber.bookedDays.length > 0) {
        return {
          response: "Room booked",
          statusNumber: 200,
        };
      } else {
        return {
          response: "Room available",
          statusNumber: 200,
        };
      }
    } else {
      return {
        response: "Room Not found",
        statusNumber: 400,
      };
    }
  } catch (error) {
    logger.error(JSON.stringify(error));
    return {
      response: error,
      statusNumber: 500,
    };
  }
}

export async function bookRoomService(
  room_id: string,
  days: Array<string>,
  booker: string
): Promise<{
  response: any;
  statusNumber: number;
}> {
  try {
    const findRoom = (await RoomModel.findOne(
      { room_id },
      { _id: 0, createdAt: 0, updatedAt: 0 }
    )) as any;

    if (
      findRoom.bookedDays.filter((value: string) => days.includes(value)) > 0
    ) {
      return {
        response: `This room is already booked`,
        statusNumber: 200,
      };
    } else {
      for (let i = 0; i < days.length; i++) {
        const response = await RoomModel.updateOne(
          {
            room_id: room_id,
          },
          {
            $push: {
              bookedDays: days[i],
            },
          }
        );
      }
      const response = await UserModel.findOne({
        username: booker,
      });
      const room = await RoomModel.findOne({
        room_id: room_id,
      });
      const booking =
        room?.cost &&
        (await BookingModel.create({
          booking_id: crypto.randomUUID(),
          booker_id: booker,
          days: days,
          cost: room?.cost * days.length,
          room_id: room_id,
        }));

      response?.email &&
        sendBookingMail(
          days[0],
          days[days.length - 1],
          crypto.randomUUID(),
          findRoom.room_number,
          undefined,
          response?.email,
          "nischal0407@xavier.edu.np"
        );

      return {
        response: "Room booked Succesfully",
        statusNumber: 200,
      };
    }
  } catch (error) {
    logger.error(JSON.stringify(error));

    return {
      response: "Error while booking",
      statusNumber: 400,
    };
  }
}

export async function cancelRentService({
  room_id,
  username,
  booking_id,
}: {
  room_id: string;
  username: string;
  booking_id: string;
}): Promise<{ response: any; statusNumber: number }> {
  try {
    const readRentedDays = (await RoomModel.findOne(
      { room_id },
      { bookedDays: 1, _id: 0 }
    )) as any;

    const findRentedCar = await BookingModel.updateOne(
      {
        booking_id: booking_id,
      },
      { $set: { status: false } }
    );
    const bookedDays = await BookingModel.findOne({
      booking_id,
    });
    if (!bookedDays) {
      return {
        response: "Error",
        statusNumber: 400,
      };
    }

    if (findRentedCar.modifiedCount > 0) {
      for (let i = 0; i < bookedDays.days.length; i++) {
        const room = await RoomModel.findOne({
          room_id,
        });

        if (!room)
          return {
            response: "Error",
            statusNumber: 400,
          };

        const newBookeddays = room.bookedDays.filter(
          (el) => !bookedDays.days.includes(el as any)
        );

        const cancelCarRent = await RoomModel.updateOne(
          { room_id },
          { $set: { bookedDays: [...newBookeddays] } }
        );

        if (cancelCarRent.modifiedCount > 0) {
          return {
            response: "Room Booking Cancelled",
            statusNumber: 200,
          };
        } else {
          return {
            response: "Error",
            statusNumber: 400,
          };
        }
      }
      if (bookedDays.days.length === 0) {
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
    return {
      response: "Error",
      statusNumber: 400,
    };
  } catch (error) {
    logger.error(JSON.stringify(error));
    return {
      response: error,
      statusNumber: 400,
    };
  }
}
