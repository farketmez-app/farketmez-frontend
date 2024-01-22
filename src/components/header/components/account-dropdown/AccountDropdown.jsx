import React, { useCallback, useContext, useEffect } from "react";
import "./account-dropdown.css";
import { createPortal } from "react-dom";
import { DropdownContext } from "../../../../context/DropdownContext";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";

function AccountDropdown() {
  const dropdownRoot = document.getElementById("dropdown-root");
  const { state, dispatch } = useContext(DropdownContext);
  const { dispatch: appContextDispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const dropdownOptions = [
    {
      title: "Katıldığım Etkinlikler",
      icon: "bi-clock-history",
      onClick: () => {
        navigate("/attended-events");
        dispatch({ type: "CLOSE_DROPDOWN" });
      },
    },
    {
      title: "Ayarlar",
      icon: "bi-gear",
      onClick: () => {
        navigate("/account-settings");
        dispatch({ type: "CLOSE_DROPDOWN" });
      },
    },
    {
      title: "Çıkış Yap",
      icon: "bi-box-arrow-left",
      onClick: () => {
        appContextDispatch({ type: "LOGOUT" });
        dispatch({ type: "CLOSE_DROPDOWN" });
        localStorage.clear();
        
        navigate("/");
      },
    },
  ];
  const handleClickOutside = useCallback(
    (e) => {
      if (e.target.classList.contains("header-button__user")) {
        return;
      }

      if (dropdownRoot && !dropdownRoot.contains(e.target)) {
        dispatch({ type: "CLOSE_DROPDOWN" });
      }
    },
    [dropdownRoot, dispatch]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (!state.open) {
    return null;
  }

  return createPortal(
    <div className="account-dropdown">
      {dropdownOptions.map((option) => (
        <div
          className="account-dropdown__option"
          onClick={option.onClick}
          key={option.title}
        >
          <i className={`bi ${option.icon} account-dropdown__icon`}></i>
          {option.title}
        </div>
      ))}
    </div>,
    dropdownRoot
  );
}

export default AccountDropdown;
