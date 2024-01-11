import React, { useContext, useEffect, useState } from "react";
import "./public-events-page.css";
import EventList from "../../components/events-list/EventList";
import { eventsListTitle } from "./constants";
import { AppContext } from "../../context/AppContext";

function PublicEventsPage() {
  const { state } = useContext(AppContext);
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
      />
    </div>
  );
}

export default PublicEventsPage;
