import { Link } from 'react-router-dom';
import footerLogo from '../assets/logo/Holidaze-logo-black.png';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

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
        <span className='footer-copyright'>{t('copyright')}</span>
      </div>
    </footer>
  );
};
export default Footer;
