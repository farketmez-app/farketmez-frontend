import React from "react";
import "./button.css";

//type: primary, secondary, ghost, link

const Button = ({ children, type, onClick, disabled, customClassname }) => {
  return (
    <button
      className={
        `button button--${type}` +
        (customClassname ? ` ${customClassname}` : "")
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
