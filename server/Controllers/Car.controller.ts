import logger from "../config/logger/logger";
import { Request, Response } from "express";
import {
  addCarService,
  cancelRentService,
  deleteCarService,
  getAllCarService,
  giveCarReviewService,
  readCarService,
  rentCarService,
  updateCarService,
} from "../Services/Car.service";
import {
  addCarBodyType,
  cancelRentBodyType,
  deleteCarBodyType,
  getCarBodyType,
  rentCarBodyType,
  updateCarBodyType,
} from "../Schema/Car.schema";
import { addCarReviewBodyType } from "../Schema/CarReview.schema";
import { totalCarDetailsService } from "../Services/Admin.service";

export const addCarController = async (
  req: Request<{}, {}, addCarBodyType>,
  res: Response
) => {
  try {
    const {
      car_type,
      name,
      door_number,
      review_permission,
      trunkspace,
      car_number,
      seatnumber,
      cost,
      discount,
      ac_system,
      transmission,
      free_includes,
      hire_includes,
    } = req.body;
    console.log("====================================");
    console.log(name);
    console.log("====================================");

    let car_images: string[] = [];

    const files = req.files as Array<Express.Multer.File>;

    files.forEach((file) => {
      car_images.push(file.filename);
    });
    const { response, statusNumber } = await addCarService({
      car_type,
      name,
      car_images,
      review_permission,
      car_number,
      trunkspace,
      door_number,
      seatnumber,
      cost,
      discount,
      transmission,
      ac_system,
      free_includes,
      hire_includes,
    });
    res.status(statusNumber).send(response);
  } catch (error) {
    logger.error(JSON.stringify(error));
    res.status(400).send(error);
  }
};

export const deleteCarController = async (
  req: Request<deleteCarBodyType, {}, {}>,
  res: Response
) => {
  try {
    const { car_id } = req.params;
    const resp = await deleteCarService({ car_id });
    res.status(resp?.statusNumber as number).send(resp?.response);
  } catch (error) {
    logger.error(JSON.stringify(error));
    res.status(400).send(error);
  }
};

export const readAllCarsController = async (rea: Request, res: Response) => {
  try {
    const { response, statusNumber } = await getAllCarService();

    res.status(statusNumber).send(response);
  } catch (error) {
    logger.error(JSON.stringify(error));
    res.status(400).send(error);
  }
};

export const readCarController = async (
  req: Request<getCarBodyType, {}, {}>,
  res: Response
): Promise<void> => {
  try {
    const { car_id } = req.params;
    const { response, statusNumber } = await readCarService({ car_id });
    res.status(statusNumber).send(response);
  } catch (error) {
    logger.error(JSON.stringify(error));
    res.status(400).send(error);
  }
};

export const updateCarController = async (
  req: Request<getCarBodyType, {}, updateCarBodyType>,
  res: Response
): Promise<void> => {
  try {
    const { car_id } = req.params;
    const {
      car_type,
      name,
      model,
      color,
      trunkspace,
      seatnumber,
      description,
      cost,
      discount,
    } = req.body;

    let car_images: string[] = [];

    const files = req.files as Array<Express.Multer.File>;

    files.forEach((file) => {
      car_images.push(file.filename);
    });
    const { response, statusNumber } = await updateCarService({
      car_id,
      car_type,
      name,
      model,
      color,
      car_images,
      trunkspace,
      seatnumber,
      description,
      cost,
      discount,
    });
    res.status(statusNumber).send(response);
  } catch (error) {
    logger.error(JSON.stringify(error));
    res.status(400).send(error);
  }
};

export const giveCarReviewController = async (
  req: Request<{}, {}, addCarReviewBodyType>,
  res: Response
): Promise<void> => {
  const { username, car_id, message, rating } = req.body;
  const { response, statusNumber } = await giveCarReviewService({
    username,
    message,
    rating,
    car_id,
  });
  res.status(statusNumber).send(response);
};

export const rentCarController = async (
  req: Request<{}, {}, rentCarBodyType>,
  res: Response
): Promise<void> => {
  const { car_id, bookedDays, username } = req.body;
  const resp = await rentCarService({
    car_id,
    bookedDays,
    username,
  });
  res.status(resp?.statusNumber as number).send(resp?.response);
};

export const cancelRentController = async (
  req: Request<{}, {}, cancelRentBodyType>,
  res: Response
): Promise<void> => {
  const { booking_id, username, car_id } = req.body;
  const resp = await cancelRentService({ car_id, username, booking_id });
  res.status(resp?.statusNumber as number).send(resp?.response);
};

export const totalCarDetailsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const resp = await totalCarDetailsService();
  res.status(resp?.statusNumber as number).send(resp?.response);
};
