import express, { Router, Request, Response } from "express";
import multer from "multer";
import {
  forgotPasswordController,
  getAllUsersContoller,
  loginUsersContoller,
  registerUserController,
  resendOtpController,
  resetPasswordController,
  sendMailController,
  verifyFpOtpController,
  verifyOtpController,
} from "../Controllers/User.controller";
import { authenticateToken } from "../middlewares/Authentication";
import { validate } from "../middlewares/SchemaParser";
import { UserModel } from "../Model/User.model";
import {
  forgotPasswordBodySchema,
  loginBodySchema,
  registerBodySchema,
  resendTokenBodySchema,
  resetPasswordSchema,
  tokenBodySchema,
  verifyfpotpBodySchema,
} from "../Schema/User.schema";
import crypto from "crypto";
import { CarBookingModel } from "../Model/CarBooking.model";
import { BookingModel } from "../Model/Booking.model";

const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, callback) {
    callback(null, "Assets/User");
  },
  filename(req: Request, file: Express.Multer.File, callback: any) {
    const photoName = crypto.randomBytes(15).toString("hex");
    const imageName =
      file.fieldname +
      photoName +
      "." +
      file.originalname.split(".")[file.originalname.split(".").length - 1];

    callback(null, imageName);
  },
});

export const upload = multer({
  storage: storage,
});
const router = Router();

router.get("/all", getAllUsersContoller);
router.post(
  "/login",
  validate({ schema: loginBodySchema.body, typeOfReq: "Body" }),
  loginUsersContoller
);
router.post(
  "/register",
  validate({ schema: registerBodySchema.body, typeOfReq: "Body" }),
  registerUserController
);

router.post(
  "/verifyotp",
  validate({ schema: tokenBodySchema.body, typeOfReq: "Body" }),
  verifyOtpController
);

router.post(
  "/resendotp",
  validate({ schema: resendTokenBodySchema.body, typeOfReq: "Body" }),
  resendOtpController
);

router.post(
  "/forgotpassword",
  validate({ schema: forgotPasswordBodySchema.body, typeOfReq: "Body" }),
  forgotPasswordController
);

router.post(
  "/verifyfpotp",
  validate({ schema: verifyfpotpBodySchema.body, typeOfReq: "Body" }),
  verifyFpOtpController
);

router.post(
  "/resetpassword",
  validate({ schema: resetPasswordSchema.body, typeOfReq: "Body" }),
  resetPasswordController
);

router.post("/mail", sendMailController);
router.post(
  "/profile",
  authenticateToken,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const username = req.body.username as string;

      if (!req.file) return res.status(400).send("NO user found");

      const profilepic = req.file.filename as unknown as string;

      const profile = await UserModel.updateOne(
        {
          username,
        },
        {
          $set: {
            profile: profilepic,
          },
        }
      );

      return res.status(200).send("User profile change successfull");
    } catch (error) {
      res.status(400).send("NO User Found");
    }
  }
);
router.post(
  "/bio",
  upload.single("bioImage"),
  authenticateToken,
  async (req, res) => {
    try {
      const username = req.body.username as string;

      if (!req.file) return res.status(400).send("NO user found");
      console.log("====================================");
      console.log(username, "Line Not ");
      console.log("====================================");
      const profilepic = req.file.filename as unknown as string;
      const profile = await UserModel.updateOne(
        {
          username,
        },
        {
          $set: {
            bioImage: profilepic,
          },
        }
      );

      return res.status(200).send("User Bio change successfull");
    } catch (error) {
      res.status(400).send("NO User Found");
    }
  }
);
router.get("/", authenticateToken, async (req, res) => {
  try {
    const username = req.body.username as { userid: string };
    const user = await UserModel.findOne({
      username,
    }).lean();
    const CarBooking = await CarBookingModel.find({
      booker_id: username,
      status: true,
    });
    const hotelBooking = await BookingModel.find({
      booker_id: username,
      status: true,
    });
    if (!user) return res.status(400).send("No User Found");
    user["password"] = "";
    return res
      .status(200)
      .send({ ...user, carBooking: CarBooking, hotelBooking });
  } catch (error) {
    res.status(400).send("NO User Found");
  }
});
export default router;
