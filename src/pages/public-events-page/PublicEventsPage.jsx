import React, { useEffect, useState } from "react";
import "./public-events-page.css";
import EventList from "../../components/events-list/EventList";
import { eventsListTitle } from "./constants";

function PublicEventsPage() {
  const [events, setEvents] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    // TODO: CHANGE THIS WITH /public-events
    fetch("http://localhost:8080/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setFetching(false);
      });
  }, []);

  return (
    <div className="public-events-page">
      <EventList
        events={events}
        title={eventsListTitle}
        rightElement="dropdown"
        fetching={fetching}
        listItemType="standard"
      />
    </div>
  );
}

export default PublicEventsPage;
