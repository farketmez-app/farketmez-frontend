import React from 'react';
import './header.css';

function Header() {
    return (
        <header className="header">
			<div className="header_logo">
			<img src="/favicon.ico" alt="Farketmez Logo" className="header_favicon" />
			Fark Etmez
			</div>
			<button class="header-button">
				<i class="bi bi-door-open"></i> Giriş Yap
			</button>
        </header>
    );
}

export default Header;
