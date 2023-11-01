// TODO: Find a way to show a warning message that says "Please allow location access to see near events" if user doesn't allow location access

import React, { useEffect, useRef, useState } from "react";
import "./near-events-page.css";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import EventPopup from "./components/event-popup/EventPopup";
import { NearEventsProvider } from "./context/nearEventsContext";
import MarkerIcon from "../../assets/icons/marker.svg";

// TODO: readjust this after api integration
const SETTING_NUMBER_OF_EVENTS_TIMEOUT = 1000;
const containerStyle = {
  width: "100%",
  height: "100%",
};

//TODO: remove this after api integration
const fake = [
  {
    events: [
      {
        id: 1,
        title: "Çay Evim",
        lat: 39.7868915,
        lng: 30.5163944,
        rating: 4.5,
        where: "Mekanda",
        cost: "Orta",
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipNrvV5lRi61RE8cfIlwA6M_jtZqPs04Bi5irhAN=w203-h360-k-no",
          "https://lh5.googleusercontent.com/p/AF1QipMwdusasTby04GE1QGcCcelUBCyN4WZEcALTwB0=s1016-k-no",
          "https://lh5.googleusercontent.com/p/AF1QipO7cfOyDBjY3ihoVRn_mSvQmVKmtbKrNUDTBNnu=s1016-k-no",
        ],
        commentsUrl: "https://www.google.com",
      },
      {
        id: 2,
        title: "Goril Burger'de burger yeme",
        lat: 39.7868915,
        lng: 30.5163944,
        rating: 3.8,
        where: "Mekanda",
        cost: "Orta",
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipPaTdQZRSCiRmRQbrN5v06zL5YkGK9xvNCrjjyi=w203-h270-k-no",
          "https://lh5.googleusercontent.com/p/AF1QipMXI27sYpGOvi-pUmXYztV2WSmcubmioCaJJC9d=w203-h152-k-no",
          "https://lh5.googleusercontent.com/p/AF1QipM95kLTJVNuc1hsOEr_dTh5cmdlUwTBs-4M6pMh=s901-k-no",
        ],
        commentsUrl: "https://www.google.com",
      },
    ],
  },
  {
    events: [
      {
        id: 3,
        title: "Kahve Dünyası",
        lat: 39.7820174,
        lng: 30.5171513,
        rating: 4.8,
        where: "Mekanda",
        cost: "Pahalı",
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipMTySpaj9z-U-QkTMmeRxikzkWsWhNFowzW0yrM=s1016-k-no",
          "https://lh5.googleusercontent.com/p/AF1QipMGXARQQoiP_663gUVGd9IbVZ63UqxSQAyNk46U=w203-h157-k-no",
          "https://lh5.googleusercontent.com/p/AF1QipN4kcUzN5aF0Svz5v8u92YZs6waxdJTPw1lisBS=s812-k-no",
        ],
        commentsUrl: "https://www.google.com",
      },
    ],
  },
];

function NearEventsPage() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAE6pdkLwm7olOsw-JA1i8BpDn3eda6m9I",
  });
  const mapContainerRef = useRef(null);
  const eventContainerRef = useRef(null);
  const [mouseOverOnMarker, setMouseOverOnMarker] = useState(false);
  const [shouldShowEventPopup, setShouldShowEventPopup] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(fake[0].events[0]);
  const [currentLocation, setCurrentLocation] = useState(null);

  // get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setCurrentLocation({ lat: latitude, lng: longitude });
    });
  }, []);

  // add number to markers that has more than one event
  useEffect(() => {
    if (!currentLocation) {
      console.log("no current location", currentLocation);
      return;
    }

    const timeOut = setTimeout(() => {
      fake.forEach((item) => {
        if (item.events.length === 1) {
          return;
        }

        const div = document.querySelector(`[title="${item.events[0].title}"]`);

        const p = document.createElement("p");

        p.setAttribute(
          "style",
          "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size:16px; font-weight:700; color:white;"
        );

        p.innerHTML = item.events.length;

        div.appendChild(p);
      });
    }, SETTING_NUMBER_OF_EVENTS_TIMEOUT);

    return () => {
      clearTimeout(timeOut);
    };
  }, [currentLocation]);

  // create triangle canvas and append it to map container, show event popup
  const handleGetCursorLocationRelatedToMap = (e) => {
    const thereIsACanvas = mapContainerRef.current.contains(
      document.getElementById("canvas")
    );
    const bounds = mapContainerRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    const containerWidth = mapContainerRef.current.offsetWidth;
    const containerHeight = mapContainerRef.current.offsetHeight;

    if (mouseOverOnMarker) {
      if (thereIsACanvas) {
        return;
      }

      setShouldShowEventPopup(true);

      const canvas = createCanvas({
        boundsRight: bounds.right,
        width: containerWidth,
        height: containerHeight,
        x: x,
        y: y,
      });

      setTimeout(() => {
        mapContainerRef.current.appendChild(canvas);
      }, 500);
    }

    if (eventContainerRef.current) {
      if (!eventContainerRef.current.contains(e.target)) {
        setShouldShowEventPopup(false);

        if (
          mapContainerRef.current.contains(document.getElementById("canvas"))
        ) {
          mapContainerRef.current.removeChild(
            document.getElementById("canvas")
          );
        }
      }
    }
  };

  // create triangle canvas shows where to click to see event popup
  const createCanvas = ({ boundsRight, width, height, x, y }) => {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    canvas.setAttribute("class", "canvas");

    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(1400, 200);
      ctx.lineTo(boundsRight, 500);

      ctx.fillStyle = "white";
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;

      ctx.fill();
    }

    canvas.style.position = "absolute";
    canvas.style.left = x + "px";
    canvas.style.top = y + "px";
    canvas.style.backgroundColor = "transparent";
    canvas.style.zIndex = "999";
    canvas.style.pointerEvents = "none";

    return canvas;
  };

  return isLoaded ? (
    <div
      ref={mapContainerRef}
      className="google-map"
      style={{
        width: "100%",
        height: "100%",
        margin: "auto",
        position: "relative",
      }}
      onClick={(e) => {
        handleGetCursorLocationRelatedToMap(e);
      }}
    >
      <GoogleMap
        streetView={false}
        options={{ disableDefaultUI: true }}
        mapContainerStyle={containerStyle}
        zoom={14}
        center={currentLocation}
      >
        {fake.map((item, index) => {
          return (
            <Marker
              onMouseOver={(e) => {
                setMouseOverOnMarker(true);

                if (selectedMarker && !shouldShowEventPopup) {
                  setSelectedMarker(item);
                }
              }}
              onMouseOut={(e) => {
                setMouseOverOnMarker(false);
              }}
              cursor="pointer"
              title={item.events[0].title}
              position={{ lat: item.events[0].lat, lng: item.events[0].lng }}
              icon={MarkerIcon}
            />
          );
        })}
      </GoogleMap>

      {shouldShowEventPopup ? (
        <NearEventsProvider>
          <EventPopup
            eventContainerRef={eventContainerRef}
            marker={selectedMarker}
          />
        </NearEventsProvider>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
}

export default NearEventsPage;
