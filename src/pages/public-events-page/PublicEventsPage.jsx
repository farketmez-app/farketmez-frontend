import React from "react";
import "./public-events-page.css";
import EventList from "../../components/events-list/EventList";
import { fakeEvents } from "./constants";
import { eventsListTitle } from "./constants";

function PublicEventsPage() {
  return (
    <div className="public-events-page">
      <EventList
        events={fakeEvents}
        title={eventsListTitle}
        rightElement="dropdown"
      />
    </div>
  );
}

export default PublicEventsPage;
