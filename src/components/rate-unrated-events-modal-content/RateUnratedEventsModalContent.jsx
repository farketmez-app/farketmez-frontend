import React from "react";
import "./rate-unrated-events-modal-content.css";
import UnratedEvent from "./components/unrated-event/UnratedEvent";

function RateUnratedEventsModalContent({ events }) {
  return (
    <div className="rate-unrated-events-modal-content">
      {events.map((event) => <UnratedEvent event={event.event} />)}
    </div>
  );
}

export default RateUnratedEventsModalContent;
