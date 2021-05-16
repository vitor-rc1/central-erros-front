import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SideMenu from './SideMenu';

function Header({ sideMenu }) {
  return (
    <header className="main-header">
      {sideMenu && <SideMenu />}
      <Link className="hero-title" to="/">
        Central de Erros
      </Link>
      <img
        src="https://company-assets-highway.s3-us-west-1.amazonaws.com/cit/logo.png"
        alt="CIandT logo"
      />
    </header>
  );
}

Header.propTypes = {
  sideMenu: PropTypes.bool,
};
Header.defaultProps = {
  sideMenu: false,
};
export default Header;
