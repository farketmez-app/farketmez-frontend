import React from "react";
import "./info-box.css";

export default function InfoBox({ text, type = "info" }) {
  return (
    <div className={`info-box info-box-${type}`}>
      <p>{text}</p>
    </div>
  );
}
