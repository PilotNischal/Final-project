import { Response, Request } from 'express';
import {
  addOfferType,
  bookRoomType,
  checkRoomType,
  createRoomBodyType,
} from '../Schema/Room.schema';
import {
  addRoomOfferService,
  addRoomService,
  bookRoomService,
  checkRoomAvailabilityService,
} from '../Services/Room.service';

export const addRoomController = async (
  req: Request<{}, {}, createRoomBodyType>,
  res: Response
) => {
  const { hotel_id, room_number, cost, offer, offer_type } = req.body;
  const { response, statusNumber } = await addRoomService({
    hotel_id,
    room_number,
    cost,
    offer,
    offer_type,
  });
  res.status(statusNumber).send(response);
};

export const addOfferController = async (
  req: Request<{}, {}, addOfferType>,
  res: Response
) => {
  const { room_number, offer, offer_type } = req.body;
  const { response, statusNumber } = await addRoomOfferService({
    room_number,
    offer,
    offer_type,
  });
  res.status(statusNumber).send(response);
};

export const checkRoomAvailablityController = async (
  req: Request<{}, {}, checkRoomType>,
  res: Response
): Promise<void> => {
  const { room_number } = req.body;
  const { response, statusNumber } = await checkRoomAvailabilityService({
    room_number,
  });
  res.status(statusNumber).send(response);
};

export const bookRoomController = async (
  req: Request<{}, {}, bookRoomType>,
  res: Response
): Promise<void> => {
  const { room_id, bookedDays, username } = req.body;
  const { response, statusNumber } = await bookRoomService(
    room_id,
    bookedDays,
    username
  );
  res.status(statusNumber).send(response);
};
