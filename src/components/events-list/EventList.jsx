import React from "react";
import "./event-list.css";
import EventListHeader from "../event-list-header/EventListHeader";
import EventListItem from "../event-list-item/EventListItem";

function EventList({ events, title, rightElement, fetching }) {
  function renderLoadingSkeleton() {
    return (
      <div className="event-list__body--skeleton">
        <div className="event-list__body--skeleton-item"></div>

        <div className="event-list__body--skeleton-item"></div>

        <div className="event-list__body--skeleton-item"></div>
      </div>
    );
  }
  return (
    <div className="event-list">
      <EventListHeader title={title} rightElement={rightElement} />

      <div className="event-list__body">
        {fetching
          ? renderLoadingSkeleton()
          : events.map((event) => (
              <EventListItem key={event.id} event={event} />
            ))}
      </div>
    </div>
  );
}

export default EventList;
