import { Response, Request } from "express";
import {
  createHotelBodyType,
  deleteHotelBodyType,
  getHotelBodyType,
} from "../Schema/Hotel.schema";
import { addReviewBodyType } from "../Schema/Review.schema";
import {
  deleteHotelService,
  getAllHotelsService,
  getHotelService,
  giveHotelReviewService,
  insertHotelService,
  readLimitedOfferHotelsService,
  readWithRatingService,
} from "../Services/Hotel.service";
import { cancelRentService } from "../Services/Room.service";
export const getAllHotelsController = async (req: Request, res: Response) => {
  const { hotels, statusNumber } = await getAllHotelsService();
  res.send(hotels).status(statusNumber);
};
export const getHotelController = async (
  req: Request<getHotelBodyType, {}, {}>,
  res: Response
) => {
  const { hotel_id } = req.params;
  const { response, statusNumber } = await getHotelService(hotel_id);
  res.send(response).status(statusNumber);
};
export const insertHotelController = async (
  req: Request<{}, {}, createHotelBodyType>,
  res: Response
) => {
  const {
    description,
    location,
    name,
    type,
    review_permission,
    hotel_features,
  } = req.body;
  let hotelImages: string[] = [];

  const files = req.files as Array<Express.Multer.File>;

  files.forEach((image) => {
    hotelImages.push(image.filename);
  });
  const { hotel, statusNumber } = await insertHotelService({
    description,
    location,
    name,
    type,
    hotelImages,
    review_permission,
    hotel_features,
  });
  res.status(statusNumber).send(hotel);
};

export const deleteHotelController = async (
  req: Request<deleteHotelBodyType, {}, {}>,
  res: Response
) => {
  const { hotel_id } = req.params;
  const { response, statusNumber } = await deleteHotelService(hotel_id);
  res.status(statusNumber).send(response);
};

export const readWithRatingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { response, statusNumber } = await readWithRatingService();
  res.status(statusNumber).send(response);
};

export const giveHotelReviewController = async (
  req: Request<{}, {}, addReviewBodyType>,
  res: Response
): Promise<void> => {
  const { username, hotel_id, message, rating } = req.body;
  const { response, statusNumber } = await giveHotelReviewService({
    username,
    message,
    rating,
    hotel_id,
  });
  res.status(statusNumber).send(response);
};

export const readLimitedOfferHotelsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { response, statusNumber } = await readLimitedOfferHotelsService();
  res.status(statusNumber).send(response);
};
export const cancelBookingController = async (req: Request, res: Response) => {
  const { room_id, username, booking_id } = req.body;
  const { response, statusNumber } = await cancelRentService({
    room_id,
    booking_id,
    username,
  });
  res.status(statusNumber).send(response);
};
