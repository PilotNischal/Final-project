import {
  approveCarPendingReviewService,
  approveHotelPendingReviewService,
  disapproveCarPendingReviewService,
  disapproveHotelPendingReviewService,
  readAllCarPendingReviewsService,
  readAllHotelPendingReviewsService,
} from "../Services/Review.service";
import { Response, Request } from "express";
import { pendingIdBodyType } from "../Schema/Review.schema";

export const readAllCarPendingReviewsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { response, statusNumber } = await readAllCarPendingReviewsService();
  res.status(statusNumber).send(response);
};

export const readAllHotelPendingReviewsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { response, statusNumber } = await readAllHotelPendingReviewsService();
  res.status(statusNumber).send(response);
};

export const approveCarPendingReview = async (
  req: Request<pendingIdBodyType, {}, {}>,
  res: Response
) => {
  const { review_id } = req.params;
  try {
    const resp = await approveCarPendingReviewService({
      review_id,
    });
    res.status(resp?.statusNumber as number).send(resp?.response);
  } catch (error) {}
};

export const approveHotelPendingReview = async (
  req: Request<pendingIdBodyType, {}, {}>,
  res: Response
) => {
  const { review_id } = req.params;
  try {
    const resp = await approveHotelPendingReviewService({ review_id });
    res.status(resp?.statusNumber as number).send(resp?.response);
  } catch (error) {}
};

export const dissaproveCarPendingReview = async (
  req: Request<pendingIdBodyType, {}, {}>,
  res: Response
) => {
  const { review_id } = req.params;
  try {
    const resp = await disapproveCarPendingReviewService({ review_id });
    res.status(resp?.statusNumber as number).send(resp?.response);
  } catch (error) {}
};

export const dissaproveHotelPendingReview = async (
  req: Request<pendingIdBodyType, {}, {}>,
  res: Response
) => {
  const { review_id } = req.params;
  try {
    const resp = await disapproveHotelPendingReviewService({ review_id });
    res.status(resp?.statusNumber as number).send(resp?.response);
  } catch (error) {}
};
