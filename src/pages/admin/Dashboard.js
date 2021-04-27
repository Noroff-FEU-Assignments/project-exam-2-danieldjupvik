import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { FaCashRegister, FaHotel, FaInbox } from 'react-icons/fa';

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
      <h2 className='heading'>Welcome, {auth ? auth.user.username : null}</h2>
      <hr />
      <div>
        <div className='dashboard'>
          <div className='dashboard-items' to={'/orders'}>
            <FaCashRegister fontSize={'55px'} className={'redIcon'} />
            <span className='dashboard-title'>Orders</span>
            <Link to={'/orders'} className='button hollow__btn'>
              View
            </Link>
          </div>
          <div className='dashboard-items' to={'/admin-places'}>
            <FaHotel fontSize={'55px'} className={'redIcon'} />
            <span className='dashboard-title'>Places</span>
            <Link to={'/admin-places'} className='button hollow__btn'>
              View
            </Link>
          </div>
          <div className='dashboard-items' to={'/admin-places'}>
            <FaInbox fontSize={'55px'} className={'redIcon'} />
            <span className='dashboard-title'>Inbox</span>
            <Link to={'/inbox'} className='button hollow__btn'>
              View
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <Link to={'/new-place'} className='button'>
        Create new place
      </Link>
    </div>
  );
};

export default Dashboard;
