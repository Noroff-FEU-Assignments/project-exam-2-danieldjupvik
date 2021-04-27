import { BsChevronDoubleLeft } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../utils/api';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import useAxios from '../../utils/useAxios';
import LoaderComp from '../../components/LoaderComp';

export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const Inbox = () => {
  const history = useHistory();
  const [inbox, setInbox] = useState([]);
  const https = useAxios();
  const [updatePlaces, setUpdatePlaces] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [auth] = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(true);

  function navigate() {
    history.goBack();
  }

  if (!auth) {
    setTimeout(() => {
      history.push('/');
    }, 0);
  }

  useEffect(() => {
    // setLoader(true);
    const getInbox = async () => {
      try {
        const response = await https.get(`${baseUrl}/messages`);
        setInbox(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setShowLoader(false);
      }
    };
    getInbox();
  }, [updatePlaces]);

  const deleteOrder = async (id) => {
    try {
      const response = await https.delete(`${baseUrl}/messages/${id}`);
      console.log(response);
      setUpdatePlaces(!updatePlaces);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteOrder(id);
    }
  };

  console.log(inbox);

  return (
    <div className='custom-container'>
      <div onClick={navigate} className={'backIconAbsolute'}>
        <BsChevronDoubleLeft fontSize={'35px'} style={{ textAlign: 'left' }} />
      </div>
      <h1 className='heading'>Inbox</h1>
      {inbox.length ? (
        <h2 className='subheading' style={{ textAlign: 'center' }}>
          {inbox.length} messages
        </h2>
      ) : null}
      {showLoader ? (
        <LoaderComp />
      ) : (
        <>
          <div>
            {inbox
              .slice(0, showMore ? 4 : 100000000)
              .sort(function (a, b) {
                return b.id - a.id;
              })
              .map((inboxItem) => {
                const formatDate = (date) => {
                  var d = new Date(date);

                  var year = d.getFullYear();
                  var month = monthNames[d.getMonth()];
                  var day = d.getDate();
                  var created = `${day}. ${month} ${year}`;
                  return created;
                };

                return (
                  <div key={inboxItem.id} className='inbox-cards'>
                    <div className='inbox-info'>
                      <TiDelete
                        onClick={() => handleDeleteOrder(inboxItem.id)}
                        fontSize={'32px'}
                        className='deleteIcon'
                      />
                      <span className='inbox-name'>
                        From: <b>{inboxItem.name}</b>
                      </span>
                      <span className='inbox-name'>
                        Email: <b>{inboxItem.email}</b>
                      </span>
                      <span className='inbox-created'>
                        Sent: {formatDate(inboxItem.created_at)}
                      </span>
                      <div className='inbox-messageDiv'>
                        <p className='inbox-message'>{inboxItem.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {inbox.length > 4 ? (
            <div className='button' onClick={() => setShowMore(!showMore)}>
              {showMore ? `Show more (${inbox.length - 4})` : 'Show less'}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Inbox;
