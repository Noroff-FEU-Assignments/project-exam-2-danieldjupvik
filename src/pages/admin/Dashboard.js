import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { FaCashRegister, FaHotel, FaInbox } from 'react-icons/fa';
import { capitalize } from '../../utils/library';

const Dashboard = () => {
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
      <h2 className='subheading' style={{ textAlign: 'center' }}>
        Welcome, {auth ? capitalize(auth.user.username) : null}
      </h2>
      <hr />
      <div>
        <div className='dashboard'>
          <div className='dashboard-items' to={'/orders'}>
            <Link to={'dashboard/orders'}>
              <FaCashRegister fontSize={'55px'} className={'redIcon'} />
            </Link>
            <span className='dashboard-title'>Orders</span>
            <Link
              to={'dashboard/orders'}
              className='button hollow__btn dashBoard__btn'
            >
              View
            </Link>
          </div>
          <div className='dashboard-items' to={'/admin-places'}>
            <Link to={'dashboard/admin-places'}>
              <FaHotel fontSize={'55px'} className={'redIcon'} />
            </Link>
            <span className='dashboard-title'>Places</span>
            <Link
              to={'dashboard/admin-places'}
              className='button hollow__btn dashBoard__btn'
            >
              View
            </Link>
          </div>
          <div className='dashboard-items' to={'/admin-places'}>
            <Link to={'dashboard/inbox'}>
              <FaInbox fontSize={'55px'} className={'redIcon'} />
            </Link>
            <span className='dashboard-title'>Inbox</span>
            <Link
              to={'dashboard/inbox'}
              className='button hollow__btn dashBoard__btn'
            >
              View
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <Link to={'dashboard/new-place'} className='button'>
        Create new place
      </Link>
    </div>
  );
};

export default Dashboard;
