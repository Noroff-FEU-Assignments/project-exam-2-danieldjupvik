import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoWhite from '../assets/logo/Holidaze-logo-white.png';
const Navigation = () => {
  const [open, setOpen] = useState(false);

  const openHamburgerMenu = () => {
    setOpen(!open);
  };

  return (
    <nav>
      <div className='navigation'>
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
            className={open ? 'navbar-navigation open' : 'navbar-navigation'}
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
            <NavLink
              activeClassName='customActive'
              onClick={openHamburgerMenu}
              className='navbar-navigation__links'
              to='/dashboard'
            >
              Admin
            </NavLink>
            <div className='nav-buttons'>
              <Link
                onClick={openHamburgerMenu}
                to='/login'
                className='login__btn button'
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
