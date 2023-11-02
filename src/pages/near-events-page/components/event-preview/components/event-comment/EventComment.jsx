import React from "react";
import "./event-comment.css";

import RatingStars from "../../../rating-stars/RatingStars";

function EventComment({ comment }) {
  return (
    <div className="event-comment">
      <div className="event-comment__header">
        <p className="event-comment__name">
          {comment.name} {comment.surname}
        </p>

        <div className="event-comment__rating">
          <RatingStars rating={comment.rating} grayed={true} />
        </div>
      </div>

      <div className="event-comment__comment">
        <p className="event-comment__comment-text">{comment.comment}</p>
      </div>
    </div>
  );
}

export default EventComment;
