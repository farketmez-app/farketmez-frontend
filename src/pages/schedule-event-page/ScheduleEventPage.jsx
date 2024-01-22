import React, { useContext, useEffect, useRef, useState } from "react";
import "./schedule-event-page.css";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import SelectBox from "../../components/select-box/SelectBox";
import { cost, pools, times, where } from "./constants";
import { ModalContext } from "../../context/ModalContext";
import { AppContext } from "../../context/AppContext";
import EventModalContent from "./components/event-modal-content/EventModalContent";

import SparksIcon from "../../assets/icons/sparks.svg";
import ViewHeroImage from "../../assets/images/people-enjoying-hero.png";
import DiscoverIcon from "../../assets/icons/discover.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const fakeFetchedData = {
  title: "Regülatorde Tavuk Mangal",
  rating: 3.3,
  where: "disarida", // disarida, iceride, mekanda
  cost: "orta", // ucuz, orta, pahali
  date: "14/12/2023", // format is dd/mm/yyyy
  time: "12:00 - 14:00", // format is either "all-day" or "start - end"
  googleMapsUrl: "https://maps.app.goo.gl/PbL7e9sGeTZ27NPm8",
  images: [
    "https://lh5.googleusercontent.com/p/AF1QipPmXfYh7kTSkuAu1wt4JpEsN_Aiytxw-_ehdKeS=w203-h152-k-no",
    "https://lh5.googleusercontent.com/p/AF1QipM5xecFMByEbfgJppLh9petcNKBxsu2eMZVc-te=w203-h270-k-no",
    "https://lh5.googleusercontent.com/p/AF1QipNEtvfm4_x_Zfp77yrxmEa7k3IUKytNuBlNnaCf=w203-h152-k-no",
  ],
};

function ScheduleEventPage() {
  const navigate = useNavigate();
  const { dispatch } = useContext(ModalContext);
  const { state } = useContext(AppContext);
  const [userHasAttendedEvents, setUserHasAttendedEvents] = useState(false);
  const [view, setView] = useState("farketmez"); // or 'algorithm' view
  const [value, onChange] = useState(new Date());
  const [time, setTime] = useState({ start: undefined, end: undefined });
  const [calendarOpened, setCalendarOpened] = useState(false);
  const [timeSelectorOpened, setTimeSelectorOpened] = useState(false);
  const [event, setEvent] = useState({
    where: [],
    cost: [],
    date: "Bugün",
    pool: [],
  });
  const timeSelectionRef = useRef();
  const [fetchedEvent, setFetchedEvent] = useState({});

  // http://localhost:8080/events/suggestedevent-withparams?place=home&cost=cheap&date=15.01.2024&time=&pool=my-events&id=2

  // check if user has attended any event before
  useEffect(() => {
    fetch(
      `http://localhost:8080/participants/by-user-id/${state.user.id}`
    ).then((res) => {
      if (res.status === 404) {
        setUserHasAttendedEvents(false);
        return null;
      }

      setUserHasAttendedEvents(true);
    });
  }, [state.user.id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        timeSelectionRef.current &&
        !timeSelectionRef.current.contains(event.target)
      ) {
        setTimeSelectorOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setTimeSelectorOpened(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if ((time.start && time.end && value) || time.allDay) {
      setEvent({
        ...event,
        date: `${value.getDate()}/${value.getMonth()}/${value.getFullYear()} ${
          time.start
        } - ${time.end}`,
      });

      const calendar = document.getElementsByClassName(
        "react-date-picker__wrapper"
      )[0];

      calendar.setAttribute("style", `border: 1px solid #6100ff;`);
    } else {
      const calendar = document.getElementsByClassName(
        "react-date-picker__wrapper"
      )[0];

      calendar.setAttribute("style", `border: 1px solid #ccc;`);
    }
  }, [time, value]);

  function handleFetchEvent() {
    const url =
      view === "farketmez"
        ? `http://localhost:8080/events/suggestedevent-withparams?place=outdoor&cost=expensive&date=24.01.2024&time=09-18&pool=public-events&id=2`
        : `http://localhost:8080/events/suggestedevent/${state.user.id}`;
    try {
      /**
      const [rawDate, timeRange] = event.date.split(" ");
      const [day, month, year] = rawDate
        .split("/")
        .map((part) => parseInt(part));

      const [startTime, endTime] = timeRange.split(" - ");

      // Ay değerini 1 artırarak tarih değerini oluşturalım
      const dateWithDots = `${day.toString().padStart(2, "0")}.${(month + 1)
        .toString()
        .padStart(2, "0")}.${year}`;
      const timeParam =
        startTime.substring(0, 2) + "-" + time.end.substring(0, 2);
      let placeParam =event.where[0].code;

      let costParam = event.cost[0].code;

      let poolParam = event.pool[0].code;

      console.log(`http://localhost:8080/events/suggestedevent-withparams?
      place=${placeParam}
      &cost=${costParam}
      &date=${dateWithDots}
      &time=${timeParam}
      &pool=${poolParam}
      &id=${state.user.id}`); */

      fetch(url)
        .then((res) => res.json())
        .then((event) => {
          dispatch({
            type: "SET_MODAL_CONTENT",
            payload: (
              <EventModalContent
                event={{
                  ...event,
                  images: [
                    "https://media-cdn.tripadvisor.com/media/photo-s/10/c4/23/16/highland-view-bed-and.jpg",
                    "https://media-cdn.tripadvisor.com/media/photo-s/10/c4/23/16/highland-view-bed-and.jpg",
                    "https://media-cdn.tripadvisor.com/media/photo-s/10/c4/23/16/highland-view-bed-and.jpg",
                  ],
                }}
              />
            ),
          });
          dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
          dispatch({
            type: "SET_MODAL_SHOULD_CLOSE_ON_OVERLAY_CLICK",
            payload: true,
          });
          dispatch({ type: "SET_MODAL_SHOULD_SHOW_LOGO", payload: false });
          dispatch({ type: "SET_MODAL_HAS_SPESIFIED_HEIGHT", payload: false });
        })
        .catch((err) => {
          toast("Bir Hatayla Karşılaştık 🤔", {
            position: "top-center",
            type: "error",
          });
        });
    } catch (error) {
      console.log(error);
    }

    /**
     Keep that to show if things go bad
const fetchDataPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(fakeFetchedData);
      }, 1000);
    });

    fetchDataPromise.then((data) => {
      dispatch({
        type: "SET_MODAL_CONTENT",
        payload: <EventModalContent event={data} />,
      });
      dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
      dispatch({
        type: "SET_MODAL_SHOULD_CLOSE_ON_OVERLAY_CLICK",
        payload: true,
      });
      dispatch({ type: "SET_MODAL_SHOULD_SHOW_LOGO", payload: false });
      dispatch({ type: "SET_MODAL_HAS_SPESIFIED_HEIGHT", payload: false });
    });
     */
  }

  console.log(event.where);

  return (
    <div className="schedule-event-page">
      <div className="schedule-event-page__view-switcher">
        <button
          onClick={() => setView("farketmez")}
          className={`schedule-event-page__view-switch-button ${
            view === "farketmez"
              ? "schedule-event-page__view-switch-button--active"
              : ""
          }`}
        >
          Farketmez
        </button>

        <button
          onClick={() => setView("algorithm")}
          className={`schedule-event-page__view-switch-button ${
            view === "algorithm"
              ? "schedule-event-page__view-switch-button--active"
              : ""
          }`}
        >
          Bana Uygun
        </button>
      </div>

      {view === "farketmez" && (
        <>
          <section className="schedule-event-page__section schedule-event-page__section--where">
            <p className="schedule-event-page__section__title">Nerede Olsun?</p>

            <div className="schedule-event-page__section__content">
              {where.map((item) => {
                return (
                  <div
                    key={item.name}
                    onClick={() => {
                      setEvent({ ...event, where: [item] });
                    }}
                    className="schedule-event-page__section-item--where"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`schedule-event-page__section-item__image ${
                        event.where.includes(item)
                          ? "schedule-event-page__section-item__image--selected"
                          : ""
                      }`}
                    />

                    <SelectBox
                      customClassname={`schedule-event-page__section-item__select-box`}
                      selectedOnes={event.where}
                      option={item}
                      toggleSelectBox={(option) => {
                        if (event.where.includes(option)) {
                          setEvent({
                            ...event,
                            where: event.where.filter(
                              (where) => where !== option
                            ),
                          });
                        } else {
                          setEvent({
                            ...event,
                            where: [...event.where, option],
                          });
                        }
                      }}
                      text={item.name}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          <section className="schedule-event-page__section schedule-event-page__section--cost">
            <p className="schedule-event-page__section__title">
              Maliyeti Nasıl Olsun?
            </p>

            <div className="schedule-event-page__section__content">
              {cost.map((item) => {
                return (
                  <div
                    key={item.name}
                    onClick={() => {
                      setEvent({ ...event, cost: [item] });
                    }}
                    className="schedule-event-page__section-item--where"
                  >
                    <SelectBox
                      customClassname={`schedule-event-page__section-item__select-box`}
                      selectedOnes={event.cost}
                      option={item}
                      toggleSelectBox={(option) => {
                        if (event.cost.includes(option)) {
                          setEvent({
                            ...event,
                            cost: event.cost.filter((c) => c !== option),
                          });
                        } else {
                          setEvent({ ...event, cost: [...event.cost, option] });
                        }
                      }}
                      text={item.name}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          <section className="schedule-event-page__section schedule-event-page__section--date">
            <p className="schedule-event-page__section__title">
              Ne Zaman Katılacaksın?
            </p>

            <div className="schedule-event-page__section__content">
              <div className="schedule-event-page__section-inner-content-date">
                <button
                  className={`schedule-event-page__section-item--date-today-button  ${
                    event.date === "Bugün"
                      ? "schedule-event-page__section-item--date-today-button--selected"
                      : ""
                  }`}
                  onClick={() => {
                    setEvent({ ...event, date: "Bugün" });
                    setTime({ start: undefined, end: undefined });
                    onChange(new Date());
                  }}
                >
                  Bugün
                </button>

                <p style={{ display: "flex", alignItems: "center" }}>
                  <span>veya</span>
                </p>
                <div className="schedule-event-page__section-inner-content-date__date-picker">
                  <DatePicker
                    onChange={onChange}
                    onCalendarOpen={() => {
                      setCalendarOpened(true);
                    }}
                    onCalendarClose={() => {
                      setCalendarOpened(false);
                    }}
                    value={value}
                    calendarIcon={
                      calendarOpened ? (
                        <i className="bi bi-arrow-down-short"></i>
                      ) : (
                        <i className="bi bi-arrow-up-short"></i>
                      )
                    }
                  />

                  <div className="schedule-event-page__section-inner-content-date__date-picker__time-selector">
                    <button
                      onClick={() => {
                        if (!timeSelectorOpened && time.start && time.end) {
                          setTime({ start: undefined, end: undefined });
                        }

                        setTimeSelectorOpened(!timeSelectorOpened);
                      }}
                      className="schedule-event-page__section-item--time-selector"
                      style={{
                        border:
                          (time.start && time.end) || time.allDay
                            ? "1px solid #6100ff"
                            : "1px solid #ccc",
                      }}
                    >
                      {(time.start && (
                        <span className="schedule-event-page__section-item--time-selector__start">
                          {time.start} - {time.end}
                        </span>
                      )) ||
                        "Tüm Gün"}
                      {!timeSelectorOpened ? (
                        <i className="bi bi-arrow-up-short"></i>
                      ) : (
                        <i className="bi bi-arrow-down-short"></i>
                      )}
                    </button>

                    {timeSelectorOpened && (
                      <div
                        ref={timeSelectionRef}
                        className="schedule-event-page__section-inner-content-date__date-picker__time-selector__options"
                      >
                        {times.map((item) => {
                          return (
                            <button
                              key={item}
                              style={{
                                backgroundColor:
                                  time.start === item || time.end === item
                                    ? "yellow"
                                    : "",
                                border:
                                  time.start &&
                                  time.end &&
                                  (Number(time.start.split(":")[0]) <
                                    Number(item.split(":")[0]) &&
                                  Number(time.end.split(":")[0]) >
                                    Number(item.split(":")[0])
                                    ? "1px solid #ccc"
                                    : ""),
                              }}
                              onClick={() => {
                                if (item === "Tüm Gün") {
                                  setTime({
                                    start: undefined,
                                    end: undefined,
                                    allDay: true,
                                  });
                                  setTimeSelectorOpened(false);
                                  return;
                                }

                                if (!time.start) {
                                  setTime({ ...time, start: item });
                                }

                                if (time.start && !time.end) {
                                  setTime({ ...time, end: item });
                                }
                              }}
                              className="schedule-event-page__section-inner-content-date__date-picker__time-selector__options__option"
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="schedule-event-page__section schedule-event-page__section--pool">
            <p className="schedule-event-page__section__title">
              Etkinlik Havuzunu Seç
            </p>

            <div className="schedule-event-page__section__content">
              {pools.map((item) => {
                return (
                  <div
                    key={item.name}
                    onClick={() => {
                      setEvent({ ...event, pool: [item] });
                    }}
                    className="schedule-event-page__section-item--where"
                  >
                    <SelectBox
                      customClassname={`schedule-event-page__section-item__select-box`}
                      selectedOnes={event.pool}
                      option={item}
                      toggleSelectBox={(option) => {
                        if (event.pool.includes(option)) {
                          setEvent({
                            ...event,
                            pool: event.pool.filter((pool) => pool !== option),
                          });
                        } else {
                          setEvent({ ...event, pool: [...event.pool, option] });
                        }
                      }}
                      text={item.name}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          <button
            disabled={
              event.where.length === 0 ||
              event.cost.length === 0 ||
              event.pool.length === 0
            }
            onClick={() => {
              handleFetchEvent();
            }}
            className="schedule-event-page__button"
          >
            <span>Etkinlik Bul</span>
            <img src={SparksIcon} alt="sparks" />
          </button>
        </>
      )}

      {view === "algorithm" && (
        <div className="schedule-event-page__section schedule-event-page__section--algorithm">
          <div className="schedule-event-page__section--algorithm-hero">
            <p className="schedule-event-page__section--algorithm-hero-title">
              Sana Özel Etkinliği Şimdi Keşfet
            </p>

            <img
              src={ViewHeroImage}
              className="schedule-event-page__section--algorithm-hero-image"
              alt="people enjoying"
            />
          </div>

          <button
            disabled={!userHasAttendedEvents}
            onClick={() => {
              handleFetchEvent();
            }}
            className="schedule-event-page__button"
          >
            <span>Etkinlik Bul</span>
            <img src={SparksIcon} alt="sparks" />
          </button>

          {!userHasAttendedEvents && (
            <div className="schedule-event-page__section--algorithm--no-attended-events">
              <p className="schedule-event-page__section--algorithm--no-attended-events-text">
                Seni daha yakından tanıyabilmemiz ve senin için en uygun
                etkinlikleri önerebilmemiz için ilk önce birkaç etkinliğe
                katılmanı öneriyoruz.
              </p>

              <button
                onClick={() => {
                  navigate("/public-events");
                }}
                className="schedule-event-page__button"
              >
                <span>Etkinlikleri Keşfet</span>
                <img src={DiscoverIcon} alt="discover" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ScheduleEventPage;
