import React, { useContext } from "react";
import "./header.css";
import { ModalContext } from "../../context/ModalContext";
import SignInForm from "../SignIn/SignInForm";
import { AppContext } from "../../context/AppContext";
import LogoLightImage from "../../assets/images/logo-light.png";
import { DropdownContext } from "../../context/DropdownContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { dispatch } = useContext(ModalContext);
  const { dispatch: dropdownDispatch } = useContext(DropdownContext);
  const { state } = useContext(AppContext);

  function handleOpenSignInModal() {
    dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
    dispatch({ type: "SET_MODAL_TITLE", payload: "Giriş Yap" });
    dispatch({
      type: "SET_MODAL_SHOULD_CLOSE_ON_OVERLAY_CLICK",
      payload: true,
    });
    dispatch({
      type: "SET_MODAL_CONTENT",
      payload: (
        <SignInForm
          onClose={() =>
            dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: false })
          }
        />
      ),
    });
    dispatch({ type: "SET_MODAL_SHOULD_SHOW_LOGO", payload: true });
  }

  function handleDropdown() {
    dropdownDispatch({ type: "TOGGLE_DROPDOWN" });
  }

  return (
    <header className="header">
      <div onClick={() => navigate("/schedule-event")} className="header_logo">
        <img
          src={LogoLightImage}
          alt="Farketmez Logo"
          className="header_favicon"
        />
        Fark Etmez
      </div>

      {state.user.id ? (
        <button onClick={handleDropdown} className="header-button">
          {state.user.email}
        </button>
      ) : (
        <button className="header-button" onClick={handleOpenSignInModal}>
          <i className="bi-box-arrow-in-right"></i> Giriş Yap
        </button>
      )}
    </header>
  );
}

export default Header;
