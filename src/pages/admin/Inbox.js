import { BsChevronDoubleLeft } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../utils/api';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import useAxios from '../../utils/useAxios';
import LoaderComp from '../../components/LoaderComp';
import { formatDate } from '../../utils/library';
import { useTranslation } from 'react-i18next';

const Inbox = () => {
  const { t } = useTranslation();
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
      setUpdatePlaces(!updatePlaces);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm(t('deleteItem'))) {
      deleteOrder(id);
    }
  };

  return (
    <div className='custom-container'>
      <div onClick={navigate} className={'backIconAbsolute'}>
        <BsChevronDoubleLeft fontSize={'35px'} style={{ textAlign: 'left' }} />
      </div>
      <h1 className='heading'>{t('inbox')}</h1>
      {inbox.length ? (
        <h2 className='subheading' style={{ textAlign: 'center' }}>
          {inbox.length} {t('messages')}
        </h2>
      ) : null}
      {showLoader ? (
        <LoaderComp />
      ) : (
        <>
          <div className='inbox-div'>
            {inbox
              .sort(function (a, b) {
                return b.id - a.id;
              })
              .slice(0, showMore ? 4 : 100000000)
              .map((inboxItem) => {
                return (
                  <div key={inboxItem.id} className='inbox-cards'>
                    <div className='inbox-info'>
                      <TiDelete
                        onClick={() => handleDeleteOrder(inboxItem.id)}
                        fontSize={'32px'}
                        className='deleteIcon'
                      />
                      <span className='inbox-name'>
                        {t('from')}: <b>{inboxItem.name}</b>
                      </span>
                      <span className='inbox-name'>
                        Email:{' '}
                        <a href={`mailto:${inboxItem.email}`}>
                          <b>{inboxItem.email}</b>
                        </a>
                      </span>
                      <span className='inbox-created'>
                        {t('sent')}: {formatDate(inboxItem.created_at)}
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
            <div
              className='button hollow__btn viewMore__btn adminViewMore__btn'
              onClick={() => setShowMore(!showMore)}
            >
              {showMore
                ? `${t('showMore')} (${inbox.length - 4})`
                : t('showLess')}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Inbox;
