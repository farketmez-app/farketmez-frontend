import React, { useState } from "react";
import Header from "../../components/header/header";
import "./sign-in-page.css";
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";

function SignInPage() {
    const navigate = useNavigate();
    const [showEmailSignIn, setShowEmailSignIn] = useState(false);

    return (
        <div>
            <Header />
            <div className="signin-container">
                {showEmailSignIn ? (
                    <>
                        <h2>
                            Giriş Yap
                            <img src="/favicon2.ico" alt="Favicon" className="favicon" />
                        </h2>
                        <div className="email-signin-container">
                            <div className="back-button" onClick={() => setShowEmailSignIn(false)}>
                                ← Geri dön
                            </div>
                            <label>kullanıcı adı</label>
                            <input type="text" placeholder="kullanıcı adını gir" />
                            <label>şifre</label>
                            <input type="password" placeholder="şifreni gir" />
                            <div className="forgot-password-link">şifremi Unuttum</div>
                            <button className="submit-email-signin">Giriş Yap</button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2>
                            Giriş Yap
                            <img src="/favicon2.ico" alt="Favicon" className="favicon" />
                        </h2>
                        
                        <button className="signin-email-btn" onClick={() => setShowEmailSignIn(true)}>
                            <i className="bi-envelope-fill"></i> E-posta ile giriş yap
                        </button>

                        <button className="signin-google-btn">
                            <i className="bi-google"></i> Google ile giriş yap
                        </button>

                        <div className="signin-footer">
                            Hesabın yok mu? <span onClick={() => navigate("/sign-up")} className="signup-link">Şimdi Oluştur</span>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default SignInPage;
