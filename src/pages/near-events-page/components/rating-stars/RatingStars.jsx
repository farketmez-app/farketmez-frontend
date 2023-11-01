import React from "react";
import "./rating-stars.css";
import StarFilledIcon from "../../../../assets/icons/star-filled.svg";
import StarHalfFilledIcon from "../../../../assets/icons/star-halffilled.svg";
import StarUnfilledIcon from "../../../../assets/icons/star-unfilled.svg";

function RatingStars({ rating, size = "default", grayed = false }) {
  // size is either "default" or "large"
  return (
    <div className={`rating-stars 
    ${grayed ? "rating-stars--grayed" : ""}
    `}>
      <img
        className={`rating-stars__icon rating-stars__icon--${size}`}
        src={
          rating >= 1
            ? StarFilledIcon
            : rating >= 0.5
            ? StarHalfFilledIcon
            : StarUnfilledIcon
        }
        alt="star icon"
      />
      <img
        width={size}
        heigth={size}
        className={`rating-stars__icon rating-stars__icon--${size}`}
        src={
          rating >= 2
            ? StarFilledIcon
            : rating >= 1.5
            ? StarHalfFilledIcon
            : StarUnfilledIcon
        }
        alt="star icon"
      />
      <img
        width={size}
        heigth={size}
        className={`rating-stars__icon rating-stars__icon--${size}`}
        src={
          rating >= 3
            ? StarFilledIcon
            : rating >= 2.5
            ? StarHalfFilledIcon
            : StarUnfilledIcon
        }
        alt="star icon"
      />
      <img
        width={size}
        heigth={size}
        className={`rating-stars__icon rating-stars__icon--${size}`}
        src={
          rating >= 4
            ? StarFilledIcon
            : rating >= 3.5
            ? StarHalfFilledIcon
            : StarUnfilledIcon
        }
        alt="star icon"
      />
      <img
        width={size}
        heigth={size}
        className={`rating-stars__icon rating-stars__icon--${size}`}
        src={
          rating >= 5
            ? StarFilledIcon
            : rating >= 4.5
            ? StarHalfFilledIcon
            : StarUnfilledIcon
        }
        alt="star icon"
      />
    </div>
  );
}

export default RatingStars;
