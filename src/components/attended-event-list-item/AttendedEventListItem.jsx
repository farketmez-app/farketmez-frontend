import React, { useContext, useState } from "react";
import "./attended-event-list-item.css";
import RatingStars from "../../pages/near-events-page/components/rating-stars/RatingStars";
import LocationArrowIcon from "../../assets/icons/location-arrow.svg";
import { formatDateTime } from "../../core/utils";

import StarFilled from "../../assets/icons/star-filled-orange.svg";
import StarUnfilled from "../../assets/icons/star-unfilled-orange.svg";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

// attendedListItemType is "eventsNotRatedNotExpired" or "eventsNotRatedExpired" or "eventsRatedExpired"
function AttendedEventListItem({ event, attendedListItemType }) {
  const { state } = useContext(AppContext);
  const [stars, setStars] = useState(0);

  function handleRedirectToGoogleMapsUrl() {}

  function renderActionAreaElement() {
    switch (attendedListItemType) {
      case "eventsNotRatedNotExpired":
        return (
          <div className="action-area-element">
            <p className="action-area-element-title">Etkinlik Tarihi</p>

            <p className="action-area-element-date">
              {formatDateTime(event.date)}
            </p>
          </div>
        );

      case "eventsNotRatedExpired":
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
          }).then(()=>{
            toast("Etkinlik Puanlandı 🌟",{
              type:'success',
              position:'top-center'
            })
          })
        }

        return (
          <div className="action-area-element">
            <p className="action-area-element-title">Etkinliği Değerlendir</p>

            <div className="action-area-element_rating-container">
              <div className="action-area-element_rating-stars">
                {Array.from(Array(5).keys()).map((index) => (
                  <button
                    key={index}
                    className="action-area-element_rating-star"
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
              disabled={stars===0}
                onClick={rateEvent}
                className="action-area-element_rating-rate-button"
              >
                Puanla
              </button>
            </div>
          </div>
        );

      case "eventsRatedExpired":
        return <div className="action-area-element"></div>;

      default:
        break;
    }
  }

  return (
    <div className={`attended-event-list-item event-list-item`}>
      <div className="attended-event-list-item-container">
        <div className={`event-list-item__image-container`}>
          <img
            src={
              "https://media-cdn.tripadvisor.com/media/photo-s/10/c4/23/16/highland-view-bed-and.jpg"
            }
            alt="event"
            className={`event-list-item__image`}
          />
        </div>

        <div className="event-list-item__body">
          <p className="event-list-item__title">{event.title}</p>

          <div className="event-list-item__stars">
            <RatingStars size="medium" rating={event.averageRating} />
          </div>

          <div className="event-list-item-buttons-container">
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

      <div className="attended-event-list-item-action-area">
        {renderActionAreaElement()}
      </div>
    </div>
  );
}

export default AttendedEventListItem;