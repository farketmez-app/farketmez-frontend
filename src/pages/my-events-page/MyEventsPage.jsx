import React, { useContext, useEffect, useState } from "react";
import "./my-events-page.css";
import { eventsListTitle } from "./constants";
import EventList from "../../components/events-list/EventList";
import { AppContext } from "../../context/AppContext";

function MyEventsPage() {
  const [myEvents, setMyEvents] = useState([]);
  const [fetching, setfetching] = useState(false);
  const { state } = useContext(AppContext);

  useEffect(() => {
    setfetching(true);
    fetch(`http://localhost:8080/events/user-events?user-id=${state.user.id}`)
      .then((response) => {
        if (response.status === 404) {
          setMyEvents([]);
          setfetching(false);

          return;
        }

        return response.json();
      })
      .then((data) => {
        setMyEvents(data);
        setfetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state.user.id]);

  return (
    <div className="my-events-page">
      <EventList
        events={myEvents}
        title={eventsListTitle}
        rightElement="button"
        fetching={fetching}
        emptyListMessage={"Hiç etkinliğin yok. Hemen bir tane ekle"}
      />
    </div>
  );
}

export default MyEventsPage;
