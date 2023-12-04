import React, { useEffect, useRef, useState } from "react";
import "./input.css";

function Input({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  customClassname,
}) {
  const [shouldShowPassword, setShouldShowPassword] = useState(false);
  const inputRef = useRef(null);

  const handleClickOnInputArea = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div className={`input-container  ${customClassname ? customClassname : ""}`} onClick={handleClickOnInputArea}>
      <label className="input-label" htmlFor={name}>
        {label}
      </label>

      <div className="input__inner-container">
        <input
          ref={inputRef}
          className={`input`}
          placeholder={placeholder}
          type={
            type === "password"
              ? shouldShowPassword
                ? "text"
                : "password"
              : type
          }
          name={name}
          value={value}
          onChange={onChange}
        />

        {type === "password" ? (
          <button
            className="input__show-password-button"
            onClick={() => setShouldShowPassword(!shouldShowPassword)}
          >
            {shouldShowPassword ? (
              <i className="bi bi-eye"></i>
            ) : (
              <i className="bi bi-eye-fill"></i>
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Input;
