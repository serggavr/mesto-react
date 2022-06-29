import React from 'react';
import Logo from "../images/header/logo_theme_dark.svg";

export default function Header() {
  return (
    <header className="header">
      <img
        src={Logo}
        alt="Место Россия"
        className="header__logo"
      />
    </header>
  );
}