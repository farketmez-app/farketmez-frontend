import React from "react";
import "./my-events-page.css";
import EventListHeader from "../../components/event-list-header/EventListHeader";
import { eventsListTitle, fakeEvents } from "./constants";
import EventList from "../../components/events-list/EventList";

function MyEventsPage() {
  return (
    <div className="my-events-page">
      <EventList
        events={fakeEvents}
        title={eventsListTitle}
        rightElement="button"
      />
    </div>
  );
}

export default MyEventsPage;
