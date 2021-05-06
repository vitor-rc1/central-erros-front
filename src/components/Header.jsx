import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="main-header">
      <Link className="hero-title" to="/">Central de Erros</Link>
      <img
        src="https://company-assets-highway.s3-us-west-1.amazonaws.com/cit/logo.png"
        alt="CIandT logo"
      />
    </header>
  );
}

export default Header;
