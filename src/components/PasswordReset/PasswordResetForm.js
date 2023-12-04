import React, { useContext } from "react";
import "./password-reset-form.css";
import Input from "../input/Input";
import { ModalContext } from "../../context/ModalContext";
import SignInForm from "../SignIn/SignInForm";

const PasswordResetForm = ({ onClose }) => {
  const { dispatch } = useContext(ModalContext);
  const handleNavigateBack = () => {
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
  };

  return (
    <div className="password-reset-form">
      <button
        className="password-reset-form-back-button"
        onClick={() => handleNavigateBack()}
      >
        <i class="bi bi-arrow-left-short"></i>
        <p className="password-reset-form-back-button-text">Geri dön</p>
      </button>

      <Input
        label={"Kayıtlı e-posta adresinizi giriniz"}
        type="email"
        placeholder="E-posta adresi"
        customClassname={"password-reset-form-input"}
      />

      <button className="password-reset-form-button">Şifremi Yenile</button>
    </div>
  );
};

export default PasswordResetForm;
