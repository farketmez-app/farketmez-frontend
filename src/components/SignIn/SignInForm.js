import { useState,useContext } from 'react';
import { EnvelopeFill, Google } from 'react-bootstrap-icons';
import "./SignInForm.css";
import { ModalContext } from '../../context/ModalContext';
import SignUpForm from '../SignUp/SignUpForm';
const SignInForm = () => {
	const { dispatch } = useContext(ModalContext);
  const [showEmailSignIn, setShowEmailSignIn] = useState(false);
  const handleSignUpLinkClick = () => {
	dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: true });
	dispatch({ type: "SET_MODAL_TITLE", payload: "Kaydol" });
	dispatch({
	  type: "SET_MODAL_CONTENT",
	  payload: <SignUpForm onClose={() => dispatch({ type: "TOGGLE_MODAL_VISIBILITY", payload: false })} />,
	});
	dispatch({ type: "SET_MODAL_SHOULD_SHOW_LOGO", payload: true });
 };
 return (
	<div className="container">
	  {showEmailSignIn ? (
		 <EmailSignIn setShowEmailSignIn={setShowEmailSignIn} />
	  ) : (
		 <ButtonSignIn setShowEmailSignIn={setShowEmailSignIn} onSignUpClick={handleSignUpLinkClick} />
	  )}
	</div>
 );
};

const ButtonSignIn = ({ setShowEmailSignIn, onSignUpClick }) => {
	return (
	  <>
		 <div className="d-grid gap-2">
			<button className="btn btn-primary" onClick={() => setShowEmailSignIn(true)}>
			  <EnvelopeFill /> E-posta ile giriş yap
			</button>
 
			<button className="btn btn-danger">
			  <Google /> Google ile giriş yap
			</button>
		 </div>
 
		 <div className="mt-3 text-center">
			Hesabın yok mu? <span className="text-primary" onClick={onSignUpClick} style={{ cursor: 'pointer', textDecoration:'underline', color:'purple'}}>Şimdi Oluştur</span>
		 </div>
	  </>
	);
 };

const EmailSignIn = ({ setShowEmailSignIn }) => {
  return (
    <>
      <div className="mb-3">
        <button className="btn btn-light mb-3" onClick={() => setShowEmailSignIn(false)}>
          ← Geri dön
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
        <div className="mb-3 text-center">
          <a href="#" className="text-primary">Şifremi Unuttum</a>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary">Giriş Yap</button>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
