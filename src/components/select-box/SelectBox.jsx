import React from "react";
import "./select-box.css";

export default function SelectBox({
  option,
  toggleSelectBox,
  image,
  text,
  selectedOnes,
  customClassname,
}) {
  return (
    <button
      className={`select-box ${
        selectedOnes.includes(option) ? "select-box-selected" : ""
      } ${customClassname ? customClassname : ""}`}
      onClick={() => toggleSelectBox(option)}
    >
      {image && <img src={image} alt={text} />}
      
      <p>{text}</p>
    </button>
  );
}
