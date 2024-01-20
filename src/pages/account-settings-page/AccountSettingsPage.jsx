import React, { useState } from "react";
import "./account-settings-page.css";

function AccountSettingsPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  return (
    <div className="account-settins-page">
      <p className="account-settins-page-title">Hesap Ayarları</p>

      <form className="account-settins-page-form">
        <div className="account-settings-page-form-groups-container">
          <div className="account-settins-page-form-input-group">
            <label className="account-settins-page-form-input-group-label">
              İsim
            </label>

            <input
              onChange={(e) => setName(e.target.value)}
              className="account-settins-page-form-input-group-input"
              placeholder="ismini gir"
            />
          </div>

          <div className="account-settins-page-form-input-group">
            <label className="account-settins-page-form-input-group-label">
              Soyisim
            </label>

            <input
              onChange={(e) => setSurname(e.target.value)}
              className="account-settins-page-form-input-group-input"
              placeholder="soyismini gir"
            />
          </div>
        </div>

        <div className="account-settings-page-form-groups-container">
          <div className="account-settins-page-form-input-group">
            <label className="account-settins-page-form-input-group-label">
              E-posta adresi
            </label>

            <input
              onChange={(e) => setEmail(e.target.value)}
              className="account-settins-page-form-input-group-input"
              placeholder="e-posta adresini gir"
            />
          </div>

          <div className="account-settins-page-form-input-group">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // handle this with real logic
                setEmailConfirmed(true);
              }}
              disabled={email.length === 0 && !isValidEmail(email)}
              className="account-settins-page-form-input-group-confirm-btn"
            >
              Doğrula
            </button>
          </div>
        </div>

        <div className="account-settings-page-form-groups-container">
          <div className="account-settins-page-form-input-group">
            <label className="account-settins-page-form-input-group-label">
              Yeni şifre
            </label>

            <input
              onChange={(e) => setPassword(e.target.value)}
              className="account-settins-page-form-input-group-input"
              placeholder="yeni şifreni gir"
            />
          </div>

          <div className="account-settins-page-form-input-group">
            <label className="account-settins-page-form-input-group-label">
              Yeni şifre tekrarı
            </label>

            <input
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="account-settins-page-form-input-group-input"
              placeholder="yeni şifreni doğrula"
            />
          </div>
        </div>

        <button
          disabled={
            name.length === 0 &&
            surname.length === 0 &&
            password.length === 0 &&
            !emailConfirmed
          }
          className="account-settins-page-form-submit-btn"
        >
          Değişiklikleri Onayla
        </button>
      </form>
    </div>
  );
}

export default AccountSettingsPage;
