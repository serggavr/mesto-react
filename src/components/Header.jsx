import React from 'react';
import logo from "../images/header/logo_theme_dark.svg";

export default function Header() {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Место Россия"
        className="header__logo"
      />
    </header>
  );
}