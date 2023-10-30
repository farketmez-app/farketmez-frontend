import React, { useContext } from "react";
import "./welcome-page.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { ModalContext } from "../../context/ModalContext";

function WelcomePage() {
  const navigate = useNavigate();
  const { dispatch } = useContext(ModalContext);

  function handleOpenFarketmezModal() {
    dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
    dispatch({ type: "SET_MODAL_TITLE", payload: "Farketmez Modal Title" });
    dispatch({ type: "SET_MODAL_CONTENT", payload: <p>modal</p> });
    dispatch({ type: "SET_MODAL_SHOULD_SHOW_LOGO", payload: true });
  }

  return (
    <div className="welcome-page">
      <Header />

      <button onClick={handleOpenFarketmezModal}>Farketmez Modalı Aç</button>

      <h1 className="welcome-page__title">
        Etkinlikleri Kolayca Planlayın ve Keşfedin!
      </h1>

      <div className="welcome-page__content">
        <div className="welcome-page__icon-container">
          <i
            className="bi-pencil-square welcome-page__icon"
            style={{ color: "#FFA500" }}
          ></i>
          <p>
            Etkinlikleri düzenlemek, katılmak ve keşfetmek için mükemmel bir
            platform
          </p>
        </div>

        <div className="welcome-page__icon-container">
          <i
            className="bi-geo-alt welcome-page__icon"
            style={{ color: "#4da5fe" }}
          ></i>
          <p>Konum taraması sayesinde yakındaki etkinlikleri kolayca keşfet</p>
        </div>

        <div className="welcome-page__icon-container">
          <i
            className="bi-calendar welcome-page__icon"
            style={{ color: "#8B008B" }}
          ></i>
          <p>
            Etkinliklerinizi organize etmek ve davetiyeler oluşturmak çok basit
          </p>
        </div>
      </div>

      <div className="welcome-page__buttons">
        <button
          onClick={() => navigate("/sign-up")}
          className="welcome-page__button sign-up-btn"
        >
          <i className="bi-person-plus-fill"></i> Kayıt Ol
        </button>
        <button
          onClick={() => navigate("/sign-in")}
          className="welcome-page__button sign-in-btn"
        >
          <i className="bi-box-arrow-in-right"></i> Giriş Yap
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default WelcomePage;