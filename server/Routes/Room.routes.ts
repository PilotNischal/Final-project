import express, { Router } from "express";
import mongoose, { mongo } from "mongoose";
import { checkAvailablityController } from "../Controllers/Area.controller";
import {
  addOfferController,
  addRoomController,
  bookRoomController,
  checkRoomAvailablityController,
} from "../Controllers/Room.controller";
import {
  authenticateadmin,
  authenticateToken,
} from "../middlewares/Authentication";
import { validate } from "../middlewares/SchemaParser";
import { BookingModel } from "../Model/Booking.model";
import { CarBookingModel } from "../Model/CarBooking.model";
import { RoomModel } from "../Model/Room.model";
import { addReviewBodySchema } from "../Schema/Review.schema";
import {
  addOfferBodySchema,
  bookRoomSchema,
  checkRoomBodySchema,
  createRoomBodySchema,
} from "../Schema/Room.schema";

const router = Router();

router.post(
  "/addroom",
  validate({ schema: createRoomBodySchema.body, typeOfReq: "Body" }),
  authenticateadmin,
  addRoomController
);

router.put(
  "/addoffer",
  authenticateadmin,
  validate({ schema: addOfferBodySchema.body, typeOfReq: "Body" }),
  addOfferController
);
router.delete("/:room_id", async (req, res) => {
  try {
    const { room_id } = req.params;
    console.log("====================================");
    console.log(room_id);
    console.log("====================================");
    const response = await RoomModel.findOneAndDelete({
      room_id,
    });
    res.status(200).send("Deleting success");
  } catch (error) {
    res.status(400).send("Error while deleting");
  }
});

router.post(
  "/checkavailability/",
  validate({ schema: checkRoomBodySchema.body, typeOfReq: "Body" }),
  checkRoomAvailablityController
);

router.post(
  "/bookroom",
  authenticateToken,
  validate({
    schema: bookRoomSchema.body,
    typeOfReq: "Body",
  }),
  bookRoomController
);
export default router;
