import React, { useContext } from "react";
import "./event-list-header.css";
import PlusIcon from "../../assets/icons/plus.svg";
import { ModalContext } from "../../context/ModalContext";
import CreateEvent from "./components/create-event/CreateEvent";
import { useState } from "react";

import FilterIcon from "../../assets/icons/filter.png";

// right element is either an "add event button" or a filter dropdown
function EventListHeader({ title, rightElement }) {
  const { dispatch } = useContext(ModalContext);
  const [filter, setFilter] = useState({
    maliyet: ["Ucuz"],
    nerede: ["Mekanda"],
    oncelik: ["En Çok Katılım", "En İyi Derece"],
  });
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  function openAddEventModal() {
    dispatch({ type: "SET_MODAL_TITLE", payload: "Etkinlik Oluştur" });
    dispatch({ type: "SET_MODAL_SHOULD_SHOW_LOGO", payload: true });
    dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
    dispatch({ type: "SET_MODAL_SHOULD_CLOSE_ON_OVERLAY_CLICK", payload: true });

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
      if (filter[filterType].includes(filterValue)) {
        setFilter({
          ...filter,
          [filterType]: filter[filterType].filter(
            (item) => item !== filterValue
          ),
        });
      } else {
        setFilter({
          ...filter,
          [filterType]: [...filter[filterType], filterValue],
        });
      }
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
                    onClick={() => handleFilter("maliyet", "Ucuz")}
                    className={`event-list-header__dropdown-content--header-button ${
                      filter.maliyet.includes("Ucuz") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    Ucuz
                  </button>

                  <button
                    onClick={() => handleFilter("maliyet", "Orta")}
                    className={`event-list-header__dropdown-content--header-button ${
                      filter.maliyet.includes("Orta") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    Orta
                  </button>

                  <button
                    onClick={() => handleFilter("maliyet", "Pahalı")}
                    className={`event-list-header__dropdown-content--header-button ${
                      filter.maliyet.includes("Pahalı") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    Pahalı
                  </button>
                </div>

                <p className="event-list-header__dropdown-content--header-title">
                  Nerede
                </p>

                <div className="event-list-header__dropdown-content--header-buttons">
                  <button
                    onClick={() => handleFilter("nerede", "Mekanda")}
                    className={`event-list-header__dropdown-content--header-button ${
                      filter.nerede.includes("Mekanda") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    Mekanda
                  </button>

                  <button
                    onClick={() => handleFilter("nerede", "Dışarda")}
                    className={`event-list-header__dropdown-content--header-button ${
                      filter.nerede.includes("Dışarda") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    Dışarda
                  </button>

                  <button
                    onClick={() => handleFilter("nerede", "Evde")}
                    className={`event-list-header__dropdown-content--header-button ${
                      filter.nerede.includes("Evde") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    Evde
                  </button>
                </div>

                <p className="event-list-header__dropdown-content--header-title">
                  Öncelik
                </p>

                <div className="event-list-header__dropdown-content--header-buttons">
                  <button
                    onClick={() => handleFilter("oncelik", "En Çok Katılım")}
                    className={`event-list-header__dropdown-content--header-button ${
                      filter.oncelik.includes("En Çok Katılım") &&
                      "event-list-header__dropdown-content--header-button--active"
                    }`}
                  >
                    En Çok Katılım
                  </button>

                  <button
                    onClick={() => handleFilter("oncelik", "En İyi Derece")}
                    className={`event-list-header__dropdown-content--header-button ${
                      filter.oncelik.includes("En İyi Derece") &&
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

    if(!rightElement){
      return <div/>
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
