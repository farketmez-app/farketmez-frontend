import { useState, useContext } from 'react';
import { EnvelopeFill, Google, ArrowLeft } from 'react-bootstrap-icons';
import "./SignUpForm.css";
import { ModalContext } from '../../context/ModalContext';
import SignInForm from '../SignIn/SignInForm';
const SignUpForm = () => {
	const { dispatch } = useContext(ModalContext);
	const [showEmailSignUp, setShowEmailSignUp] = useState(false);
 
	const handleSignInLinkClick = () => {
	  dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
	  dispatch({ type: "SET_MODAL_TITLE", payload: "Giriş Yap" });
	  dispatch({
		 type: "SET_MODAL_CONTENT",
		 payload: <SignInForm onClose={() => dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: false })} />,
	  });
	  dispatch({ type: "SET_MODAL_SHOULD_SHOW_LOGO", payload: true });
	};
 
	return (
	  <div className="container">
		 {showEmailSignUp ? (
			<EmailSignUp setShowEmailSignUp={setShowEmailSignUp} handleSignInLinkClick={handleSignInLinkClick} />
		 ) : (
			<ButtonSignIn setShowEmailSignUp={setShowEmailSignUp} handleSignInLinkClick={handleSignInLinkClick} />
		 )}
	  </div>
	);
 };

 const ButtonSignIn = ({ setShowEmailSignUp, handleSignInLinkClick }) => {
	return (
	  <>
		 <div className="d-grid gap-2">
			<button className="btn btn-primary" onClick={() => setShowEmailSignUp(true)}>
			  <EnvelopeFill /> E-posta ile kaydol
			</button>
			<button className="btn btn-danger">
			  <Google /> Google ile kaydol
			</button>
		 </div>
		 <div className="mt-3 text-center">
			Hesabın var mı? <span className="text-primary" onClick={handleSignInLinkClick} style={{ cursor: 'pointer', textDecoration:'underline', color:'purple'}}>Giriş Yap</span>
		 </div>
	  </>
	);
 };

const EmailSignUp = ({ setShowEmailSignUp, handleSignInLinkClick }) => {
  return (
    <>
      <div className="mb-3 text-left">
        <button className="btn btn-light mb-3" onClick={() => setShowEmailSignUp(false)}>
          <ArrowLeft /> Geri dön
        </button>
      </div>

      <div>
        <div className="mb-3">
          <label className="form-label">Kullanıcı adı</label>
          <input type="text" className="form-control" placeholder="Kullanıcı adını gir" />
        </div>
        <div className="mb-3">
          <label className="form-label">Şifre</label>
          <input type="password" className="form-control" placeholder="Şifreni gir" />
        </div>
        <div className="mb-3">
          <label className="form-label">Şifre tekrar</label>
          <input type="password" className="form-control" placeholder="Şifreni tekrar gir" />
        </div>
        <div className="mb-3">
          <label className="form-label">E-posta adresi</label>
          <input type="email" className="form-control" placeholder="E-posta adresini gir" />
        </div>
        <div className="mb-3">
          <label className="form-label">Yaş</label>
          <input type="text" className="form-control" placeholder="Yaşını gir" />
        </div>
        <div className="mb-3">
          <label className="form-label">Cinsiyet</label>
          <select className="form-select">
            <option selected>Cinsiyetini seç</option>
            <option value="male">Erkek</option>
            <option value="female">Kadın</option>
          </select>
        </div>
		  <div className="mt-3 text-center">
			Hesabın var mı? <span className="text-primary" onClick={handleSignInLinkClick} style={{ cursor: 'pointer', textDecoration:'underline', color:'purple'}}>Giriş Yap</span>
		 </div>
		 <div className="d-grid gap-2">
          <button className="btn btn-primary">Kaydol</button>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
