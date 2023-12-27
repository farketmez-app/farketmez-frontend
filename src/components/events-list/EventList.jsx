import React from "react";
import "./event-list.css";
import EventListHeader from "../event-list-header/EventListHeader";
import EventListItem from "../event-list-item/EventListItem";



function EventList({ events, title, rightElement }) {
  return (
    <div className="event-list">
      <EventListHeader title={title} rightElement={rightElement} />

      <div className="event-list__body">
        {events.map((event) => (
          <EventListItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventList;
