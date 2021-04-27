import { BsChevronDoubleLeft } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseUrl, placesUrl } from '../../utils/api';
import useAxios from '../../utils/useAxios';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
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

const AdminPlaces = () => {
  const history = useHistory();
  const [places, setPlaces] = useState([]);
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
    const getPlaces = async () => {
      try {
        const response = await https.get(`${baseUrl}${placesUrl}`);
        setPlaces(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setShowLoader(false);
      }
    };
    getPlaces();
  }, [updatePlaces]);

  const deletePlace = async (id) => {
    try {
      const response = await https.delete(`${baseUrl}${placesUrl}/${id}`);
      console.log(response);
      setUpdatePlaces(!updatePlaces);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const handleDeletePlace = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deletePlace(id);
    }
  };

  console.log(places);

  return (
    <div className='custom-container'>
      <div onClick={navigate} className={'backIconAbsolute'}>
        <BsChevronDoubleLeft fontSize={'35px'} style={{ textAlign: 'left' }} />
      </div>
      <h1 className='heading'>Places</h1>
      {places.length ? (
        <h2 className='subheading' style={{ textAlign: 'center' }}>
          Total places {places.length}
        </h2>
      ) : null}
      {showLoader ? (
        <LoaderComp />
      ) : (
        <>
          <div>
            {places
              .slice(0, showMore ? 4 : 100000000)
              .sort(function (a, b) {
                return b.id - a.id;
              })
              .map((order) => {
                const formatDate = (date) => {
                  var d = new Date(date);

                  var year = d.getFullYear();
                  var month = monthNames[d.getMonth()];
                  var day = d.getDate();
                  var created = `${day}. ${month} ${year}`;
                  return created;
                };

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
                        onClick={() => handleDeletePlace(order.id)}
                        fontSize={'32px'}
                        className='deleteIcon'
                      />
                      <span className='order-title'>{order.name}</span>
                      <span className='order-created'>
                        Created: {formatDate(order.created_at)}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
          {places.length > 4 ? (
            <div className='button' onClick={() => setShowMore(!showMore)}>
              {showMore ? `Show more (${places.length - 4})` : 'Show less'}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default AdminPlaces;
