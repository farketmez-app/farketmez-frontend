import React from "react";
import "./event-modal-content.css";

// image assets
import StarFilledIcon from "../../../../assets/icons/star-filled.svg";
import StarUnfilledIcon from "../../../../assets/icons/star-unfilled.svg";
import StarHalffilledIcon from "../../../../assets/icons/star-halffilled.svg";
import LocationArrowIcon from "../../../../assets/icons/location-arrow.svg";
import TickIcon from "../../../../assets/icons/tick.svg";

function renderStars(rating) {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (rating >= 1) {
      stars.push(<img src={StarFilledIcon} alt="star" />);
    }

    if (rating < 1 && rating > 0) {
      stars.push(<img src={StarHalffilledIcon} alt="star" />);
    }

    if (rating <= 0) {
      stars.push(<img src={StarUnfilledIcon} alt="star" />);
    }

    rating--;
  }

  return stars;
}

function EventModalContent({ event }) {
  const whereFormatted = event.where === "disarida" ? "Dışarıda" : "İçeride";
  const costFormatted =
    event.cost === "ucuz" ? "Ucuz" : event.cost === "orta" ? "Orta" : "Pahalı";

  return (
    <div className="event-modal-content">
      <div className="event-modal-content__images">
        <div className="event-modal-content__images--left">
          <img
          key={event.images[0]}
          referrerpolicy="no-referrer"
            src={event.images[0]}
            alt="event"
            className="event-modal-content__images--left--image"
          />
        </div>

        <div className="event-modal-content__images--right">
          <img
          key={event.images[1]}
          referrerpolicy="no-referrer"
            src={event.images[1]}
            alt="event"
            className="event-modal-content__images--right--image"
          />

          <img
          key={event.images[2]}
          referrerpolicy="no-referrer"
            src={event.images[2]}
            alt="event"
            className="event-modal-content__images--right--image"
          />
        </div>
      </div>

      <div className="event-modal-content__info">
        <div className="event-modal-content__rating">
          {renderStars(event.rating)}
        </div>

        <div className="event-modal-content__info__where-cost">
          <div className="event-modal-content__info__where-cost--where">
            {whereFormatted}

            <img src={TickIcon} alt="tick" />
          </div>

          <div className="event-modal-content__info__where-cost--cost">
            {costFormatted}

            <img src={TickIcon} alt="tick" />
          </div>
        </div>
      </div>

      <div className="event-modal-content__title">{event.title}</div>

      <button
        onClick={() => window.open(event.googleMapsUrl)}
        className="event-modal-content__button"
      >
        Konuma Git
        <img
          src={LocationArrowIcon}
          alt="location-arrow"
          className="event-modal-content__button--icon"
        />
      </button>
    </div>
  );
}

export default EventModalContent;
