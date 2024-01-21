import React, { useContext, useEffect, useRef, useState } from "react";
import "./schedule-event-page.css";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import SelectBox from "../../components/select-box/SelectBox";
import { cost, pools, times, where } from "./constants";

import SparksIcon from "../../assets/icons/sparks.svg";
import { ModalContext } from "../../context/ModalContext";
import EventModalContent from "./components/event-modal-content/EventModalContent";

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
  const { dispatch } = useContext(ModalContext);
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
    let fetchedEvent = {};

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
  }

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
                      if (event.where.includes(item)) {
                        setEvent({
                          ...event,
                          where: event.where.filter((where) => where !== item),
                        });
                      } else {
                        setEvent({ ...event, where: [...event.where, item] });
                      }
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
                      if (event.cost.includes(item)) {
                        setEvent({
                          ...event,
                          cost: event.cost.filter((c) => c !== item),
                        });
                      } else {
                        setEvent({ ...event, cost: [...event.cost, item] });
                      }
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
                        <i class="bi bi-arrow-down-short"></i>
                      ) : (
                        <i class="bi bi-arrow-up-short"></i>
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
                        <i class="bi bi-arrow-up-short"></i>
                      ) : (
                        <i class="bi bi-arrow-down-short"></i>
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
                      if (event.pool.includes(item)) {
                        setEvent({
                          ...event,
                          pool: event.pool.filter((pool) => pool !== item),
                        });
                      } else {
                        setEvent({ ...event, pool: [...event.pool, item] });
                      }
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
        </>
      )}

      {
        view === "algorithm" // TODO: return other view here}
      }
      
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
    </div>
  );
}

export default ScheduleEventPage;
