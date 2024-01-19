import React from "react";
import "./event-list.css";
import EventListHeader from "../event-list-header/EventListHeader";
import EventListItem from "../event-list-item/EventListItem";
import AttendedEventListItem from "../attended-event-list-item/AttendedEventListItem";

// listItemType is 'standard' or 'attended'
function EventList({
  events,
  title,
  rightElement,
  fetching,
  listItemType = "standart",
  attendedListItemType,
  emptyListMessage
}) {
  function renderListOrMessage() {
    if (fetching || !events) return;

    if (events.length === 0) {
      return <p className="emptyListMessage">
        {emptyListMessage}
      </p>;
    } else {
      return events.map((event) =>
        listItemType === "standard" ? (
          <EventListItem key={event.id} event={event} />
        ) : (
          <AttendedEventListItem key={event.id} event={event} attendedListItemType={attendedListItemType} />
        )
      );
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
