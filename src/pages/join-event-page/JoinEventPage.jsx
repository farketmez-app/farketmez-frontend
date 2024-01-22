import React, { useEffect } from "react";
import "./join-event-page.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import EventListItem from "../../components/event-list-item/EventListItem";

function JoinEventPage() {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    fetch("http://localhost:8080/events")
      .then((res) => res.json())
      .then((events) => {
        events.forEach((e) => {
          if (e.accessKey === params.accessKey) {
            setEvent(e);

            return;
          }
        });
      })
      .then(() => {
        setFetching(false);
      })
      .catch((er) => console.log(er));
  }, [params.accessKey]);

  if (fetching) {
    return null;
  }

  return (
    <div className="join-event-page">
      <EventListItem event={event} />
    </div>
  );
}

export default JoinEventPage;
