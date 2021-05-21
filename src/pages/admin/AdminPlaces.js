import { BsChevronDoubleLeft } from 'react-icons/bs';
import { MdFavorite } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseUrl, placesUrl } from '../../utils/api';
import useAxios from '../../utils/useAxios';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import LoaderComp from '../../components/LoaderComp';
import { capitalize } from '../../utils/library';
import { formatDate } from '../../utils/library';
import { useTranslation } from 'react-i18next';

const AdminPlaces = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [places, setPlaces] = useState([]);
  const [sortPlaces, setSortPlaces] = useState([]);
  const https = useAxios();
  const [updatePlaces, setUpdatePlaces] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [auth] = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(true);
  const [searchError, setSearchError] = useState(false);

  function navigate() {
    history.goBack();
  }

  if (!auth) {
    setTimeout(() => {
      history.push('/');
    }, 0);
  }

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const response = await https.get(`${baseUrl}${placesUrl}`);
        setPlaces(response.data);
        setSortPlaces(response.data);
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
      setUpdatePlaces(!updatePlaces);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const handleDeletePlace = (id) => {
    if (window.confirm(t('deleteItem'))) {
      deletePlace(id);
    }
  };

  const searchPlaces = (e) => {
    setSearchError(false);
    if (e.target.value.length >= 1) {
      const newArr = sortPlaces.filter((places) =>
        places.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setPlaces(newArr);
      if (newArr.length <= 0) {
        setSearchError(true);
      }
    } else {
      setPlaces(sortPlaces);
    }
  };

  return (
    <div className='custom-container'>
      <div onClick={navigate} className={'backIconAbsolute'}>
        <BsChevronDoubleLeft fontSize={'35px'} style={{ textAlign: 'left' }} />
      </div>
      <h1 className='heading'>{t('places')}</h1>
      {places ? (
        <h2 className='subheading' style={{ textAlign: 'center' }}>
          {t('totalPlaces')} {places.length}
        </h2>
      ) : null}
      <div className='searchPlaces-div'>
        <input
          type='search'
          name='searchPlaces'
          placeholder={t('searchPlaces')}
          className='inputElem'
          onChange={(e) => searchPlaces(e)}
        />
        {searchError ? (
          <div className='searchError'>{t('noResult')}</div>
        ) : null}
      </div>
      {showLoader ? (
        <LoaderComp />
      ) : (
        <>
          <div className='adminPlace-div'>
            {places
              .sort(function (a, b) {
                return b.id - a.id;
              })
              .slice(0, showMore ? 4 : 100000000)
              .map((order) => {
                let subRating = 0;
                order.user_reviews.map(
                  (review) => (subRating += review.rating)
                );
                const vote_average = subRating / order.user_reviews.length;
                return (
                  <div key={order.id} className='adminPlace-cards'>
                    <div className='adminPlace-imageDiv'>
                      <Link to={`/places/place/${order.id}`}>
                        <img
                          className='adminPlace-image'
                          src={order.image_url}
                          alt={order.place_name}
                        />
                      </Link>
                    </div>
                    <div className='adminPlace-info'>
                      <TiDelete
                        onClick={() => handleDeletePlace(order.id)}
                        fontSize={'32px'}
                        className='deleteIcon'
                      />
                      <span className='adminPlace-title'>{order.name}</span>
                      <div className='adminPlace-typeDiv'>
                        <span> {capitalize(order.type)}</span>
                      </div>
                      <div className='adminPlace-ratingDiv'>
                        <MdFavorite fontSize={'26px'} className={'redIcon'} />
                        <span className='adminPlace-rating'>
                          {vote_average
                            ? Math.floor((vote_average * 100) / 5)
                            : 0}
                          %
                        </span>
                        <span className='adminPlace-number'>
                          ({order.user_reviews?.length})
                        </span>
                      </div>
                      <span className='adminPlace-created'>
                        {t('created')}: {formatDate(order.created_at)}
                      </span>
                      <div className='adminPlace-description'>
                        <p>{order.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {places.length > 4 ? (
            <div
              className='button hollow__btn viewMore__btn adminViewMore__btn'
              onClick={() => setShowMore(!showMore)}
            >
              {showMore
                ? `${t('showMore')} (${places.length - 4})`
                : t('showLess')}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default AdminPlaces;
