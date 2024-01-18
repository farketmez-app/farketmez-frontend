import React, { useContext } from "react";
import "./farketmez-modal.css";

import ReactModal from "react-modal";
import { ModalContext } from "../../context/ModalContext";

import LogoPrimaryImage from "../../assets/images/logo-primary.png";

ReactModal.setAppElement("#modal-root");

/**
 * @example
 * import {useContext} from 'react';
 * import {ModalContext} from '../xx/ModalContext';
 *
 * function SomeComponent() {
 * const { state, dispatch } = useContext(ModalContext);  // state is like { modalContent: null, visible: false }, dispatch is a function
 *
 * function handleOpenModal() {
 * * dispatch({ type: "SET_MODAL_TITLE", payload: "Farketmez Modal Title" });
 * dispatch({ type: "SET_MODAL_CONTENT", payload: <p>modal</p> });
 * dispatch({ type: "SET_MODAL_SHOULD_SHOW_LOGO", payload: true });
 * dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
 *  }
 *
 * return (
 * <button onClick={handleOpenModal}>Toggle Modal</button>
 * );
 *
 *
 */
function FarketmezModal() {
  const { state, dispatch } = useContext(ModalContext); 

  function handleCloseModal() {
    dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: false });
    dispatch({ type: "RESET_MODAL" });
  }

  return (
    <ReactModal
      isOpen={state.visible}
      onRequestClose={handleCloseModal}
      contentLabel="Farketmez Modal"
      className={
        state.hasSpesifiedHeight
          ? "farketmez-modal"
          : "farketmez-modal farketmez-modal--auto-height"
      }
      overlayClassName="farketmez-modal__overlay"
      shouldCloseOnOverlayClick={state.shouldCloseOnOverlayClick}
      shouldCloseOnEsc={true}
    >
      {state.shouldShowLogo === false && state.title.length === 0 ? null : (
        <div className="farketmez-modal__header">
          {state.title.length > 0 ? (
            <p className="farketmez-modal__title">{state.title}</p>
          ) : null}

          {state.shouldShowLogo ? (
            <img
              src={LogoPrimaryImage}
              alt="Farketmez Logo"
              className="farketmez-modal__logo"
            />
          ) : null}
        </div>
      )}

      <div className="farketmez-modal__body">{state.modalContent}</div>
    </ReactModal>
  );
}

export default FarketmezModal;
