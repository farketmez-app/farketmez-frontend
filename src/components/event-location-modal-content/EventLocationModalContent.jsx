import React from "react";
import "./event-location-modal-content.css";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import PinIcon from "../../assets/icons/pin-svg.svg";

function EventLocationModalContent({ lat, lng, googleMapsUrl }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCSNPCiAr9U36c8a-ZbTxbl1c9VtxCOXu8",
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  if (!isLoaded) return;

  return (
    <div className="event-location-modal-content__map-container">
      <GoogleMap
        streetView={false}
        options={{ disableDefaultUI: true }}
        mapContainerStyle={containerStyle}
        zoom={14}
        center={{
          lat: lat,
          lng: lng,
        }}
      >
        <Marker
          key={0}
          cursor="pointer"
          title={"title"}
          position={{
            lat: lat,
            lng: lng,
          }}
          icon={{
            url: PinIcon,
            scaledSize: new window.google.maps.Size(20, 20),
          }}
        />
      </GoogleMap>

      {googleMapsUrl && (
        <a
          className={"event-location-modal-content__google-maps-link"}
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
        >
          Google Maps'te Aç
        </a>
      )}
    </div>
  );
}

export default EventLocationModalContent;
