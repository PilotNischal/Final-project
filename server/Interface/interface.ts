interface CarReview {
  review_id: string;
  reviewer_id: string;
  message: string;
  rating: number;
  confirmation: boolean;
  car_id: string;
}

interface CarReviewWithReviewer extends CarReview {
  reviwer: {
    firstname: string;
    lastname: string;
    email: string;
  };
}

interface HotelReview {
  review_id: string;
  reviewer_id: string;
  message: string;
  rating: number;
  confirmation: boolean;
  hotel_id: string;
}

interface HotelReviewWithReviewer extends HotelReview {
  reviwer: {
    firstname: string;
    lastname: string;
    email: string;
  };
}
