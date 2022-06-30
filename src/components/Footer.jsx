import React from 'react';

function Footer() {

  const date = new Date().getFullYear()

  return (
    <footer className="footer section">
      <p className="footer__copyright">© {date} Mesto-React Russia</p>
    </footer>
  );
}

export default Footer;