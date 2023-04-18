import { Router, Request, Response } from "express";
import {
  addCarController,
  cancelRentController,
  deleteCarController,
  giveCarReviewController,
  readAllCarsController,
  readCarController,
  rentCarController,
  updateCarController,
} from "../Controllers/Car.controller";
import crypto from "crypto";
import multer from "multer";
import {
  authenticateadmin,
  authenticateToken,
} from "../middlewares/Authentication";
import { validate } from "../middlewares/SchemaParser";
import {
  addCarBodySchema,
  cancelRentBodySchema,
  deleteCarBodySchema,
  getCarBodySchema,
  rentCarBodySchema,
  updateCarBodySchema,
} from "../Schema/Car.schema";
import { addCarReviewBodySchema } from "../Schema/CarReview.schema";
const router = Router();

const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, callback) {
    callback(null, "Assets/Car");
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
router.post(
  "/addcar",
  authenticateadmin,
  upload.array("carImages", 5),
  addCarController
);

router.delete(
  "/deletecar/:car_id",
  authenticateadmin,
  validate({ schema: deleteCarBodySchema.body, typeOfReq: "Params" }),
  deleteCarController
);
router.get("/all", readAllCarsController);
router.post(
  "/givereview/",
  authenticateToken,
  validate({ schema: addCarReviewBodySchema.body, typeOfReq: "Body" }),
  giveCarReviewController
);
router.get(
  "/readcar/:car_id",
  validate({ schema: getCarBodySchema.body, typeOfReq: "Params" }),
  readCarController
);

router.post(
  "/rentcar",
  authenticateToken,
  validate({ schema: rentCarBodySchema.body, typeOfReq: "Body" }),
  rentCarController
);
// router.put(
//   "/updatecar/:car_id",
//   authenticateadmin,
//   upload.array("image", 5),
//   updateCarController
// );

router.put(
  "/cancelrent",
  authenticateToken,
  validate({ schema: cancelRentBodySchema.body, typeOfReq: "Body" }),
  cancelRentController
);
export default router;
