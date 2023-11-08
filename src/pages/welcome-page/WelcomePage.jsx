import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SignInForm from "../../components/SignIn/SignInForm";
import SignUpForm from "../../components/SignUp/SignUpForm";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { ModalContext } from "../../context/ModalContext";
import "./welcome-page.css";
function WelcomePage() {
  const navigate = useNavigate();
  const { dispatch } = useContext(ModalContext);

  function handleOpenSignInModal() {
	dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
	dispatch({ type: "SET_MODAL_TITLE", payload: "Giriş Yap" });
	dispatch({ 
	  type: "SET_MODAL_CONTENT", 
	  payload: <SignInForm onClose={() => dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: false })} />
	});
	dispatch({ type: "SET_MODAL_SHOULD_SHOW_LOGO", payload: true }); 
 }
 function handleOpenSignUpModal() {
	dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
	dispatch({ type: "SET_MODAL_TITLE", payload: "Kaydol" });
	dispatch({ 
	  type: "SET_MODAL_CONTENT", 
	  payload: <SignUpForm onClose={() => dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: false })} />
	});
	dispatch({ type: "SET_MODAL_SHOULD_SHOW_LOGO", payload: true }); 
 }
  return (
    <div className="welcome-page">
      <Header />
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
          onClick={handleOpenSignUpModal}
          className="welcome-page__button sign-up-btn"
        >
          <i className="bi-person-plus-fill"></i> Kayıt Ol
        </button>
        <button
          onClick={handleOpenSignInModal}
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
