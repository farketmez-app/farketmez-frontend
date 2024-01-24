import React, { useContext, useEffect, useState } from "react";
import "./event-list-item.css";
import RatingStars from "../../pages/near-events-page/components/rating-stars/RatingStars";

import LocationArrowIcon from "../../assets/icons/location-arrow.svg";
import LockIcon from "../../assets/icons/lock.png";
import CopyLinkButton from "./components/copy-link-button/CopyLinkButton";
import { AppContext } from "../../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ModalContext } from "../../context/ModalContext";
import EventLocationModalContent from "../event-location-modal-content/EventLocationModalContent";

function EventListItem({ event }) {
  const { dispatch } = useContext(ModalContext);
  const location = useLocation();
  const { state } = useContext(AppContext);
  const [eventsThatUserJoins, setEventsThatUserJoins] = useState([]);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!event) return;
    const dateObject = new Date(event.date);

    dateObject.setHours(dateObject.getHours() - 3);

    const optionsDate = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("tr-TR", optionsDate).format(
      dateObject
    );
    const optionsTime = { hour: "2-digit", minute: "2-digit" };
    const formattedTime = new Intl.DateTimeFormat("tr-TR", optionsTime).format(
      dateObject
    );

    setDate(formattedDate);
    setTime(formattedTime);
  }, [event]);

  useEffect(() => {
    if (eventsThatUserJoins.length > 0) return;

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
    const googleMapsUrl = event.location.googleMapsUrl;
    let lat, lng;

    if (googleMapsUrl) {
      const match = googleMapsUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

      if (match) {
        lat = parseFloat(match[1]);
        lng = parseFloat(match[2]);
      } else {
        console.error("Latitude ve longitude bilgileri bulunamadı.");
      }
    } else {
      lat = event.location.latitude;
      lng = event.location.longitude;
    }

    dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
    dispatch({
      type: "SET_MODAL_SHOULD_CLOSE_ON_OVERLAY_CLICK",
      payload: true,
    });
    dispatch({ type: "SET_MODAL_TITLE", payload: "" });
    dispatch({ type: "SET_MODAL_HAS_SPESIFIED_HEIGHT", payload: false });

    dispatch({
      type: "SET_MODAL_CONTENT",
      payload: (
        <EventLocationModalContent
          lat={lat}
          lng={lng}
          googleMapsUrl={googleMapsUrl}
        />
      ),
    });
    dispatch({ type: "SET_MODAL_SHOULD_SHOW_LOGO", payload: false });
  }

  if (fetching) {
    return null;
  }

  return (
    <div className={`event-list-item ${event.date < new Date().toISOString() ? "event-list-item--past" : ""}`}>
      {event.isPrivate && (
        <CopyLinkButton
          link={`http://localhost:3000/join/${event.accessKey}`}
        />
      )}
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
        <div className="event-list-item__heading">
          <p className="event-list-item__title">{event.title}</p>

          <div className="event-list-item__heading__date-container">
            <p className="event-list-item__heading__date">{date}</p>

            <p className="event-list-item__heading__date">{time}</p>
          </div>
        </div>

        <div className="event-list-item__stars">
          <RatingStars size="medium" rating={event.averageRating} />
        </div>

        <div className="event-list-item-buttons-container">
          {location.pathname === "/my-events" ||
          event.date < new Date().toISOString() ? null : (
            <button
              disabled={eventsThatUserJoins.includes(event.id)}
              onClick={handleAttendToEvent}
              className="event-list-item__attend-button"
            >
              {eventsThatUserJoins.includes(event.id)
                ? "Katılıyorsun"
                : "Katıl"}
            </button>
          )}

          <button
            onClick={handleRedirectToGoogleMapsUrl}
            className="event-list-item__button"
          >
            Konumu Gör
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
