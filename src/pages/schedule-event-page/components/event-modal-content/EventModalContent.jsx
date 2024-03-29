import React, { useContext } from "react";
import "./event-modal-content.css";

// image assets
import StarFilledIcon from "../../../../assets/icons/star-filled.svg";
import StarUnfilledIcon from "../../../../assets/icons/star-unfilled.svg";
import StarHalffilledIcon from "../../../../assets/icons/star-halffilled.svg";
import LocationArrowIcon from "../../../../assets/icons/location-arrow.svg";
import TickIcon from "../../../../assets/icons/tick.svg";
import { AppContext } from "../../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../../../context/ModalContext";
import EventLocationModalContent from "../../../../components/event-location-modal-content/EventLocationModalContent";

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
  const { dispatch } = useContext(ModalContext);
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(event)
  const whereFormatted =
    event.cost === "outdoor" ? "Dışarda" : event.cost === "home" ? "Evde" : "Mekanda";
  const costFormatted =
    event.cost === "cheap" ? "Ucuz" : event.cost === "mid" ? "Orta" : "Pahalı";

  //TODO: Make real requests in the following two functions after attending an event is done on backend side.
  function handleAttendEvent() {
    fetch(
      `http://localhost:8080/events/join?userId=${state.user.id}&eventId=${event.id}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.status)
      .then((code) => {
        if (code === 201) {
          dispatch({ type: "RESET_MODAL" });

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

      <div className="event-modal-content__buttons-container">
        <button
          onClick={handleAttendEvent}
          className="event-modal-content__attend-button"
        >
          Katıl
        </button>

        <button
          onClick={handleRedirectToGoogleMapsUrl}
          className="event-modal-content__button"
        >
          Konumu Gör
          <img
            src={LocationArrowIcon}
            alt="location-arrow"
            className="event-modal-content__button--icon"
          />
        </button>
      </div>
    </div>
  );
}

export default EventModalContent;
