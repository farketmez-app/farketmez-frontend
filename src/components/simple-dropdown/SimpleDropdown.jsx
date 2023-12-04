import React from "react";
import "./simple-dropdown.css";

function SimpleDropdown({ options, onChange, value, customClassname, label }) {
  return (
    <div className="simple-dropdown-container">
      <label className="simple-dropdown-label">{label}</label>

      <select
        className={`simple-dropdown ${customClassname ? customClassname : ""}`}
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="simple-dropdown__option"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SimpleDropdown;
