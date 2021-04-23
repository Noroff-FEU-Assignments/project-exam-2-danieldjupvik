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
  const [details, setDetails] = useState([]);
  const [vote_average, setVote_average] = useState();
  const [textToCopy, setTextToCopy] = useState();
  const [modalShow, setModalShow] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    // setLoader(true);
    setTextToCopy(window.location.href);
    const getDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}${placesUrl}/${id}`);
        setDetails(response.data);
      } catch (e) {
        console.log(e);
      } finally {
      }
    };
    getDetails();
  }, [id]);

  function navigate() {
    history.goBack();
  }

  useEffect(() => {
    let subRating = 0;
    details.user_reviews?.map((review) => (subRating += review.rating));
    setVote_average(subRating / details.user_reviews?.length);
  }, [details]);

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const [{ show }, dispatch] = useReducer(reducer, initialSstate);
  const triggerRef = useRef(null);
  const containerRef = useRef(null);

  const handleClick = () => {
    dispatch(['show', 'left']);

    setTimeout(() => {
      dispatch(['hide', 'left']);
    }, 3000);
  };

  return (
    <div className='details custom-container'>
      <div onClick={navigate} className={'backIcon'}>
        <BsChevronDoubleLeft fontSize={'35px'} style={{ textAlign: 'left' }} />
      </div>
      <div>
        <div>
          <img
            className='details-image'
            src={details.image_url}
            alt={details.name}
          />
        </div>
        <div>
          <div className='details-wrapper'>
            <div className='details-info'>
              <div>
                <span className='details-title'>{details.name}</span>
              </div>
              <div className='details-typeDiv'>
                <span> {capitalize(details.type)}</span>
              </div>
              <div className='details-ratingDiv'>
                <MdFavorite fontSize={'26px'} className={'heartIcon'} />
                <span className='details-rating'>
                  {Math.floor((vote_average * 100) / 10)}%
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
                    <Body>URL copied to clipboard</Body>
                  </Tooltip>
                )}
              </Overlay>
            </div>
          </div>
          <div className='details-description'>
            <p>{details.description}</p>
          </div>
          <div className='details-orderDiv'>
            <div className='details-price'>
              <p>{details.price},- </p>
            </div>
            <button
              onClick={() => setModalShow(true)}
              className='orderBtn button'
            >
              Order
            </button>
            <OrderModal
              animation={false}
              show={modalShow}
              onHide={() => setModalShow(false)}
              name={details.name}
              id={details.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Place;
