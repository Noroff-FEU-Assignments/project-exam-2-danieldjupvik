import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        alignSelf: 'center',
        flexDirection: 'column',
      }}
      className='custom-container'
    >
      <h1>404</h1>
      <h2 style={{ display: 'block', textAlign: 'center' }}>
        {t('pageNotFound')}
      </h2>
      <Link to='/' className='button solid__btn'>
        Go home
      </Link>
    </div>
  );
};

export default NotFound;
