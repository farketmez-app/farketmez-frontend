import React from "react";
import './select-box.css'

export default function SelectBox({ option, toggleSelectBox, image, text, selectedOnes }) {
  return (
    <button className={`select-box ${selectedOnes.includes(option) ? 'select-box-selected' : ''}`}
    
    onClick={() => toggleSelectBox(option)}>
      <img src={image} alt={text} />
      <p>{text}</p>
    </button>
  );
}
