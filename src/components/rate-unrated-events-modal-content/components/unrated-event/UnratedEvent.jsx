/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useState } from "react";
import './unrated-event.css'

import StarFilled from "../../../../assets/icons/star-filled-orange.svg";
import StarUnfilled from "../../../../assets/icons/star-unfilled-orange.svg";
import { toast } from "react-toastify";
import { AppContext } from "../../../../context/AppContext";

function UnratedEvent({ event }) {
  const { state } = useContext(AppContext);
  const [stars, setStars] = useState(0);

  function handleStarClick(index) {
    setStars(index + 1);
  }

  function rateEvent() {
    fetch("http://localhost:8080/participants/rate-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: state.user.id,
        eventId: event.id,
        rate: stars,
      }),
    }).then(() => {
      toast("Etkinlik Puanlandı 🌟", {
        type: "success",
        position: "top-center",
      });
    });
  }

  return (
    <div className="unrated-event">
      <div className="unrated-events__images-container">
        <img
          className="unrated-events-image unrated-events-image--1"
          src="https://media-cdn.tripadvisor.com/media/photo-s/10/c4/23/16/highland-view-bed-and.jpg"
        />
        <img
          className="unrated-events-image unrated-events-image--2"
          src="https://media-cdn.tripadvisor.com/media/photo-s/10/c4/23/16/highland-view-bed-and.jpg"
        />
        <img
          className="unrated-events-image unrated-events-image--3"
          src="https://media-cdn.tripadvisor.com/media/photo-s/10/c4/23/16/highland-view-bed-and.jpg"
        />
      </div>

      <p className="unrated-event-title">{event.title}</p>

      <div className="unrated-event_rating-container">
        <div className="unrated-event_rating-stars">
          {Array.from(Array(5).keys()).map((index) => (
            <button
              key={index}
              className="unrated-event_rating-star"
              onClick={() => handleStarClick(index)}
            >
              {index < stars ? (
                <img src={StarFilled} alt="Filled Star" />
              ) : (
                <img src={StarUnfilled} alt="Unfilled Star" />
              )}
            </button>
          ))}
        </div>

        <button
          disabled={stars === 0}
          onClick={rateEvent}
          className="unrated-event_rating-rate-button"
        >
          Puanla
        </button>
      </div>
    </div>
  );
}

export default UnratedEvent;
