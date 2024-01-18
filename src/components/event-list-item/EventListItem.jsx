import React from "react";
import "./event-list-item.css";
import RatingStars from "../../pages/near-events-page/components/rating-stars/RatingStars";

import LocationArrowIcon from "../../assets/icons/location-arrow.svg";
import LockIcon from "../../assets/icons/lock.png";
import CopyLinkButton from "./components/copy-link-button/CopyLinkButton";

function EventListItem({ event }) {
  //TODO: Make real requests in the following two functions after attending an event is done on backend side.
  function handleAttendToEvent() {
    console.log("attended");
  }

  function handleRedirectToGoogleMapsUrl() {
    console.log("redirecting to google maps url");
  }

  return (
    <div className="event-list-item">
      {event.isPrivate && <CopyLinkButton link={event.privateLink} />}
      <div
        className={`event-list-item__image-container 
      ${event.isPrivate ? "event-list-item__image-container--private" : ""}
      `}
      >
        {event.isPrivate && (
          <img
            src={LockIcon}
            alt="lock"
            className="event-list-item__image-lock"
          />
        )}
        <img
          src={
            "https://media-cdn.tripadvisor.com/media/photo-s/10/c4/23/16/highland-view-bed-and.jpg"
          }
          alt="event"
          className={`event-list-item__image ${
            event.isPrivate ? "event-list-item__image--private" : ""
          }`}
        />
      </div>

      <div className="event-list-item__body">
        <p className="event-list-item__title">{event.title}</p>

        <div className="event-list-item__stars">
          <RatingStars size="medium" rating={event.averageRating} />
        </div>

        <div className="event-list-item-buttons-container">
          <button
            onClick={handleAttendToEvent}
            className="event-list-item__attend-button"
          >
            Katıl
          </button>

          <button
            onClick={handleRedirectToGoogleMapsUrl}
            className="event-list-item__button"
          >
            Konuma Git
            <img
              src={LocationArrowIcon}
              alt="location-arrow"
              className="event-list-item__button-icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventListItem;
