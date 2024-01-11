import React, { useEffect, useState } from "react";
import "./create-event.css";
import LockIcon from "../../../../assets/icons/lock.png";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import PinIcon from "../../../../assets/icons/pin.png";
import CurrentLocationIcon from "../../../../assets/icons/current-location.png";

function CreateEvent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAE6pdkLwm7olOsw-JA1i8BpDn3eda6m9I",
  });
  const [newEvent, setNewEvent] = useState({
    name: "",
    location: "",
    date: "",
    time: "",
    cost: "",
    place: "",
    public: true,
  });
  const [currentLocation, setCurrentLocation] = useState({
    lat: 39.7868915,
    lng: 30.5163944,
  });
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setCurrentLocation({ lat: latitude, lng: longitude });
    });
  }, []);

  function handleChange(e) {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(newEvent);
  }

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  console.log(newEvent);

  return (
    <div className="create-event">
      <form onSubmit={handleSubmit} className="create-event__form">
        <div className="create-event__form-group">
          <label className="create-event__form-label">Etkinlik Adı</label>
          <input
            name="name"
            onChange={handleChange}
            placeholder="etkinlik adını gir"
            className="create-event__form-input"
            type="text"
          />
        </div>

        <div className="create-event__form-group-container">
          <div className="create-event__form-group">
            <label className="create-event__form-label">Etkinlik Tarihi</label>
            <input
              name="date"
              onChange={handleChange}
              className="create-event__form-input"
              type="date"
              placeholder={Date.now()}
            />
          </div>

          <div className="create-event__form-group">
            <label className="create-event__form-label">Etkinlik Saati</label>
            <input
              name="time"
              onChange={handleChange}
              className="create-event__form-input"
              type="time"
            />
          </div>
        </div>

        <div className="create-event__form-group-container">
          <div className="create-event__form-group">
            <label className="create-event__form-label">Maliyet</label>
            <select
              name="cost"
              onChange={handleChange}
              className="create-event__form-input"
              placeholder="Maliyet"
            >
              <option value="Ucuz">Ucuz</option>
              <option value="Orta">Orta</option>
              <option value="Pahalı">Pahalı</option>
            </select>
          </div>

          <div className="create-event__form-group">
            <label className="create-event__form-label">Mekan</label>
            <select
              name="place"
              onChange={handleChange}
              className="create-event__form-input"
              placeholder="Maliyet"
            >
              <option value="Dışarda">Dışarda</option>
              <option value="Evde">Evde</option>
              <option value="Mekanda">Mekanda</option>
            </select>
          </div>
        </div>

        <div className="create-event__form-group">
          <label className="create-event__form-label">Nerede Olacak</label>
          {(newEvent.place === "Dışarda" || newEvent.place === "Mekanda") && (
            <input
              name="location"
              onChange={handleChange}
              placeholder="google maps linkini gir"
              className="create-event__form-input create-event__form-input--location"
              type="text"
            />
          )}

          {isLoaded && newEvent.place === "Evde" && (
            <div className="create-event__map-container create-event__form-input--location">
              <GoogleMap
                onClick={(e) => {
                  setSelectedLocation({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  });
                }}
                streetView={false}
                options={{ disableDefaultUI: true }}
                mapContainerStyle={containerStyle}
                zoom={14}
                center={currentLocation}
              >
                <Marker
                  key={0}
                  cursor="pointer"
                  title={"title"}
                  position={{
                    lat: currentLocation.lat,
                    lng: currentLocation.lng,
                  }}
                  icon={{
                    url: CurrentLocationIcon,
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                />

                {selectedLocation && (
                  <Marker
                    key={1}
                    cursor="pointer"
                    title={"title"}
                    position={{
                      lat: selectedLocation.lat,
                      lng: selectedLocation.lng,
                    }}
                    icon={{
                      url: PinIcon,
                      scaledSize: new window.google.maps.Size(24, 24),
                    }}
                  />
                )}
              </GoogleMap>
            </div>
          )}
        </div>
        <div className="create-event__form-group">
          <div className="create-event__form-publicity-container">
            <button
              className={`create-event__form-publicity-button ${
                newEvent.public
                  ? "create-event__form-publicity-button--public"
                  : "create-event__form-publicity-button--private"
              }`}
              type="button"
              onClick={() =>
                setNewEvent({ ...newEvent, public: !newEvent.public })
              }
            >
              <img
                src={LockIcon}
                alt="lock icon"
                className="create-event__form-publicity-button-icon"
              />
            </button>
            <p className="create-event__form-publicity-text">
              {newEvent.public
                ? "Etkinlik herkese açık olsun"
                : "Etkinlik özel olsun"}
            </p>
          </div>
        </div>

        <button className="create-event__form-submit-button" type="submit">
          Etkinlik Oluştur
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
