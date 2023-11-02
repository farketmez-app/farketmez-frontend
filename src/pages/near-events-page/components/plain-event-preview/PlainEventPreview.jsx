import React, { useContext } from "react";
import "./plain-event-preview.css";
import TickIcon from "../../../../assets/icons/tick.svg";

import { NearEventsContext } from "../../context/nearEventsContext";
import RatingStars from "../rating-stars/RatingStars";

function PlainEventPreview({ event }) {
  const { dispatch } = useContext(NearEventsContext);

  const handleSetEventWantedToBeSeen = () => {
    dispatch({ type: "SET_PLAIN_EVENT_WANTED_TO_BE_SEEN", payload: event });
  };
  return (
    <button
      onClick={handleSetEventWantedToBeSeen}
      className="plain-event-preview"
    >
      <div className="plain-event-preview__container">
        <img
          className="plain-event-preview__image"
          src={event.images[0]}
          alt={event.title}
        />

        <div className="plain-event-preview__content">
          <p className="plain-event-preview__title">{event.title}</p>

          <div className="plain-event-preview__rating">
            <RatingStars rating={event.rating} />
          </div>

          <div className="plain-event-preview__where-and-cost-info">
            <p className="plain-event-preview__where-and-cost-info-text">
              {event.where}

              <img
                className="plain-event-preview__where-and-cost-info-icon"
                src={TickIcon}
                alt="tick icon"
              />
            </p>

            <p className="plain-event-preview__where-and-cost-info-text">
              {event.cost}

              <img
                className="plain-event-preview__where-and-cost-info-icon"
                src={TickIcon}
                alt="tick icon"
              />
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default PlainEventPreview;
