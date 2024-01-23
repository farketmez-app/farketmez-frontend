import React, { useContext, useEffect, useState } from "react";
import "./account-settings-page.css";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AccountSettingsPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/users/${state.user.id}`)
      .then((res) => res.json())
      .then((user) => setUser(user));
  }, [state.user.id]);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  function handleSaveSettings(e) {
    e.preventDefault();
    e.stopPropagation();

    let updatedUser = {};

    if (name.length > 0) {
      updatedUser.name = name;
    }

    if (surname.length > 0) {
      updatedUser.lastname = surname;
    }

    if (password.length > 0) {
      updatedUser.password = password;
    }

    if (password.length > 0 && passwordConfirmation !== password) {
      toast("Şifreyi Doğruladığından Emin Ol ✌🏼", {
        type: "info",
        position: "top-center",
      });
      return;
    }

    fetch(`http://localhost:8080/users/${state.user.id}`)
      .then((res) => res.json())
      .then((user) => {
        if (email.length > 0) {
          updatedUser.mail = email;
        } else {
          updatedUser.mail = user.mail;
        }

        fetch(`http://localhost:8080/users`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: state.user.id,
            username: user.username,
            ...updatedUser,
          }),
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            }

            return null;
          })
          .then((newUser) => {
            if (!newUser) {
              toast("Bilgiler Kaydedilirken Bir Hatayla Karşılaştık", {
                type: "warning",
                position: "top-center",
              });

              return;
            }

            toast("Hesap Bilgileri Başarıyla Güncellendi 💜", {
              type: "success",
              position: "top-center",
            });

            setTimeout(() => {
              localStorage.clear();
              dispatch({ type: "LOGOUT" });

              navigate("/");
            }, 1000);
          });
      });
  }

  if (!user) return null;

  return (
    <div className="account-settins-page">
      <p className="account-settins-page-title">Hesap Ayarları</p>

      <div className="account-settins-page-form">
        <div className="account-settings-page-form-groups-container">
          <div className="account-settins-page-form-input-group">
            <label className="account-settins-page-form-input-group-label">
              İsim
            </label>

            <input
              onChange={(e) => setName(e.target.value)}
              className="account-settins-page-form-input-group-input"
              placeholder={user.name}
            />
          </div>

          <div className="account-settins-page-form-input-group">
            <label className="account-settins-page-form-input-group-label">
              Soyisim
            </label>

            <input
              onChange={(e) => setSurname(e.target.value)}
              className="account-settins-page-form-input-group-input"
              placeholder={user.lastname}
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
              placeholder={user.mail}
            />
          </div>

          <div className="account-settins-page-form-input-group--confirm-btn-container">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                setEmailConfirmed(true);
              }}
              disabled={!isValidEmail(email)}
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
          onClick={handleSaveSettings}
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
      </div>
    </div>
  );
}

export default AccountSettingsPage;
