import React, { useEffect } from "react";
import "./page-switcher.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";

function PageSwitcher() {
  const navigate = useNavigate();
  const params = useParams();
  const { pathname } = useLocation();
  const buttonClassname = "page-switcher__button"

  return (
    <div className="page-switcher">
      <div className="page-switcher__container">
        <button
          onClick={() => navigate("/schedule-event")}
          className={pathname === "/schedule-event" ? `${buttonClassname} ${buttonClassname}--active` : buttonClassname}
        >
          <p>Etkinlik Planla</p>
        </button>

        <button
          onClick={() => navigate("/my-events")}
          className={pathname === "/my-events" ? `${buttonClassname} ${buttonClassname}--active` : buttonClassname}
        >
          <p>Kendi Etkinliklerim</p>
        </button>

        <button
          onClick={() => navigate("/public-events")}
          className={pathname === "/public-events" ? `${buttonClassname} ${buttonClassname}--active` : buttonClassname}
        >
          <p>Herkese Açık Etkinlikler</p>
        </button>

        <button
          onClick={() => navigate("/near-events")}
          className={pathname === "/near-events" ? `${buttonClassname} ${buttonClassname}--active` : buttonClassname}

        >
          <p>Yakınımdakiler</p>
        </button>
      </div>
    </div>
  );
}

export default PageSwitcher;
