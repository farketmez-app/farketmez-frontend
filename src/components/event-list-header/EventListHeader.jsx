import React from "react";
import "./event-list-header.css";
import PlusIcon from "../../assets/icons/plus.svg";

// right element is either an "add event button" or a filter dropdown
function EventListHeader({ title, rightElement }) {
  function handle() {}

  function renderRightElement() {
    if (rightElement === "button") {
      return (
        <button onClick={handle} className="event-list-header__button">
          <img
            src={PlusIcon}
            alt="plus icon"
            className="event-list-header__button-icon"
          />
        </button>
      );
    }

    if (rightElement === "dropdown") {
      return (
        <select className="event-list-header__dropdown">
          <option value="all">All</option>
          <option value="past">Past</option>
          <option value="future">Future</option>
        </select>
      );
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
