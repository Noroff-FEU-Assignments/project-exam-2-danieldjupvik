import { Link } from 'react-router-dom';
import footerLogo from '../assets/logo/Holidaze-logo-black.png';
const Footer = () => {
  return (
    <footer className='footer clearfix'>
      <div className='footerDiv'>
        <Link to={'/'}>
          <img
            className='footer-image'
            src={footerLogo}
            alt='holidaze-footer-logo'
          />
        </Link>
        <span className='footer-copyright'>
          Copyright 2021 © Holidaze All rights Reserved.
        </span>
      </div>
    </footer>
  );
};
export default Footer;
