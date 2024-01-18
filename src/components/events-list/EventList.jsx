import React from "react";
import "./event-list.css";
import EventListHeader from "../event-list-header/EventListHeader";
import EventListItem from "../event-list-item/EventListItem";

function EventList({ events, title, rightElement, fetching }) {
  function renderListOrMessage() {
    if (fetching || !events) return;

    if (events.length === 0) {
      return <p>Hiç Etkinlik Yok. Hemen bir tane ekle.</p>;
    } else {
      return events.map((event) => (
        <EventListItem key={event.id} event={event} />
      ));
    }
  }

  return (
    <div className="event-list">
      <EventListHeader title={title} rightElement={rightElement} />

      <div className="event-list__body">{renderListOrMessage()}</div>
    </div>
  );
}

export default EventList;
