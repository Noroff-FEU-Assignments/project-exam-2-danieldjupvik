import { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoWhite from '../assets/logo/Holidaze-logo-white.png';
import AuthContext from '../context/AuthContext';

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  const openHamburgerMenu = () => {
    var w = window.innerWidth;
    if (w <= 768) setOpen(!open);
  };

  const logout = () => {
    setAuth(null);
  };

  return (
    <nav>
      <div className={open ? 'navigation open' : 'navigation'}>
        <div className='custom-container navWrapper'>
          <div className='navigation__div'>
            <Link to='/'>
              <img
                className='navigation__logo'
                src={logoWhite}
                alt='Game Now logo'
              />
            </Link>
            <div
              className={open ? 'icon-container change' : 'icon-container'}
              onClick={openHamburgerMenu}
            >
              <div aria-label='hamburger icon'>
                <div className='bar1'></div>
                <div className='bar2'></div>
                <div className='bar3'></div>
              </div>
            </div>
          </div>
          <div
            id='navbar-navigation'
            className={open ? 'navbar-navigation' : 'navbar-navigation'}
          >
            <NavLink
              onClick={openHamburgerMenu}
              activeClassName='customActive'
              exact={true}
              className='navbar-navigation__links'
              to='/'
            >
              Home
            </NavLink>
            <NavLink
              activeClassName='customActive'
              onClick={openHamburgerMenu}
              className='navbar-navigation__links'
              to='/places'
            >
              Places
            </NavLink>
            <NavLink
              activeClassName='customActive'
              onClick={openHamburgerMenu}
              className='navbar-navigation__links'
              to='/contact'
            >
              Contact
            </NavLink>
            {auth ? (
              <NavLink
                activeClassName='customActive'
                onClick={openHamburgerMenu}
                className='navbar-navigation__links'
                to='/dashboard'
              >
                Admin
              </NavLink>
            ) : null}
            <div className='nav-buttons'>
              {auth ? (
                <div
                  onClick={(openHamburgerMenu, logout)}
                  className='login__btn button'
                >
                  Logout
                </div>
              ) : (
                <Link
                  onClick={openHamburgerMenu}
                  to='/login'
                  className='login__btn button'
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
