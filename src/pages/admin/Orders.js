import { BsChevronDoubleLeft } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../utils/api';
import useAxios from '../../utils/useAxios';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import LoaderComp from '../../components/LoaderComp';
import { formatDate } from '../../utils/library';
import { useTranslation } from 'react-i18next';

const Orders = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const https = useAxios();
  const [updateOrder, setUpdateOrder] = useState(false);
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
    const getOrders = async () => {
      try {
        const response = await https.get(`${baseUrl}/orders`);
        setOrders(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setShowLoader(false);
      }
    };
    getOrders();
  }, [updateOrder]);

  const deleteOrder = async (id) => {
    setShowLoader(true);

    try {
      const response = await https.delete(`${baseUrl}/orders/${id}`);
      console.log(response);
      setUpdateOrder(!updateOrder);
    } catch (e) {
      console.log(e);
    } finally {
      setShowLoader(false);
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
      <h1 className='heading'>{t('orders')}</h1>
      {orders.length ? (
        <h2 className='subheading' style={{ textAlign: 'center' }}>
          {t('totalOrder')} {orders.length}
        </h2>
      ) : null}
      {showLoader ? (
        <LoaderComp />
      ) : (
        <>
          <div className='order-div'>
            {orders
              .sort(function (a, b) {
                return b.id - a.id;
              })
              .slice(0, showMore ? 4 : 100000000)
              .map((order) => {
                return (
                  <div key={order.id} className='order-cards'>
                    <div className='order-imageDiv'>
                      <img
                        className='order-image'
                        src={order.image_url}
                        alt={order.place_name}
                      />
                    </div>
                    <div className='order-info'>
                      <TiDelete
                        onClick={() => handleDeleteOrder(order.id)}
                        fontSize={'32px'}
                        className='deleteIcon'
                      />
                      <span className='order-title'>{order.place_name}</span>
                      <span className='order-name'>
                        {t('name')}: {order.name}
                      </span>
                      <span className='order-guests'>
                        {t('guests')}: {order.guests}
                      </span>
                      <span className='order-guests'>
                        {t('order')} ID: {order.id}
                      </span>
                      <span className='order-created'>
                        {t('ordered')}: {formatDate(order.created_at)}
                      </span>

                      <div className='order-dateDiv'>
                        <span className='order-date'>
                          {t('checkIn')} - <b>{formatDate(order.check_in)}</b>
                        </span>
                        <span className='order-date'>
                          {t('checkOut')} - <b>{formatDate(order.check_out)}</b>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {orders.length > 4 ? (
            <div
              className='button hollow__btn viewMore__btn adminViewMore__btn'
              onClick={() => setShowMore(!showMore)}
            >
              {showMore
                ? `${t('showMore')} (${orders.length - 4})`
                : t('showLess')}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Orders;
