import React, { useContext, useEffect, useState } from "react";
import "./event-list-item.css";
import RatingStars from "../../pages/near-events-page/components/rating-stars/RatingStars";

import LocationArrowIcon from "../../assets/icons/location-arrow.svg";
import LockIcon from "../../assets/icons/lock.png";
import CopyLinkButton from "./components/copy-link-button/CopyLinkButton";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function EventListItem({ event }) {
  const { state } = useContext(AppContext);
  const [eventsThatUserJoins, setEventsThatUserJoins] = useState([]);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/participants/by-user-id/${state.user.id}`)
      .then((res) => {
        if (res.status !== 200) {
          return [];
        } else {
          return res.json();
        }
      })
      .then((events) => {
        const eventIds = events
          .filter((item) => item.event && item.event.id) // event özelliği olan ve event id'ye sahip olanları filtrele
          .map((item) => item.event.id);

        setEventsThatUserJoins(eventIds);

        setFetching(false);
      });
  }, [state.user.id]);

  function handleAttendToEvent() {
    fetch(
      `http://localhost:8080/events/join?userId=${state.user.id}&eventId=${event.id}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.status)
      .then((code) => {
        if (code === 201) {
          setEventsThatUserJoins((prev) => [...prev, event.id]);

          navigate("/attended-events");
        } else {
          console.log("hata", code);
        }
      });
  }

  function handleRedirectToGoogleMapsUrl() {
    console.log("redirecting to google maps url");
  }

  if (fetching) {
    return null;
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
            disabled={eventsThatUserJoins.includes(event.id)}
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
