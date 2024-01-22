import { useState, useContext } from "react";
import { EnvelopeFill, Google } from "react-bootstrap-icons";
import "./SignUpForm.css";
import { ModalContext } from "../../context/ModalContext";
import SignInForm from "../SignIn/SignInForm";
import Input from "../input/Input";
import SimpleDropdown from "../simple-dropdown/SimpleDropdown";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const SignUpForm = () => {
  const { dispatch } = useContext(ModalContext);
  const [showEmailSignUp, setShowEmailSignUp] = useState(false);

  const handleSignInLinkClick = () => {
    dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
    dispatch({
      type: "SET_MODAL_SHOULD_CLOSE_ON_OVERLAY_CLICK",
      payload: true,
    });
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
  };

  return (
    <div className="sign-up-form">
      {showEmailSignUp ? (
        <EmailSignUp
          setShowEmailSignUp={setShowEmailSignUp}
          handleSignInLinkClick={handleSignInLinkClick}
        />
      ) : (
        <ButtonSignIn
          setShowEmailSignUp={setShowEmailSignUp}
          handleSignInLinkClick={handleSignInLinkClick}
        />
      )}
    </div>
  );
};

const ButtonSignIn = ({ setShowEmailSignUp, handleSignInLinkClick }) => {
  return (
    <>
      <div className="d-grid gap-2">
        <button
          className="btn btn-primary"
          onClick={() => setShowEmailSignUp(true)}
        >
          <EnvelopeFill /> E-posta ile kaydol
        </button>

        <button className="btn btn-light">
          <Google /> Google ile kaydol
        </button>
      </div>

      <div className="mt-3 text-center sign-up-form-already-have-account">
        Hesabın var mı?{" "}
        <span
          className="text-primary sign-up-form-sign-in-link"
          onClick={handleSignInLinkClick}
        >
          Giriş Yap
        </span>
      </div>
    </>
  );
};

const EmailSignUp = ({ setShowEmailSignUp, handleSignInLinkClick }) => {
  const { dispatch } = useContext(AppContext);
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    age: "",
    gender: "Erkek",
    interests: [],
  });
  const navigate = useNavigate();

  function handleSignup() {
    const ageNumber = parseInt(user.age);

    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        name: user.name,
        lastname: user.lastname,
        age: ageNumber,
        gender:
          (user.gender === "Erkek" && "Male") ||
          (user.gender === "Kadın" && "Female"),
        longitude: -1,
        latitude: -1,
        mail: user.email,
        userType: {
          type: "USER",
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "LOGIN",
          payload: {
            email: res.mail,
            id: res.id,
            userHasSelectedInterests:false
          },
        });
        
        navigate("/schedule-event");
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="mb-3 text-left">
        <button
          className="sign-in-form-back-button"
          onClick={() => setShowEmailSignUp(false)}
        >
          <i className="bi bi-arrow-left-short"></i>
          <p className="sign-in-form-back-button-text">Geri dön</p>
        </button>
      </div>

      <div style={{ paddingTop: 240 }}>
        <div className="sign-up-form-age-gender">
          <Input
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            value={user.name}
            customClassname={"sign-in-form-input"}
            label={"Ad"}
            name={"ad"}
            type={"text"}
            placeholder={"Adını gir"}
          />
          <Input
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            value={user.lastname}
            customClassname={"sign-in-form-input"}
            label={"Soyad"}
            name={"soyad"}
            type={"text"}
            placeholder={"Soyadını gir"}
          />
        </div>
        <Input
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          value={user.username}
          customClassname={"sign-in-form-input "}
          label={"Kullanıcı adı"}
          name={"kullanıcı adı"}
          type={"text"}
          placeholder={"Kullanıcı adını gir"}
        />
        <Input
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
          customClassname={"sign-in-form-input"}
          label={"Şifre"}
          name={"şifre"}
          type={"password"}
          placeholder={"Şifreni gir"}
        />
        <Input
          onChange={(e) =>
            setUser({ ...user, passwordConfirmation: e.target.value })
          }
          value={user.passwordConfirmation}
          customClassname={"sign-in-form-input"}
          label={"Şifre Doğrulama"}
          name={"şifre doğrulama"}
          type={"password"}
          placeholder={"Şifreni doğrula"}
        />
        <Input
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          value={user.email}
          customClassname={"sign-in-form-input"}
          label={"E-posta Adresi"}
          name={"e-posta"}
          type={"email"}
          placeholder={"E-posta adresini gir"}
        />
        <div className="sign-up-form-age-gender">
          <Input
            onChange={(e) => {
              if (isNaN(e.target.value)) {
                return;
              }

              if (e.target.value.length > 2) {
                return;
              }

              setUser({ ...user, age: e.target.value });
            }}
            value={user.age}
            customClassname={"sign-in-form-input"}
            label={"Yaş"}
            name={"yaş"}
            type={"text"}
            placeholder={"Yaşını gir"}
          />
          <SimpleDropdown
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
            value={user.gender}
            options={["Erkek", "Kadın"]}
            label={"Cinsiyet"}
          />
        </div>

        <button onClick={handleSignup} className="sign-up-form-sign-up-button">
          Hesap Oluştur
        </button>
      </div>
    </>
  );
};

export default SignUpForm;
