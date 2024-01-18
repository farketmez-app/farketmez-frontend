import { useContext, useState } from "react";
import { EnvelopeFill, Google } from "react-bootstrap-icons";
import { ModalContext } from "../../context/ModalContext";
import SignUpForm from "../SignUp/SignUpForm";
import "./SignInForm.css";
import PasswordResetForm from "../PasswordReset/PasswordResetForm";
import Input from "../input/Input";
import { BASE_API_URL } from "../../config";
import InfoBox from "../info-box/InfoBox";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const SignInForm = () => {
  const { dispatch } = useContext(ModalContext);
  const [showEmailSignIn, setShowEmailSignIn] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const handleSignUpLinkClick = () => {
    dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
    dispatch({
      type: "SET_MODAL_SHOULD_CLOSE_ON_OVERLAY_CLICK",
      payload: true,
    });
    dispatch({ type: "SET_MODAL_TITLE", payload: "Kaydol" });
    dispatch({
      type: "SET_MODAL_CONTENT",
      payload: (
        <SignUpForm
          onClose={() =>
            dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: false })
          }
        />
      ),
    });
    dispatch({ type: "SET_MODAL_SHOULD_SHOW_LOGO", payload: true });
  };

  const handleForgotPasswordClick = () => {
    dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
    dispatch({
      type: "SET_MODAL_SHOULD_CLOSE_ON_OVERLAY_CLICK",
      payload: true,
    });
    dispatch({ type: "SET_MODAL_TITLE", payload: "Şifre Yenileme" });
    dispatch({
      type: "SET_MODAL_CONTENT",
      payload: (
        <PasswordResetForm
          onClose={() =>
            dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: false })
          }
        />
      ),
    });
    setShowPasswordReset(true);
  };

  return (
    <div className="sign-in-form">
      {showPasswordReset ? (
        <PasswordResetForm setShowPasswordReset={setShowPasswordReset} />
      ) : showEmailSignIn ? (
        <EmailSignIn
          setShowEmailSignIn={setShowEmailSignIn}
          onForgotPasswordClick={handleForgotPasswordClick}
        />
      ) : (
        <ButtonSignIn
          setShowEmailSignIn={setShowEmailSignIn}
          onSignUpClick={handleSignUpLinkClick}
          onForgotPasswordClick={() => setShowPasswordReset(true)}
        />
      )}
    </div>
  );
};

const ButtonSignIn = ({ setShowEmailSignIn, onSignUpClick }) => {
  return (
    <>
      <div className="d-grid gap-2">
        <button
          className="btn btn-primary"
          onClick={() => setShowEmailSignIn(true)}
        >
          <EnvelopeFill /> E-posta ile giriş yap
        </button>

        <button className="btn btn-light">
          <Google /> Google ile giriş yap
        </button>
      </div>

      <div className="mt-3 text-center sign-in-form-not-have-account">
        Hesabın yok mu?{" "}
        <span
          className="text-primary sign-in-form-create-account-link"
          onClick={onSignUpClick}
        >
          Şimdi Oluştur
        </span>
      </div>
    </>
  );
};

const EmailSignIn = ({ setShowEmailSignIn, onForgotPasswordClick }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showInfoBox, setShowInfoBox] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const { dispatch: modalDispatch } = useContext(ModalContext);

  const handleChangeEmail = (username) => {
    setCredentials({ ...credentials, email: username });
  };

  const handleChangePassword = (password) => {
    setCredentials({ ...credentials, password: password });
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: credentials.email,
          password: credentials.password,
        }),
      });

      if (response.status === 200) {
        const responseText = await response.text();

        const id = responseText.split(" ")[1];

        fetch(`http://localhost:8080/user-interests/${id}/interests`)
          .then((res) => {
            if (res.ok) {
              dispatch({
                type: "LOGIN",
                payload: { email: credentials.email, id: id },
              });

              dispatch({
                type: "SET_USER_HAS_SELECTED_INTERESTS",
                payload: true,
              });
            } else {
              dispatch({
                type: "SET_USER_HAS_SELECTED_INTERESTS",
                payload: false,
              });

              dispatch({
                type: "LOGIN",
                payload: { email: credentials.email, id: id },
              });
            }
          })
          .then(() => {
            modalDispatch({ type: "RESET_MODAL" });

            navigate("/schedule-event");
          })
          .catch((err) => console.log(err));
      } else {
        setShowInfoBox(true);

        setTimeout(() => {
          setShowInfoBox(false);
        }, 3000);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="mb-3">
        <button
          className="sign-in-form-back-button"
          onClick={() => setShowEmailSignIn(false)}
        >
          <i class="bi bi-arrow-left-short"></i>
          <p className="sign-in-form-back-button-text">Geri dön</p>
        </button>
      </div>

      <div>
        <Input
          label={"E-posta adresi"}
          onChange={(e) => handleChangeEmail(e.target.value)}
          name={"eposta"}
          type={"text"}
          placeholder={"E-posta adresini gir"}
        />

        <Input
          label={"Şifre"}
          onChange={(e) => handleChangePassword(e.target.value)}
          name={"şifre"}
          type={"password"}
          placeholder={"Şifreni gir"}
        />

        <div className="sign-in-form-forgot-password">
          <button
            className="sign-in-form-forgot-password-link"
            onClick={onForgotPasswordClick}
          >
            Şifremi unuttum
          </button>
        </div>

        {showInfoBox && (
          <InfoBox text={"Kullanıcı adı veya şifre hatalı"} type={"error"} />
        )}

        <button
          disabled={
            credentials.email.length === 0 || credentials.password.length === 0
          }
          onClick={handleSignIn}
          className="sign-in-form-sign-in-button"
        >
          Giriş Yap
        </button>
      </div>
    </>
  );
};

export default SignInForm;
