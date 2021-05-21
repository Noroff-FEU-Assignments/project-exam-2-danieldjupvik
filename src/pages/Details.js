import { BsChevronDoubleLeft } from 'react-icons/bs';
import { MdFavorite } from 'react-icons/md';
import { FiShare } from 'react-icons/fi';
import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect, useReducer, useRef } from 'react';
import axios from 'axios';
import { baseUrl, placesUrl } from '../utils/api';
import Overlay from 'react-overlays/Overlay';
import styled from 'styled-components';
import OrderModal from '../components/Modal';
import { capitalize } from '../utils/library';
import StarRatings from 'react-star-ratings';
import { reviewSchema } from '../utils/schemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoaderComp from '../components/LoaderComp';
import { formatDate } from '../utils/library';
import { useTranslation } from 'react-i18next';

const Tooltip = styled('div')`
  position: absolute;
`;

const Arrow = styled('div')`
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: -1;

  &::before {
    content: '';
    position: absolute;
    transform: rotate(45deg);
    background: #000;
    width: 10px;
    height: 10px;
    top: 0;
    left: 0;
  }

  ${(p) =>
    ({
      left: 'right: -4px;',
      right: 'left: -4px;',
      top: 'bottom: -4px;',
      bottom: 'top: -4px;',
    }[p.placement])}
`;

const Body = styled('div')`
  padding: 7px 11px;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  background-color: #000;
`;

const initialSstate = {
  show: false,
};

function reducer(state, [type, payload]) {
  switch (type) {
    case 'show':
      return { show: !!payload, placement: payload };
    case 'hide':
      return { ...state, show: false, placement: null };
    default:
      return state;
  }
}

const Place = () => {
  const { t } = useTranslation();
  document.title = `Holidaze | ${t('places')}`;
  const [details, setDetails] = useState([]);
  const [vote_average, setVote_average] = useState();
  const [textToCopy, setTextToCopy] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reRender, setReRender] = useState(true);
  const [showMoreReviews, setShowMoreReviews] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    setTextToCopy(window.location.href);
    const getDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}${placesUrl}/${id}`);
        setDetails(response.data);
        setReviews(response.data.user_reviews);
      } catch (e) {
        console.log(e);
      } finally {
        setShowLoader(false);
      }
    };
    getDetails();
  }, [reRender, id]);

  function navigate() {
    history.goBack();
  }

  useEffect(() => {
    let subRating = 0;
    details.user_reviews?.map((review) => (subRating += review.rating));
    setVote_average(subRating / details.user_reviews?.length);
  }, [details]);

  const [{ show }, dispatch] = useReducer(reducer, initialSstate);
  const triggerRef = useRef(null);
  const containerRef = useRef(null);

  const handleClick = () => {
    dispatch(['show', 'left']);

    setTimeout(() => {
      dispatch(['hide', 'left']);
    }, 3000);
  };

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(reviewSchema),
  });

  const onSubmit = async (data) => {
    if (rating <= 0) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
      const newReviews = [
        ...reviews,
        {
          name: data.name,
          rating: rating,
          description: data.description,
          created: new Date(),
        },
      ];

      try {
        const response = await axios.put(`${baseUrl}${placesUrl}/${id}`, {
          user_reviews: newReviews,
        });
        if (response.status === 200) {
          setReRender(!reRender);
          setRating(0);
        }
      } catch (error) {
        console.log(error);
      } finally {
        reset();
      }
    }
  };

  return (
    <>
      <div className='details custom-container'>
        <div onClick={navigate} className={'backIcon'}>
          <BsChevronDoubleLeft
            fontSize={'35px'}
            style={{ textAlign: 'left' }}
          />
        </div>
        {showLoader ? (
          <LoaderComp />
        ) : (
          <>
            <div className='details-div'>
              <div className='details-imageDiv'>
                <img
                  className='details-image'
                  src={details.image_url}
                  alt={details.name}
                />
              </div>
              <div className='details-infoDiv'>
                <div className='details-desktopWrapper'>
                  <div className='details-wrapper'>
                    <div className='details-info'>
                      <div>
                        <h1 className='details-title'>{details.name}</h1>
                      </div>
                      <div className='details-typeDiv'>
                        <span> {capitalize(details.type)}</span>
                      </div>
                      <div className='details-ratingDiv'>
                        <MdFavorite fontSize={'26px'} className={'redIcon'} />
                        <span className='details-rating'>
                          {vote_average
                            ? Math.floor((vote_average * 100) / 5)
                            : 0}
                          %
                        </span>
                        <span className='details-number'>
                          ({details.user_reviews?.length})
                        </span>
                      </div>
                    </div>
                    <div ref={containerRef}>
                      <div
                        ref={triggerRef}
                        className='shareDiv'
                        onClick={() => {
                          navigator.clipboard.writeText(textToCopy);
                          handleClick();
                        }}
                      >
                        <FiShare fontSize={'28px'} />
                      </div>
                      <Overlay
                        show={show}
                        rootClose
                        offset={[0, 10]}
                        onHide={() => dispatch('hide')}
                        placement={'left'}
                        container={containerRef}
                        target={triggerRef}
                      >
                        {({ props, arrowProps, placement }) => (
                          <Tooltip {...props} placement={placement}>
                            <Arrow
                              {...arrowProps}
                              placement={placement}
                              style={arrowProps.style}
                            />
                            <Body>{t('urlCopied')}</Body>
                          </Tooltip>
                        )}
                      </Overlay>
                    </div>
                  </div>
                  <div>
                    <p className='details-description'>{details.description}</p>
                  </div>
                </div>
                <div className='details-orderDiv'>
                  <div className='details-price'>
                    <p>{details.price},- </p>
                  </div>
                  <button
                    onClick={() => setModalShow(true)}
                    className='orderBtn button solid__btn'
                  >
                    {t('order')}
                  </button>
                  <OrderModal
                    animation={false}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    name={details.name}
                    id={details.id}
                    image_url={details.image_url}
                  />
                </div>
              </div>
            </div>

            <hr />
            <div className='review-wrapper'>
              {details.user_reviews.length ? (
                <>
                  <div className='review-div review-list'>
                    <h2 className='subheading'>{t('userReviews')}</h2>
                    {details.user_reviews
                      ?.sort(function (a, b) {
                        return b.id - a.id;
                      })
                      .slice(0, showMoreReviews ? 4 : 100000000)
                      .map((reviews) => {
                        return (
                          <div key={reviews.id} className='review-cards'>
                            <div className='review-name'>
                              <span>{capitalize(reviews.name)}</span>
                            </div>
                            <div className='review-stars'>
                              <StarRatings
                                rating={reviews.rating}
                                starRatedColor='#ff4f4f'
                                numberOfStars={5}
                                name='rating'
                                starDimension='20px'
                                starSpacing='5px'
                                svgIconPath='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                                svgIconViewBox='0 0 24 24'
                              />
                            </div>
                            <div className='review-date'>
                              <span>{formatDate(reviews.created)}</span>
                            </div>
                            <div className='review-description'>
                              <p>{reviews.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    {details.user_reviews?.length > 4 ? (
                      <div
                        className='button hollow__btn viewMore__btn'
                        onClick={() => setShowMoreReviews(!showMoreReviews)}
                      >
                        {showMoreReviews
                          ? `${t('showMore')} (${
                              details.user_reviews?.length - 4
                            })`
                          : t('showLess')}
                      </div>
                    ) : null}
                  </div>
                  <hr />
                </>
              ) : null}
              <div className='review-div leaveReview-div'>
                <h3 className='subheading'>{t('leaveReview')}</h3>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='leaveReviewFrom'
                >
                  <fieldset>
                    <div className='groupForm ratingGroupFrom'>
                      <label className='label'>{t('rating')}</label>
                      <StarRatings
                        rating={rating}
                        starRatedColor='#ff4f4f'
                        numberOfStars={5}
                        name='rating'
                        changeRating={setRating}
                        starDimension='20px'
                        starSpacing='5px'
                        svgIconPath='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                        svgIconViewBox='0 0 24 24'
                      />
                      {showErrorMessage === true ? (
                        <p className='errorLabel'>Please choose a rating</p>
                      ) : null}
                    </div>
                    <div className='groupForm'>
                      <label htmlFor='name' className='label'>
                        {t('name')}
                      </label>
                      <input
                        name='name'
                        id='name'
                        ref={register}
                        type='text'
                        className='inputElem'
                        placeholder={t('nameHere')}
                      />

                      {errors.name && (
                        <p className='errorLabel'>{errors.name.message}</p>
                      )}
                    </div>

                    <div className='groupForm'>
                      <label htmlFor='description' className='label'>
                        {t('reviewText')}
                      </label>
                      <textarea
                        rows='4'
                        id='description'
                        name='description'
                        ref={register}
                        className='inputElem'
                        placeholder={t('reviewTextHere')}
                      />
                      {errors.description && (
                        <p className='errorLabel'>
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                    <button
                      type='submit'
                      className='button publish__btn solid__btn'
                    >
                      {t('publish')}
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Place;
