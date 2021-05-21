import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { FaCashRegister, FaHotel, FaInbox } from 'react-icons/fa';
import { capitalize } from '../../utils/library';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  document.title = `Holidaze | ${t('admin')}`;
  const [auth] = useContext(AuthContext);

  const history = useHistory();

  if (!auth) {
    setTimeout(() => {
      history.push('/');
    }, 0);
  }

  return (
    <div className='custom-container'>
      <h1 className='heading'>Dashboard</h1>
      <h2
        className='subheading dashboard-subheading'
        style={{ textAlign: 'center' }}
      >
        {t('welcome')}, {auth ? capitalize(auth.user.username) : null}
      </h2>
      <hr />
      <div>
        <div className='dashboard'>
          <div className='dashboard-items' to={'/orders'}>
            <Link to={'dashboard/orders'}>
              <FaCashRegister fontSize={'55px'} className={'redIcon'} />
            </Link>
            <span className='dashboard-title'>{t('orders')}</span>
            <Link
              to={'dashboard/orders'}
              className='button hollow__btn dashBoard__btn'
            >
              {t('view')}
            </Link>
          </div>
          <div className='dashboard-items' to={'/admin-places'}>
            <Link to={'dashboard/admin-places'}>
              <FaHotel fontSize={'55px'} className={'redIcon'} />
            </Link>
            <span className='dashboard-title'>{t('places')}</span>
            <Link
              to={'dashboard/admin-places'}
              className='button hollow__btn dashBoard__btn'
            >
              {t('view')}
            </Link>
          </div>
          <div className='dashboard-items' to={'/admin-places'}>
            <Link to={'dashboard/inbox'}>
              <FaInbox fontSize={'55px'} className={'redIcon'} />
            </Link>
            <span className='dashboard-title'>{t('inbox')}</span>
            <Link
              to={'dashboard/inbox'}
              className='button hollow__btn dashBoard__btn'
            >
              {t('view')}
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <Link to={'dashboard/new-place'} className='button solid__btn'>
        {t('createNewPlace')}
      </Link>
    </div>
  );
};

export default Dashboard;
