import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { AppContext } from "../../context/AppContext";
import { DropdownContext } from "../../context/DropdownContext";
import AccountDropdown from "./components/account-dropdown/AccountDropdown";

function Header() {
  const { state: appContextState } = useContext(AppContext);
  const { state: dropdownContextState, dispatch } = useContext(DropdownContext);
  const navigate = useNavigate();

  function handleToggleDropdown() {
    if (dropdownContextState.open) {
      dispatch({
        type: "CLOSE_DROPDOWN",
      });
      return;
    }

    dispatch({
      type: "TOGGLE_DROPDOWN",
    });
  }

  return (
    <>
      <header className="header">
        <Link
          to={appContextState.user ? "/schedule-event" : "/"}
          className="header_logo"
        >
          <img
            src="/favicon.ico"
            alt="Farketmez Logo"
            className="header_favicon"
          />
          Fark Etmez
        </Link>
        {appContextState.user ? (
          <button
            className="header-button__user"
            onClick={handleToggleDropdown}
          >
            <i className="bi-person-circle"></i> {appContextState.user.username}
          </button>
        ) : (
          <button
            className="header-button"
            onClick={() => navigate("/sign-in")}
          >
            <i className="bi-box-arrow-in-right"></i> Giriş Yap
          </button>
        )}

        <AccountDropdown />
      </header>

      <div style={{ position: "absolute", right: 0 }} id="dropdown-root"></div>
    </>
  );
}

export default Header;
