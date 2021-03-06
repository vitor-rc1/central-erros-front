import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import * as Actions from '../actions/index';

function Header({ sideMenu }) {
  const dispatch = useDispatch();
  const showMenu = () => {
    dispatch(Actions.showMenu());
  };
  return (
    <header className="main-header">
      {sideMenu && (
        <FontAwesomeIcon onClick={showMenu} icon={faBars} size="3x" />
      )}
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
