import { useState, useContext } from "react";
import { EnvelopeFill, Google, ArrowLeft } from "react-bootstrap-icons";
import "./SignUpForm.css";
import { ModalContext } from "../../context/ModalContext";
import SignInForm from "../SignIn/SignInForm";
import Input from "../input/Input";
import SimpleDropdown from "../simple-dropdown/SimpleDropdown";
import SelectBox from "../select-box/SelectBox";
import InfoBox from "../info-box/InfoBox";
import { interests } from "./constants";

const SignUpForm = () => {
  const { dispatch } = useContext(ModalContext);
  const [showEmailSignUp, setShowEmailSignUp] = useState(false);

  const handleSignInLinkClick = () => {
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
  const [user, setUser] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    age: "",
    gender: "",
    interests: [],
  });
  // step 1 is for username, password, passwordConfirmation, email form view
  // step 2 is for interests view
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState([]);

  if (step === 1) {
    return (
      <>
        <div className="mb-3 text-left">
          <button
            className="sign-in-form-back-button"
            onClick={() => setShowEmailSignUp(false)}
          >
            <i class="bi bi-arrow-left-short"></i>
            <p className="sign-in-form-back-button-text">Geri dön</p>
          </button>
        </div>

        <div>
          <Input
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            value={user.username}
            customClassname={
              "sign-in-form-input sign-in-form-input--has-padding-top"
            }
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

          <button
            onClick={() => setStep(2)}
            className="sign-up-form-sign-up-button"
          >
            Devam et
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="signup-interests-selection-view">
        <button className="sign-in-form-back-button" onClick={() => setStep(1)}>
          <i class="bi bi-arrow-left-short"></i>
          <p className="sign-in-form-back-button-text">Geri dön</p>
        </button>
      </div>

      <div className="sign-up-form-interests">
        <p className="sign-up-form-interests-title">
          İlgi alanlarını seçerek etkinlik önerileri alabilirsin
        </p>
        <div className="sign-up-form-interests-grid">
          {interests.map((interest) => (
            <SelectBox
              selectedOnes={selectedInterests}
              option={interest}
              toggleSelectBox={(option) => {
                if (selectedInterests.includes(option)) {
                  setSelectedInterests(
                    selectedInterests.filter((item) => item !== option)
                  );
                } else {
                  setSelectedInterests([...selectedInterests, option]);
                }
              }}
              image={interest.image}
              text={interest.name}
            />
          ))}
        </div>

        {selectedInterests.length < 3 && (
          <InfoBox text={"En az 3 ilgi alanı seçmelisin"} type="error" />
        )}

        <button
          disabled={selectedInterests.length < 3}
          className="sign-up-form-sign-up-button"
        >
          Hesap Oluştur
        </button>
      </div>
    </>
  );
};

export default SignUpForm;
