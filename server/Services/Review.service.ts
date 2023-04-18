import { ReviewModel } from "../Model/Review.model";
import { CarReviewModel } from "../Model/CarReview.model";
import { UserModel } from "../Model/User.model";
import { pendingIdBodyType } from "../Schema/Review.schema";
import { CarModel } from "../Model/Car.model";
import { HotelModel } from "../Model/Hotel.model";

export async function readAllCarPendingReviewsService() {
  let reviews: object[] = [];

  const getCarReviews: any = await CarReviewModel.find(
    {
      confirmation: false,
    },
    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
  )
    .lean()
    .sort({
      createdAt: 1,
    });

  // const getHotelReviews: any = await ReviewModel.find(
  //   {
  //     confirmation: false,
  //   },
  //   { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
  // )
  //   .lean()
  //   .sort({
  //     createdAt: 1,
  //   });

  if (getCarReviews.length > 0) {
    for (let i = 0; i < getCarReviews.length; i++) {
      const user = await UserModel.findOne(
        {
          username: getCarReviews[i].reviewer_id,
        },
        { firstname: 1, lastname: 1, email: 1, _id: 0 }
      );
      getCarReviews[i].reviwer = user;
    }
    return {
      response: getCarReviews,
      statusNumber: 200,
    };
  } else {
    return {
      response: "No pending reviews remaining",
      statusNumber: 200,
    };
  }
}

export async function readAllHotelPendingReviewsService() {
  const getHotelReviews: any = await ReviewModel.find(
    {
      confirmation: false,
    },
    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
  )
    .lean()
    .sort({
      createdAt: 1,
    });

  if (getHotelReviews.length > 0) {
    for (let i = 0; i < getHotelReviews.length; i++) {
      const user = await UserModel.findOne(
        {
          username: getHotelReviews[i].reviewer_id,
        },
        { firstname: 1, lastname: 1, email: 1, _id: 0 }
      );
      getHotelReviews[i].reviwer = user;
    }
    return {
      response: getHotelReviews,
      statusNumber: 200,
    };
  } else {
    return {
      response: "No pending reviews remaining",
      statusNumber: 200,
    };
  }
}

export async function approveCarPendingReviewService({
  review_id,
}: pendingIdBodyType): Promise<
  | {
      response: any;
      statusNumber: number;
    }
  | undefined
> {
  const scancarreviews = await CarReviewModel.findOne({ review_id });
  if (scancarreviews != null) {
    const approveCarReview = await CarReviewModel.updateOne(
      {
        review_id: review_id,
      },
      { $set: { confirmation: true } }
    );
    if (approveCarReview.modifiedCount == 1) {
      let averageRating = 0;
      const getCarId = await CarReviewModel.findOne(
        { review_id },
        { car_id: 1, _id: 0 }
      );

      const { totalReviews } = (await CarModel.findOne(
        { car_id: getCarId?.car_id },
        { totalReviews: 1, _id: 0 }
      )) as any;
      const countReviewCommand = await CarReviewModel.find(
        { car_id: getCarId?.car_id, confirmation: true },
        { rating: 1, _id: 0 }
      );
      const totalRatingsDone = countReviewCommand.length;
      countReviewCommand.forEach(({ rating }) => {
        averageRating = averageRating + rating;
      });
      const updateCarRating = await CarModel.updateOne(
        { car_id: getCarId?.car_id },
        {
          $set: {
            averageRating: averageRating / totalRatingsDone,
            totalReviews: totalReviews + 1,
          },
        }
      );
      if (updateCarRating) {
        return {
          response: "Admin approve done",
          statusNumber: 200,
        };
      } else {
        return {
          response: "Error while updating averageReview",
          statusNumber: 200,
        };
      }
    }
  } else {
    return {
      response: "Invalid reivew id ",
      statusNumber: 400,
    };
  }
}

export async function approveHotelPendingReviewService({
  review_id,
}: pendingIdBodyType): Promise<
  | {
      response: any;
      statusNumber: number;
    }
  | undefined
> {
  const scanhotelrreviews = await ReviewModel.findOne({ review_id });
  if (scanhotelrreviews != null) {
    const approveHotelReview = await ReviewModel.updateOne(
      {
        review_id: review_id,
      },
      { $set: { confirmation: true } }
    );

    if (approveHotelReview.modifiedCount == 1) {
      let averageRating = 0;
      const getHotelId = await ReviewModel.findOne(
        { review_id },
        { hotel_id: 1, _id: 0 }
      );
      const { totalReviews } = (await HotelModel.findOne(
        { hotel_id: getHotelId?.hotel_id },
        { totalReviews: 1, _id: 0 }
      )) as any;
      const countReviewCommand = await ReviewModel.find(
        { hotel_id: getHotelId?.hotel_id, confirmation: true },
        { rating: 1, _id: 0 }
      );

      const totalRatingsDone = countReviewCommand.length;
      countReviewCommand.forEach(({ rating }) => {
        averageRating = averageRating + rating;
      });
      const updateHotelRating = await HotelModel.updateOne(
        { hotel_id: getHotelId?.hotel_id },
        {
          $set: {
            averageRating: averageRating / totalRatingsDone,
            totalReviews: totalReviews + 1,
          },
        }
      );
      if (updateHotelRating) {
        return {
          response: "Admin Approve done",
          statusNumber: 200,
        };
      } else {
        return {
          response: "Error while updating averageReview",
          statusNumber: 200,
        };
      }
    } else {
      return {
        response: "Error",
        statusNumber: 400,
      };
    }
  } else {
    return {
      response: "Invalid review id",
      statusNumber: 400,
    };
  }
}

export async function disapproveCarPendingReviewService({
  review_id,
}: pendingIdBodyType): Promise<any> {
  const findCarReview = await CarReviewModel.findOne({ review_id });
  if (findCarReview != null) {
    const deleteCarReview = await CarReviewModel.deleteOne({
      review_id,
      confirmation: false,
    });
    if (deleteCarReview) {
      return {
        response: "Review rejected by Admin",
        statusNumber: 200,
      };
    } else {
      return {
        response: "Error while rejecting",
        statusNumber: 500,
      };
    }
  } else {
    return {
      response: "Invalid review id",
      statusNumber: 400,
    };
  }
}

export async function disapproveHotelPendingReviewService({
  review_id,
}: pendingIdBodyType): Promise<any> {
  const findHotelReview = await ReviewModel.findOne({ review_id });
  if (findHotelReview != null) {
    const deleteHotelReview = await ReviewModel.deleteOne({
      review_id,
      confirmation: false,
    });

    if (deleteHotelReview) {
      return {
        response: "Review rejected by Admin",
        statusNumber: 200,
      };
    } else {
      return {
        response: "Error while rejecting",
        statusNumber: 500,
      };
    }
  } else {
    return {
      response: "Invalid Review id",
      statusNumber: 400,
    };
  }
}
