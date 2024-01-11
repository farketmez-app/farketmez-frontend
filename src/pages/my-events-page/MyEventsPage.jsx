import React, { useEffect, useState } from "react";
import "./my-events-page.css";
import EventListHeader from "../../components/event-list-header/EventListHeader";
import { eventsListTitle, fakeEvents } from "./constants";
import EventList from "../../components/events-list/EventList";

function MyEventsPage() {
  const [myEvents, setMyEvents] = useState([]);
  const [fetching, setfetching] = useState(false);

  useEffect(() => {
    setfetching(true);
    fetch("http://localhost:8080/events/user-events?user-id=1")
      .then((response) => response.json())
      .then((data) => {
        setMyEvents(data);
        setfetching(false);
      });
  }, []);

  console.log(myEvents);

  return (
    <div className="my-events-page">
      <EventList
        events={myEvents}
        title={eventsListTitle}
        rightElement="button"
        fetching={fetching}
      />
    </div>
  );
}

export default MyEventsPage;
