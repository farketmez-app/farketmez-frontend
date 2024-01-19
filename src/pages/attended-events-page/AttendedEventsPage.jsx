import React, { useContext, useEffect, useState } from "react";
import "./attended-events-page.css";
import EventList from "../../components/events-list/EventList";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function AttendedEventsPage() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const [fetching, setFetching] = useState(true);
  const [eventsRatedExpired, setEventsRatedExpired] = useState([]);
  const [eventsNotRatedExpired, setEventsNotRatedExpired] = useState([]);
  const [eventsNotRatedNotExpired, setEventsNotRatedNotExpired] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getData() {
    const fetchingRatedExpiredEvents = fetch(
      `http://localhost:8080/participants/attended-rated-expired-events/${state.user.id}`
    ).then((res) => res.json());

    const fetchingNotRatedExpiredEvents = fetch(
      `http://localhost:8080/participants/attended-not-rated-expired-events/${state.user.id}`
    ).then((res) => res.json());

    const fetchingNotRatedNotExpiredEvents = fetch(
      `http://localhost:8080/participants/attended-not-rated-not-expired-events/${state.user.id}`
    ).then((res) => res.json());

    Promise.all([
      fetchingRatedExpiredEvents,
      fetchingNotRatedExpiredEvents,
      fetchingNotRatedNotExpiredEvents,
    ])
      .then((results) => {
        const ratedExpiredEvents = results[0];
        const notRatedExpiredEvents = results[1];
        const notRatedNotExpiredEvents = results[2];

        setEventsNotRatedExpired(notRatedExpiredEvents);
        setEventsRatedExpired(ratedExpiredEvents);
        setEventsNotRatedNotExpired(notRatedNotExpiredEvents);

        setFetching(false);
      })
      .catch((error) => {
        console.error("Hata oluştu:", error);
      });
  }

  useEffect(() => {
    getData();
  }, [state.user.id]);

  return (
    <div className="attended-events-page">
      <div className="attended-events-page-heading">
        <button
          onClick={() => navigate(-1)}
          className="attended-events-page__go-back-button"
        >
          ⬅ Geri dön
        </button>

        <button
          onClick={getData}
          className="attended-events-page__go-back-button"
        >
          Yenile
        </button>
      </div>

      <EventList
        emptyListMessage={"Yakın tarihli bir etkinliğe kayıt olmadın 🙄"}
        events={eventsNotRatedNotExpired}
        title={"Yaklaşan Etkinlikler"}
        rightElement={null}
        fetching={fetching}
        listItemType="attended"
        attendedListItemType="eventsNotRatedNotExpired"
      />

      <EventList
        emptyListMessage={"Katıldığın bütün etkinlikleri puanladın 🤩"}
        events={eventsNotRatedExpired}
        title={"Puanlanmamış Etkinlikler"}
        rightElement={null}
        fetching={fetching}
        listItemType="attended"
        attendedListItemType="eventsNotRatedExpired"
      />

      <EventList
        emptyListMessage={"Katıldığın etkinlikleri puanlamadın 🤔"}
        events={eventsRatedExpired}
        title={"Puanladığın Etkinlikler"}
        rightElement={null}
        fetching={fetching}
        listItemType="attended"
        attendedListItemType="eventsRatedExpired"
      />
    </div>
  );
}

export default AttendedEventsPage;
