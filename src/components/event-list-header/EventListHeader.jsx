import React, { useContext } from "react";
import "./event-list-header.css";
import PlusIcon from "../../assets/icons/plus.svg";
import { ModalContext } from "../../context/ModalContext";
import CreateEvent from "./components/create-event/CreateEvent";
import { useState } from "react";

import FilterIcon from "../../assets/icons/filter.png";
import EventsContext from "../../pages/public-events-page/context";

// right element is either an "add event button" or a filter dropdown
function EventListHeader({ title, rightElement }) {
  const { state, dispatch: eventsDispatch } = useContext(EventsContext);
  const { dispatch } = useContext(ModalContext);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  function openAddEventModal() {
    dispatch({ type: "SET_MODAL_TITLE", payload: "Etkinlik Oluştur" });
    dispatch({ type: "SET_MODAL_SHOULD_SHOW_LOGO", payload: true });
    dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
    dispatch({
      type: "SET_MODAL_SHOULD_CLOSE_ON_OVERLAY_CLICK",
      payload: true,
    });

    dispatch({
      type: "SET_MODAL_CONTENT",
      payload: <CreateEvent />,
    });
  }

  function renderRightElement() {
    if (rightElement === "button") {
      return (
        <button
          onClick={openAddEventModal}
          className="event-list-header__button"
        >
          <img
            src={PlusIcon}
            alt="plus icon"
            className="event-list-header__button-icon"
          />
        </button>
      );
    }

    function handleFilter(filterType, filterValue) {
      eventsDispatch({
        type: "SET_FILTERING",
        payload: {
          ...state.filtering,
          [filterType]: filterValue,
        },
      });
    }

    if (rightElement === "dropdown") {
      return (
        <div className="event-list-header__dropdown">
          <button
            className="event-list-header__dropdown-button"
            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
          >
            Filtrele{" "}
            <img
              src={FilterIcon}
              alt="filter icon"
              className="event-list-header__dropdown-button-icon"
            />
          </button>

          {filterDropdownOpen && (
            <div className="event-list-header__dropdown-content">
              <div className="event-list-header__dropdown-content--header">
                <p className="event-list-header__dropdown-content--header-title">
                  Maliyet
                </p>

                <div className="event-list-header__dropdown-content--header-buttons">
                  <button
                    onClick={() => handleFilter("cost", "cheap")}
                    className={`event-list-header__dropdown-content--header-button ${
                      state.filtering.cost.includes("cheap") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    Ucuz
                  </button>

                  <button
                    onClick={() => handleFilter("cost", "mid")}
                    className={`event-list-header__dropdown-content--header-button ${
                      state.filtering.cost.includes("mid") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    Orta
                  </button>

                  <button
                    onClick={() => handleFilter("cost", "expensive")}
                    className={`event-list-header__dropdown-content--header-button ${
                      state.filtering.cost.includes("expensive") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    Pahalı
                  </button>

                  <button
                    onClick={() => handleFilter("cost", "all")}
                    className={`event-list-header__dropdown-content--header-button ${
                      state.filtering.cost.includes("all") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    Hepsi
                  </button>
                </div>

                <p className="event-list-header__dropdown-content--header-title">
                  Nerede
                </p>

                <div className="event-list-header__dropdown-content--header-buttons">
                  <button
                    onClick={() => handleFilter("place", "place")}
                    className={`event-list-header__dropdown-content--header-button ${
                      state.filtering.place.includes("place") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    Mekanda
                  </button>

                  <button
                    onClick={() => handleFilter("place", "outdoor")}
                    className={`event-list-header__dropdown-content--header-button ${
                      state.filtering.place.includes("outdoor") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    Dışarda
                  </button>

                  <button
                    onClick={() => handleFilter("place", "home")}
                    className={`event-list-header__dropdown-content--header-button ${
                      state.filtering.place.includes("home") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    Evde
                  </button>

                  <button
                    onClick={() => handleFilter("place", "all")}
                    className={`event-list-header__dropdown-content--header-button ${
                      state.filtering.place.includes("all") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    Hepsi
                  </button>
                </div>

                <p className="event-list-header__dropdown-content--header-title">
                  Öncelik
                </p>

                <div className="event-list-header__dropdown-content--header-buttons">
                  <button
                    onClick={() => handleFilter("priority", "attendance")}
                    className={`event-list-header__dropdown-content--header-button ${
                      state.filtering.priority.includes("attendance") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    En Çok Katılım
                  </button>

                  <button
                    onClick={() => handleFilter("priority", "rating")}
                    className={`event-list-header__dropdown-content--header-button ${
                      state.filtering.priority.includes("rating") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    En İyi Derece
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (!rightElement) {
      return <div />;
    }
  }

  return (
    <div className="event-list-header">
      <p className="event-list-header__title">{title}</p>

      {renderRightElement()}
    </div>
  );
}

export default EventListHeader;
