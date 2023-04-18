import { Router } from "express";
import {
  approveCarPendingReview,
  approveHotelPendingReview,
  dissaproveCarPendingReview,
  dissaproveHotelPendingReview,
  readAllCarPendingReviewsController,
  readAllHotelPendingReviewsController,
} from "../Controllers/Review.controller";
import { authenticateadmin } from "../middlewares/Authentication";
import { validate } from "../middlewares/SchemaParser";
import { pendingIdSchema } from "../Schema/Review.schema";

const router = Router();

router.get(
  "/readallcarpendingreviews",
  // authenticateadmin,
  readAllCarPendingReviewsController
);

router.get(
  "/readallhotelpendingreviews",
  // authenticateadmin,
  readAllHotelPendingReviewsController
);
router.put(
  "/approvecarreview/:review_id",
  // authenticateadmin,
  validate({ schema: pendingIdSchema.body, typeOfReq: "Params" }),
  approveCarPendingReview
);
router.put(
  "/approvehotelreview/:review_id",
  // authenticateadmin,
  validate({ schema: pendingIdSchema.body, typeOfReq: "Params" }),
  approveHotelPendingReview
);

router.put(
  "/disapprovecarreview/:review_id",
  // authenticateadmin,
  validate({ schema: pendingIdSchema.body, typeOfReq: "Params" }),
  dissaproveCarPendingReview
);

router.put(
  "/disapprovehotelreview/:review_id",
  // authenticateadmin,
  validate({ schema: pendingIdSchema.body, typeOfReq: "Params" }),
  dissaproveHotelPendingReview
);

export default router;
