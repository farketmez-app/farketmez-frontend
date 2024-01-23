import { useEffect, useContext } from "react";
import "./event-popup.css";
import EventPreview from "../../components/event-preview/EventPreview";
import EventsList from "../../components/events-list/EventsList";
import { NearEventsContext } from "../../context/nearEventsContext";

import CloseIcon from "../../../../assets/icons/close.png";

function EventPopup({ eventContainerRef, marker, setShouldShowEventPopup }) {
  const { state, dispatch } = useContext(NearEventsContext);

  const hasMoreThanOneEvent = marker.events.length > 1;

  useEffect(() => {
    return () => {
      dispatch({ type: "SET_PLAIN_EVENT_WANTED_TO_BE_SEEN", payload: null });
    };
  }, [dispatch]);

  return (
    <div ref={eventContainerRef} className="event-popup">
      <button
        className="event-popup__close-btn"
        onClick={() => {
          setShouldShowEventPopup(false);
        }}
      >
        <img
          src={CloseIcon}
          alt="cross"
          className="event-popup__close-btn-icon"
        />
      </button>
      {hasMoreThanOneEvent && !state.plainEventWantedToBeSeen && (
        <p className="event-popup__title">
          Seçilen konumda {marker.events.length} etkinlik bulundu.
        </p>
      )}
      {hasMoreThanOneEvent && !state.plainEventWantedToBeSeen && (
        <EventsList events={marker.events} />
      )}

      {hasMoreThanOneEvent && state.plainEventWantedToBeSeen && (
        <EventPreview event={state.plainEventWantedToBeSeen} />
      )}

      {!hasMoreThanOneEvent && <EventPreview event={marker.events[0]} />}
    </div>
  );
}

export default EventPopup;
