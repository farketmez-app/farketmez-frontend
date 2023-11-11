import { useContext, useState } from "react";
import { EnvelopeFill, Google } from "react-bootstrap-icons";
import { ModalContext } from "../../context/ModalContext";
import SignUpForm from "../SignUp/SignUpForm";
import "./SignInForm.css";
import PasswordResetForm from "../PasswordReset/PasswordResetForm";
import Input from "../input/Input";
const SignInForm = () => {
  const { dispatch } = useContext(ModalContext);
  const [showEmailSignIn, setShowEmailSignIn] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const handleSignUpLinkClick = () => {
    dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
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
    username: "",
    password: "",
  });

  const handleChangeUsername = (username) => {
    setCredentials({ ...credentials, username: username });
  };

  const handleChangePassword = (password) => {
    setCredentials({ ...credentials, password: password });
  };

  const handleSignIn = () => {
    console.log(credentials);

    // handle fetchin here
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
          label={"Kullanıcı Adı"}
          onChange={(e) => handleChangeUsername(e.target.value)}
          name={"kullanıcı adı"}
          type={"text"}
          placeholder={"Kullanıcı adını gir"}
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

        <button onClick={handleSignIn} className="sign-in-form-sign-in-button">
          Giriş Yap
        </button>
      </div>
    </>
  );
};

export default SignInForm;
