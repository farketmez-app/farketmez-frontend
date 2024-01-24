import React, { useContext, useEffect, useState } from "react";
import "./public-events-page.css";
import EventList from "../../components/events-list/EventList";
import { eventsListTitle } from "./constants";
import SearchBar from "./components/search-bar/SearchBar";
import EventsContext, { EventsProvider } from "./context";

function PublicEventsPage() {
  const { state, dispatch } = useContext(EventsContext);
  const [events, setEvents] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    fetch("http://localhost:8080/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let filteredEvents = [];
        data.forEach((event) => {
          if (!event.isPrivate) {
            filteredEvents.push(event);
          }
        });

        setEvents(filteredEvents);
        dispatch({ type: "SET_EVENTS", payload: filteredEvents });
        setFetching(false);
      });
  }, []);

  useEffect(() => {
    if (!state.searching) {
      dispatch({ type: "SET_EVENTS", payload: events });
    }
  }, [state.searching]);

  return (
    <div className="public-events-page">
      <SearchBar />
      <EventList
        events={state.events}
        title={eventsListTitle}
        rightElement="dropdown"
        fetching={fetching}
        listItemType="standard"
      />
    </div>
  );
}

export default PublicEventsPage;
