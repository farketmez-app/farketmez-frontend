import React, { useContext } from "react";
import "./header.css";
import { ModalContext } from "../../context/ModalContext";
import SignInForm from "../SignIn/SignInForm";
import { AppContext } from "../../context/AppContext";
import LogoLightImage from '../../assets/images/logo-light.png';
import { DropdownContext } from "../../context/DropdownContext";

function Header() {
  const { dispatch } = useContext(ModalContext);
  const { dispatch: dropdownDispatch } = useContext(DropdownContext);
  const { state } = useContext(AppContext);

  function handleOpenSignInModal() {
    dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
    dispatch({ type: "SET_MODAL_TITLE", payload: "Giriş Yap" });
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

  function handleDropdown(){
    dropdownDispatch({ type: "TOGGLE_DROPDOWN" });
  }

  return (
    <header className="header">
      <div className="header_logo">
        <img
          src={LogoLightImage}
          alt="Farketmez Logo"
          className="header_favicon"
        />
        Fark Etmez
      </div>

      {state.user ? (
        <button onClick={handleDropdown} className="header-button">{state.user.email}</button>
      ) : (
        <button className="header-button" onClick={handleOpenSignInModal}>
          <i className="bi-box-arrow-in-right"></i> Giriş Yap
        </button>
      )}
    </header>
  );
}

export default Header;
