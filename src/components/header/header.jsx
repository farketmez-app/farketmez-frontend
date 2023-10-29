import React from 'react';
import { useNavigate } from "react-router-dom";
import './header.css';

function Header() {
	const navigate = useNavigate();
    return (
        <header className="header">
			<div className="header_logo">
			<img src="/favicon.ico" alt="Farketmez Logo" className="header_favicon" />
			Fark Etmez
			</div>
			<button className="header-button" onClick={() => navigate("/sign-in")}>
				<i className="bi-box-arrow-in-right"></i> Giriş Yap
			</button>
        </header>
    );
}

export default Header;
