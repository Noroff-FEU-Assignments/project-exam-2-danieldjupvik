import { useState, useContext, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoWhite from '../assets/logo/Holidaze-logo-white.png';
import AuthContext from '../context/AuthContext';
import { FaLanguage } from 'react-icons/fa';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [nbActive, setNbActive] = useState(false);
  const [enActive, setEnActive] = useState(false);

  const openHamburgerMenu = () => {
    var w = window.innerWidth;
    if (w <= 768) setOpen(!open);
  };

  const logout = () => {
    setAuth(null);
  };

  const activeLang = localStorage.getItem('i18nextLng');
  useEffect(() => {
    if (activeLang === 'nb' || 'no') {
      setEnActive(false);
      setNbActive(true);
    }

    if (activeLang === 'en') {
      setNbActive(false);
      setEnActive(true);
    }
  }, [activeLang]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const node = useRef();

  const handleClick = (e) => {
    if (node.current?.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setShowMenu(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

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
              {t('home')}
            </NavLink>
            <NavLink
              activeClassName='customActive'
              onClick={openHamburgerMenu}
              className='navbar-navigation__links'
              to='/places'
            >
              {t('places')}
            </NavLink>
            <NavLink
              activeClassName='customActive'
              onClick={openHamburgerMenu}
              className='navbar-navigation__links'
              to='/contact'
            >
              {t('contact')}
            </NavLink>
            {auth ? (
              <NavLink
                activeClassName='customActive'
                onClick={openHamburgerMenu}
                className='navbar-navigation__links'
                to='/dashboard'
              >
                {t('admin')}
              </NavLink>
            ) : null}
            <div className='nav-buttons'>
              {auth ? (
                <>
                  <div
                    onClick={(openHamburgerMenu, logout)}
                    className='login__btn button'
                  >
                    {t('logout')}
                  </div>
                </>
              ) : (
                <Link
                  onClick={openHamburgerMenu}
                  to='/login'
                  className='login__btn button'
                >
                  {t('login')}
                </Link>
              )}
              <div
                ref={node}
                className='changeLanguage__btn'
                onClick={() => setShowMenu(!showMenu)}
              >
                <FaLanguage fontSize={'40px'} color={'white'} />
                {showMenu ? (
                  <div className='languageDropDown'>
                    <div
                      className={
                        nbActive
                          ? 'languageDropDown-item activeLanguage'
                          : 'languageDropDown-item'
                      }
                      onClick={() => {
                        changeLanguage('nb');
                        setShowMenu(false);
                      }}
                    >
                      {t('norwegian')}
                    </div>
                    <div
                      className={
                        enActive
                          ? 'languageDropDown-item activeLanguage'
                          : 'languageDropDown-item'
                      }
                      onClick={() => {
                        changeLanguage('en');
                        setShowMenu(false);
                      }}
                    >
                      {t('english')}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
