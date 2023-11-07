import { useState } from 'react';
import { EnvelopeFill, Google } from 'react-bootstrap-icons';
import "./SignUpForm.css";
const SignInForm = () => {
  const [showEmailSignIn, setShowEmailSignIn] = useState(false);

  return (
    <div className="container">
      {showEmailSignIn ? (
        <EmailSignIn setShowEmailSignIn={setShowEmailSignIn} />
      ) : (
        <ButtonSignIn setShowEmailSignIn={setShowEmailSignIn} />
      )}
    </div>
  );
};

const ButtonSignIn = ({ setShowEmailSignIn }) => {
  return (
    <>
      <h2 className="text-center mb-4">Giriş Yap</h2>

      <div className="d-grid gap-2">
        <button className="btn btn-primary" onClick={() => setShowEmailSignIn(true)}>
          <EnvelopeFill /> E-posta ile kaydol
        </button>

        <button className="btn btn-danger">
          <Google /> Google ile kaydol
        </button>
      </div>

      <div className="mt-3 text-center">
        Hesabın yok mu? <a href="#" className="text-primary">Giriş Yap</a>
      </div>
    </>
  );
};

const EmailSignIn = ({ setShowEmailSignUp }) => {
  return (
    <>
      <h2 className="text-center mb-4">Giriş Yap</h2>

      <div className="mb-3">
        <button className="btn btn-light mb-3" onClick={() => setShowEmailSignUp(false)}>
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
          <button className="btn btn-primary">Kaydol</button>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
