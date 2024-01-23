import React, { Fragment, useEffect, useRef, useState } from "react";
import "./near-events-page.css";
import {
  Circle,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import EventPopup from "./components/event-popup/EventPopup";
import { NearEventsProvider } from "./context/nearEventsContext";
import MarkerIcon from "../../assets/icons/marker.svg";
import PinIcon from "../../assets/icons/pin-svg.svg";

const SETTING_NUMBER_OF_EVENTS_TIMEOUT = 1000;
const containerStyle = {
  width: "100%",
  height: "100%",
};

function NearEventsPage() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCSNPCiAr9U36c8a-ZbTxbl1c9VtxCOXu8",
  });
  const mapContainerRef = useRef(null);
  const eventContainerRef = useRef(null);
  const [mouseOverOnMarker, setMouseOverOnMarker] = useState(false);
  const [shouldShowEventPopup, setShouldShowEventPopup] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationEventPairs, setLocationEventPairs] = useState(null);

  useEffect(() => {
    if (!currentLocation) return;

    fetch(
      `http://localhost:8080/events/near-events?lat=${currentLocation.lat}&long=${currentLocation.lng}`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (res.status === 204) {
          return [];
        } else {
          return res.json();
        }
      })
      .then((events) => {
        let locationEventPairs = [];

        Object.entries(events).forEach((event) => {
          const [lat, long] = event[0].split("=");

          event[1].map(
            (e) =>
              (e.images = [
                "https://lh5.googleusercontent.com/p/AF1QipMTySpaj9z-U-QkTMmeRxikzkWsWhNFowzW0yrM=s1016-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipMGXARQQoiP_663gUVGd9IbVZ63UqxSQAyNk46U=w203-h157-k-no",
                "https://lh5.googleusercontent.com/p/AF1QipN4kcUzN5aF0Svz5v8u92YZs6waxdJTPw1lisBS=s812-k-no",
              ])
          );

          event[1].map((e) => (e.commentsUrl = "https://www.google.com"));

          event[1].map((e) => (e.where = e.place));

          const eventPerLocation = {
            lat: lat,
            lng: long,
            events: event[1],
          };

          locationEventPairs.push(eventPerLocation);
        });

        setSelectedMarker(locationEventPairs[0].events[0]);

        setLocationEventPairs(locationEventPairs);
      })
      .catch((err) => console.log("err getting near events", err));
  }, [currentLocation]);

  // get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setCurrentLocation({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    if (!shouldShowEventPopup && mapContainerRef.current) {
      if (mapContainerRef.current.contains(document.getElementById("canvas"))) {
        mapContainerRef.current.removeChild(document.getElementById("canvas"));
      }
    }
  }, [shouldShowEventPopup]);

  // add number to markers that has more than one event
  useEffect(() => {
    if (!currentLocation || !locationEventPairs || !isLoaded) {
      return;
    }

    const div = document.querySelector(`[title="current location"]`);

    const timeOut = setTimeout(() => {
      locationEventPairs.forEach((item) => {
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
  }, [currentLocation, isLoaded, locationEventPairs, selectedMarker]);

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
        <Fragment key={"map fragment"}>
          {currentLocation && (
            <Marker
              cursor="pointer"
              title={"current location"}
              position={{
                lat: currentLocation.lat,
                lng: currentLocation.lng,
              }}
              icon={PinIcon}
            />
          )}

          {currentLocation && (
            <Circle
              defaultCenter={{
                lat: parseFloat(currentLocation.lat),
                lng: parseFloat(currentLocation.lng),
              }}
              radius={3000}
              options={{
                strokeColor: "red",
              }}
            />
          )}

          {locationEventPairs &&
            locationEventPairs.map((item, index) => (
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
                position={{
                  lat: parseFloat(item.lat),
                  lng: parseFloat(item.lng),
                }}
                icon={MarkerIcon}
              />
            ))}
        </Fragment>
      </GoogleMap>

      {shouldShowEventPopup ? (
        <NearEventsProvider>
          <EventPopup
            setShouldShowEventPopup={setShouldShowEventPopup}
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
