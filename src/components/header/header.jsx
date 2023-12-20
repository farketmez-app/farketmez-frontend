import React, { useContext } from "react";
import "./header.css";
import { ModalContext } from "../../context/ModalContext";
import SignInForm from "../SignIn/SignInForm";
import { AppContext } from "../../context/AppContext";
import LogoLightImage from '../../assets/images/logo-light.png';

function Header() {
  const { dispatch } = useContext(ModalContext);
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
        <p className="header-button">{state.user.email}</p>
      ) : (
        <button className="header-button" onClick={handleOpenSignInModal}>
          <i className="bi-box-arrow-in-right"></i> Giriş Yap
        </button>
      )}
    </header>
  );
}

export default Header;
