import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Navbar = ({ title, icon }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li><Link to='/'>Home</Link></li>
      </ul>
      <ul>
        <li><Link to='/about'>About Us</Link></li>
      </ul>
    </nav>
  );
}

Navbar.defaultProps = {
  title: 'My Github',
  icon: 'fab fa-github'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar
